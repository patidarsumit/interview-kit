# 27. Internationalization

Internationalization prepares an app for multiple languages and locales.

Angular supports i18n for:

- translated text
- locale-specific formatting
- pluralization
- dates
- numbers
- currencies

## Locale Formatting

```html
<p>{{ today | date }}</p>
<p>{{ total | currency }}</p>
```

Pipes can format based on locale.

## Marking Text

Angular templates can mark text for translation.

```html
<h1 i18n>Welcome</h1>
```

With description:

```html
<button i18n="Save button label">Save</button>
```

## Pluralization

Pluralization matters because languages have different plural rules.

Use Angular i18n plural support instead of manually appending `s`.

## Direction

Some languages are right-to-left.

Important concepts:

- `dir="rtl"`
- logical CSS properties
- layout mirroring
- icon direction

## Senior Best Practices

- do not concatenate translated strings
- account for longer translated text
- use locale-aware date/number/currency formatting
- support RTL if product requires it
- keep text out of images
- test with pseudo-localization or long strings

## Interview Questions

### What is i18n?

Preparing an application for translation and locale-specific behavior.

### Why not concatenate translated strings?

Word order differs between languages.

### What is RTL support?

Support for right-to-left languages such as Arabic and Hebrew.

