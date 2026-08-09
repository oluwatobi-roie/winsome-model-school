# Winsome Model Schools website

Public website for Winsome Model Schools, built with React, TypeScript and Vite.

## School email addresses

- General enquiries: `info@winsomemodelschools.com`
- Admissions: `admissions@winsomemodelschools.com`

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

Upload the **contents** of `dist/` to the site's web document root. Normal files from `public/` are copied by Vite, and the build script explicitly copies the hidden Apache `.htaccess` file into `dist/`. The production output also includes `admissions-submit.php`.

Before deployment, confirm that these files exist:

```text
dist/.htaccess
dist/admissions-submit.php
dist/index.html
```

### Admissions email configuration

The admissions endpoint sends enquiries to `admissions@winsomemodelschools.com` by default.

If the destination ever changes, the server environment variable `WMS_ADMISSIONS_EMAIL` can override the default without changing application code. On Apache hosting that permits `SetEnv`:

```apache
SetEnv WMS_ADMISSIONS_EMAIL another-address@example.com
```

## Hosting

The production site is static except for the small PHP admissions endpoint, so ordinary Apache/PHP shared hosting is sufficient. There is no need to keep a Node.js server running in production.

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
- GitHub Actions runs a full npm dependency audit, lint, production build, deployment-file checks and artifact creation on pull requests and changes to `main`.

## Admissions form

The public form intentionally collects only the minimum information needed to start an admissions conversation. Detailed records, medical information, identity documents and similar sensitive information should be collected separately by the school when required.
