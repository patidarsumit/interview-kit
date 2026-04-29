# 24. Security

Angular has built-in protections, but developers must still write safe application code.

## XSS Protection

Angular treats template-bound values as untrusted by default.

Interpolation escapes HTML:

```html
<p>{{ userInput }}</p>
```

Binding to `innerHTML` sanitizes:

```html
<section [innerHTML]="htmlSnippet"></section>
```

## Security Contexts

Angular has different security contexts:

- HTML
- Style
- URL
- Resource URL

Resource URLs are dangerous because they can load executable code.

## DomSanitizer

Use `DomSanitizer` only when you have verified the value is safe.

```ts
const sanitizer = inject(DomSanitizer);
safeUrl = sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
```

Senior warning:

`bypassSecurityTrust...` means "I reviewed this and accept responsibility." It is not a sanitizer.

## AOT Compiler

Use AOT in production.

AOT helps prevent template injection and improves performance.

Never create Angular templates by concatenating user input.

## CSP And Trusted Types

Production Angular apps should consider:

- Content Security Policy
- Trusted Types
- unique nonces
- avoiding unsafe inline scripts

## HTTP Security

Common topics:

- XSRF/CSRF
- auth token storage
- secure cookies
- CORS
- HTTPS
- refresh tokens

Angular provides XSRF integration helpers, but server-side support is required.

## Senior Best Practices

- keep Angular updated
- do not modify Angular source locally
- avoid direct DOM APIs for untrusted content
- never trust API or route data blindly
- avoid storing sensitive tokens in local storage when risk is unacceptable
- review all sanitizer bypasses
- enforce CSP and Trusted Types where possible

## Interview Questions

### How does Angular prevent XSS?

It escapes interpolated values and sanitizes values bound into dangerous DOM contexts.

### Is `[innerHTML]` safe?

Angular sanitizes it, but you must still understand the source and context.

### What is dangerous about `bypassSecurityTrustHtml`?

It disables Angular's normal safety checks for that value.

