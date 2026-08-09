# Winsome Model Schools website

Public website for Winsome Model Schools, built with React, TypeScript and Vite.

## Local development

```bash
npm ci
npm run dev
```

The Vite development server is for local development only. Do not expose `npm run dev` or `npm run preview` as the production website.

## Production build

```bash
npm ci
npm run lint
npm run build
```

Upload the **contents** of `dist/` to the site's cPanel document root. Vite copies files from `public/` into the production output, including `.htaccess` and `admissions-submit.php`.

### Admissions email configuration

The admissions endpoint intentionally has no hard-coded recipient address. Configure the server environment variable `WMS_ADMISSIONS_EMAIL` to the mailbox that should receive enquiries.

On Apache hosting that permits `SetEnv`, edit the deployed `.htaccess` file and add, for example:

```apache
SetEnv WMS_ADMISSIONS_EMAIL admissions@your-school-domain.example
```

Replace the example with the real school mailbox. If the recipient is not configured, the form fails safely and tells visitors to call the school instead of pretending that an enquiry was submitted.

## Hosting

The production site is static except for the small PHP admissions endpoint, so ordinary cPanel/shared hosting is sufficient. There is no need to keep a Node.js server running in production.

The included `.htaccess` file provides:

- React Router fallback routing
- directory listing protection
- browser security headers
- a restrictive Content Security Policy

## Security maintenance

- Keep HTTPS enabled for the entire site.
- Never commit passwords, API keys, private student records or email credentials.
- Review Dependabot updates promptly.
- Do not expose the Vite development or preview server to the public internet.
- Review approval-document images before publication for signatures, personal phone numbers or other information that should not be public.
- GitHub Actions runs lint and build checks on pull requests and changes to `main`.

## Admissions form

The public form intentionally collects only the minimum information needed to start an admissions conversation. Detailed records, medical information, identity documents and similar sensitive information should be collected separately by the school when required.
