<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed.']);
    exit;
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') !== 0) {
    http_response_code(415);
    echo json_encode(['message' => 'Unsupported request format.']);
    exit;
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = $_SERVER['HTTP_HOST'] ?? '';
if ($origin !== '' && $host !== '') {
    $originHost = parse_url($origin, PHP_URL_HOST);
    if (!is_string($originHost) || strcasecmp($originHost, preg_replace('/:\d+$/', '', $host)) !== 0) {
        http_response_code(403);
        echo json_encode(['message' => 'Request origin is not allowed.']);
        exit;
    }
}

$remoteAddress = $_SERVER['REMOTE_ADDR'] ?? '';
if ($remoteAddress !== '') {
    $rateFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'wms-admissions-' . hash('sha256', $remoteAddress);
    $lastRequest = is_file($rateFile) ? @filemtime($rateFile) : false;
    if ($lastRequest !== false && $lastRequest > time() - 30) {
        http_response_code(429);
        header('Retry-After: 30');
        echo json_encode(['message' => 'Please wait a moment before sending another enquiry.']);
        exit;
    }
    @touch($rateFile);
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 12000) {
    http_response_code(413);
    echo json_encode(['message' => 'Request is too large.']);
    exit;
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid request.']);
    exit;
}

if (!empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

function clean_text(mixed $value, int $max): string {
    $value = is_string($value) ? trim($value) : '';
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    return function_exists('mb_substr') ? mb_substr($value, 0, $max) : substr($value, 0, $max);
}

$parentName = clean_text($data['parentName'] ?? '', 100);
$parentEmail = clean_text($data['parentEmail'] ?? '', 160);
$parentPhone = clean_text($data['parentPhone'] ?? '', 30);
$studentName = clean_text($data['studentName'] ?? '', 100);
$intendedClass = clean_text($data['intendedClass'] ?? '', 40);
$session = clean_text($data['session'] ?? '', 20);
$message = clean_text($data['message'] ?? '', 1000);
$consent = ($data['consent'] ?? false) === true;

$allowedClasses = ['Nursery 1','Nursery 2','Primary 1','Primary 2','Primary 3','Primary 4','Primary 5','Primary 6','JSS 1','JSS 2','JSS 3','SS 1','SS 2','SS 3'];
$allowedSessions = ['2026/2027','2027/2028'];

if (strlen($parentName) < 2 || !filter_var($parentEmail, FILTER_VALIDATE_EMAIL) || strlen($parentPhone) < 7 || !in_array($intendedClass, $allowedClasses, true) || !in_array($session, $allowedSessions, true) || !$consent) {
    http_response_code(422);
    echo json_encode(['message' => 'Please check the required fields and try again.']);
    exit;
}

$recipient = getenv('WMS_ADMISSIONS_EMAIL') ?: '';
if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
    http_response_code(503);
    echo json_encode(['message' => 'Online enquiries are not configured yet. Please call +234 803 231 9017.']);
    exit;
}

$subject = 'Website admissions enquiry: ' . $intendedClass . ' (' . $session . ')';
$body = "Parent/Guardian: {$parentName}\nEmail: {$parentEmail}\nPhone: {$parentPhone}\nStudent: " . ($studentName !== '' ? $studentName : 'Not provided') . "\nIntended class: {$intendedClass}\nAcademic session: {$session}\n\nMessage:\n" . ($message !== '' ? $message : 'No message provided') . "\n";
$headers = [
    'From: Website Enquiries <no-reply@' . preg_replace('/[^A-Za-z0-9.-]/', '', preg_replace('/:\d+$/', '', $host)) . '>',
    'Reply-To: ' . str_replace(["\r", "\n"], '', $parentEmail),
    'Content-Type: text/plain; charset=UTF-8',
];

if (!mail($recipient, $subject, $body, implode("\r\n", $headers))) {
    http_response_code(502);
    echo json_encode(['message' => 'The enquiry could not be delivered. Please call +234 803 231 9017.']);
    exit;
}

echo json_encode(['ok' => true]);
