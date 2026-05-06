# WCAG Accessibility For Angular Interviews

This guide explains WCAG from scratch and also covers real Angular accessibility bugs, fixes, daily checklist, OKLCH colors, and Webpack vs Vite from an interview point of view.

Use this for:

- interview preparation
- daily development checklist
- accessibility bug fixing
- explaining WCAG in simple language
- Angular UI code review

Related browser debugging guide:

- [Browser DevTools, Lighthouse, And Core Web Vitals](./browser-devtools.md)

## Big Picture

Think of a physical store.

If the store is accessible:

- wheelchair users can enter through a ramp
- signs are clear
- labels help people understand sections
- paths are usable without confusion

WCAG does the same thing for websites.

For example, a login page without accessibility may have:

- inputs without labels
- buttons that only work with mouse
- low contrast text
- unclear error messages

An accessible login page has:

- proper labels
- keyboard navigation
- visible focus
- good contrast
- clear validation errors
- screen reader friendly structure

## What Is WCAG?

WCAG means Web Content Accessibility Guidelines.

Simple interview answer:

```text
WCAG is a set of accessibility standards that help make web applications usable for people with disabilities. It covers areas like screen reader support, keyboard navigation, color contrast, forms, focus management, and understandable content.
```

Important point:

WCAG is not just theory. WCAG success criteria are testable rules. In enterprise projects, accessibility often becomes a pass/fail quality requirement.

Examples:

- text contrast must meet minimum ratio
- images need meaningful alt text unless decorative
- all functionality should work using keyboard
- form errors should be connected to inputs
- focus should be visible

## POUR Principles

WCAG is built around 4 principles: Perceivable, Operable, Understandable, Robust.

Memory trick:

```text
P - Perceivable: Can I see or hear it?
O - Operable: Can I use it?
U - Understandable: Can I understand it?
R - Robust: Does it work with browsers, devices, and assistive technologies?
```

## 1. Perceivable

Question:

```text
Can users see, hear, or otherwise understand the content?
```

Bad:

```html
<img src="hotel-room.png">
```

Problem:

Screen reader users do not know what the image means.

Good:

```html
<img src="hotel-room.png" alt="Deluxe hotel room with king bed">
```

Decorative image:

```html
<img src="divider.png" alt="">
```

More examples:

- captions for videos
- labels for form inputs
- color contrast for text
- do not use color alone to show meaning

Bad:

```html
<p class="error">Invalid</p>
```

Better:

```html
<p class="error">Email is required.</p>
```

## 2. Operable

Question:

```text
Can users operate the UI without depending only on a mouse?
```

Bad:

```html
<div (click)="submit()">Submit</div>
```

Problems:

- not keyboard friendly
- not announced as button
- Enter/Space behavior is missing

Good:

```html
<button type="button" (click)="submit()">Submit</button>
```

Keyboard test:

- press Tab
- press Shift + Tab
- press Enter
- press Space
- check visible focus
- check that no interaction is mouse-only

## 3. Understandable

Question:

```text
Can users understand what is happening and what they need to do?
```

Bad:

```html
<p>Error 422</p>
```

Good:

```html
<p>Password must be at least 8 characters.</p>
```

Real examples:

- clear field labels
- helpful validation messages
- predictable navigation
- consistent button names
- no surprise timeout without warning

## 4. Robust

Question:

```text
Does the UI work correctly across browsers, screen readers, keyboards, and assistive technologies?
```

Bad:

```html
<div onclick="login()">Login</div>
```

Good:

```html
<button type="submit">Login</button>
```

Robust code uses semantic HTML first. ARIA should help only when native HTML cannot express the behavior.

## WCAG Levels

WCAG has three conformance levels.

| Level | Meaning | Interview Note |
| --- | --- | --- |
| A | Basic minimum accessibility | Not enough for most enterprise apps |
| AA | Most common company target | Best answer for interviews |
| AAA | Very strict accessibility | Usually not required for every page |

Best interview answer:

```text
Most enterprise projects target WCAG 2.1 AA or are moving toward WCAG 2.2 AA. AAA is very strict and is usually applied selectively, not always across the entire product.
```

## WCAG Versions

Think of WCAG versions like software updates.

```text
WCAG 2.0 - foundation
WCAG 2.1 - mobile and modern responsive needs
WCAG 2.2 - better focus, target size, authentication, and interaction usability
```

New versions mostly add rules. They do not remove the core ideas.

## WCAG 2.0

WCAG 2.0 is the base version.

Focus areas:

- screen reader support
- keyboard navigation
- text alternatives
- basic color contrast
- semantic structure

Example:

```html
<label for="email">Email</label>
<input id="email" type="email">

<button type="submit">Submit</button>
```

## WCAG 2.1

WCAG 2.1 adds more mobile, low vision, and modern interaction support.

Important additions:

- mobile usability
- responsive layout
- text spacing
- no forced zoom restrictions
- gesture alternatives
- pointer target considerations
- better support for low vision users

Example:

```css
.icon-button {
  min-width: 44px;
  min-height: 44px;
}
```

Bad:

```text
Only swipe left to delete.
```

Good:

```text
Swipe left to delete, and also provide a visible Delete button.
```

## WCAG 2.2

WCAG 2.2 is the current W3C Recommendation for WCAG 2.x. It adds 9 success criteria after WCAG 2.1.

Common interview points:

- stronger focus visibility
- focus should not be hidden behind sticky headers or overlays
- dragging actions should have non-drag alternatives
- target size expectations improved
- consistent help
- accessible authentication
- reduce cognitive load

Example focus style:

```css
:focus-visible {
  outline: 3px solid oklch(55% 0.2 250);
  outline-offset: 3px;
}
```

Bad:

```css
:focus {
  outline: none;
}
```

## WCAG Version Comparison

| Feature | WCAG 2.0 | WCAG 2.1 | WCAG 2.2 |
| --- | --- | --- | --- |
| Basic accessibility | Yes | Yes | Yes |
| Screen reader support | Yes | Yes | Yes |
| Keyboard access | Yes | Yes | Yes |
| Mobile support | Limited | Stronger | Stronger |
| Touch gestures | Limited | Added | Improved |
| Focus visibility | Basic | Better | Stronger |
| Target size | Limited | Added | Improved |
| Drag alternatives | Not central | Limited | Important |
| Cognitive usability | Basic | Better | Better |

Memory trick:

```text
2.0 = Can I use it?
2.1 = Can I use it on mobile?
2.2 = Can I use it easily without confusion?
```

## Legal And Compliance

Accessibility matters because:

- many companies require WCAG AA
- it improves usability for everyone
- it reduces legal and compliance risk
- it supports inclusive product design
- many government and enterprise clients expect it

Common standards/laws you may hear:

- ADA in the United States
- EN 301 549 in the European Union
- accessibility guidelines for government websites in India

Interview answer:

```text
Accessibility is both a user experience and compliance concern. In enterprise projects, WCAG AA is often part of the definition of done or quality gate.
```

## Tools You Should Know

Automated tools:

- Lighthouse in Chrome DevTools
- axe DevTools
- eslint accessibility plugins where configured
- CI accessibility checks if project supports them

Screen readers:

- NVDA for Windows
- JAWS for Windows
- VoiceOver for macOS and iOS

Manual tests:

- keyboard-only navigation
- screen reader smoke test
- zoom to 200%
- color contrast review
- focus order review

Important interview point:

```text
Automated tools catch only part of accessibility issues. Manual keyboard and screen reader testing is still required.
```

## ARIA

ARIA means Accessible Rich Internet Applications.

Use ARIA when native HTML cannot describe a custom UI pattern.

Rule:

```text
Prefer native HTML first. Use ARIA only when needed.
```

Bad:

```html
<div role="button" tabindex="0" (click)="save()">Save</div>
```

Better:

```html
<button type="button" (click)="save()">Save</button>
```

When ARIA is useful:

- custom dropdown/listbox
- tabs
- dialogs
- live messages
- tree views
- autocomplete
- dynamic validation messages

## Accessible Login Form

Bad:

```html
<input placeholder="Username">
<input placeholder="Password">
<div onclick="login()">Login</div>
```

Problems:

- no real labels
- placeholder disappears
- div is not a button
- not keyboard friendly
- poor screen reader experience

Good:

```html
<form (ngSubmit)="login()" [formGroup]="loginForm">
  <div class="field">
    <label for="username">Username</label>
    <input id="username" type="text" formControlName="username">
  </div>

  <div class="field">
    <label for="password">Password</label>
    <input id="password" type="password" formControlName="password">
  </div>

  <button type="submit">Login</button>
</form>
```

## Angular Accessibility Bugs And Fixes

These are common in real projects and interviews.

## Bug 1: Using Div Instead Of Button

Bad:

```html
<div (click)="submit()">Submit</div>
```

Good:

```html
<button type="button" (click)="submit()">Submit</button>
```

Why:

- button is focusable by default
- button supports keyboard
- screen reader announces it correctly

## Bug 2: Missing Form Label

Bad:

```html
<input type="text" formControlName="username">
```

Good:

```html
<label for="username">Username</label>
<input id="username" type="text" formControlName="username">
```

## Bug 3: Placeholder Used As Label

Bad:

```html
<input type="email" placeholder="Enter email">
```

Good:

```html
<label for="email">Email</label>
<input id="email" type="email" placeholder="name@example.com">
```

## Bug 4: Custom Component Without Keyboard Support

Bad:

```html
<div class="menu-trigger" (click)="openMenu()">Menu</div>
```

Acceptable only when native HTML is not possible:

```html
<div
  role="button"
  tabindex="0"
  class="menu-trigger"
  (click)="openMenu()"
  (keydown.enter)="openMenu()"
  (keydown.space)="openMenu()">
  Menu
</div>
```

Best:

```html
<button type="button" class="menu-trigger" (click)="openMenu()">
  Menu
</button>
```

## Bug 5: Modal Does Not Manage Focus

Problem:

- modal opens but focus remains behind it
- user can tab outside modal
- close button is not reachable

Angular Material style:

```ts
this.dialog.open(EditUserDialogComponent, {
  autoFocus: 'first-tabbable',
  restoreFocus: true,
});
```

Manual idea:

```ts
openDialog(): void {
  this.isOpen = true;

  queueMicrotask(() => {
    this.closeButton?.nativeElement.focus();
  });
}
```

Template:

```html
<section
  *ngIf="isOpen"
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title">
  <h2 id="dialog-title">Edit user</h2>

  <button #closeButton type="button" (click)="closeDialog()">
    Close
  </button>
</section>
```

## Bug 6: Removing Focus Indicator

Bad:

```css
:focus {
  outline: none;
}
```

Good:

```css
:focus-visible {
  outline: 3px solid oklch(55% 0.2 250);
  outline-offset: 3px;
}
```

## Bug 7: Dynamic Content Not Announced

Bad:

```html
<div *ngIf="submitted">Form submitted</div>
```

Good:

```html
<div *ngIf="submitted" aria-live="polite">
  Form submitted successfully.
</div>
```

Use cases:

- form submit success
- save failed
- item added to cart
- search results updated

## Bug 8: Image Without Alt Text

Bad:

```html
<img src="logo.png">
```

Good:

```html
<img src="logo.png" alt="Company logo">
```

Decorative:

```html
<img src="shape.png" alt="">
```

## Bug 9: Angular Routing Without Focus Reset

Problem:

In SPA routing, the page does not fully reload. Screen reader users may not realize navigation happened.

Basic approach:

```ts
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

constructor(private router: Router) {
  this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe(() => {
      document.querySelector<HTMLElement>('h1')?.focus();
    });
}
```

Template:

```html
<h1 tabindex="-1">Dashboard</h1>
```

Better production approach:

- centralize focus handling
- update page title
- avoid focusing hidden elements
- test with keyboard and screen reader

## Bug 10: Low Contrast

Bad:

```css
.muted-text {
  color: #777;
  background: #999;
}
```

Good:

```css
.body-text {
  color: oklch(20% 0.02 250);
  background: oklch(99% 0.01 250);
}
```

Still test contrast. OKLCH helps design consistent colors, but it does not automatically guarantee WCAG contrast.

## Bug 11: Form Errors Not Connected To Input

Bad:

```html
<input type="email" formControlName="email">
<div *ngIf="email.invalid">Invalid input</div>
```

Good:

```html
<label for="email">Email</label>
<input
  id="email"
  type="email"
  formControlName="email"
  aria-describedby="email-error"
  [attr.aria-invalid]="email.invalid && email.touched ? 'true' : null">

<div id="email-error" *ngIf="email.invalid && email.touched">
  Please enter a valid email address.
</div>
```

## Bug 12: No Skip Navigation Link

Problem:

Keyboard users must tab through the whole menu on every route.

Good:

```html
<a href="#main" class="skip-link">Skip to content</a>

<nav>
  <!-- navigation -->
</nav>

<main id="main" tabindex="-1">
  <h1>Dashboard</h1>
</main>
```

CSS:

```css
.skip-link {
  position: absolute;
  left: 1rem;
  top: 0;
  transform: translateY(-120%);
}

.skip-link:focus {
  transform: translateY(1rem);
}
```

## Bug 13: Color Alone Shows Status

Bad:

```html
<span class="status-red"></span>
```

Good:

```html
<span class="status status-error" aria-label="Payment failed">
  Failed
</span>
```

Better UI:

- icon
- text
- color
- accessible label

## Bug 14: Drag And Drop Only

Bad:

```text
User can only drag a card to change order.
```

Good:

```text
Provide drag and drop plus Move up / Move down buttons.
```

Angular idea:

```html
<button type="button" (click)="moveUp(item)">Move up</button>
<button type="button" (click)="moveDown(item)">Move down</button>
```

## Bug 15: Session Timeout Without Warning

Bad:

```text
User is suddenly logged out while filling a form.
```

Good:

```html
<section role="alert" *ngIf="showTimeoutWarning">
  Your session will expire in 2 minutes.
  <button type="button" (click)="extendSession()">Stay signed in</button>
</section>
```

## Angular Material And CDK Note

Angular Material components are designed with accessibility in mind, but they do not automatically make the full application accessible.

Still check:

- labels
- visible focus
- keyboard behavior
- aria attributes
- color contrast
- error messages
- custom wrappers
- dialog focus behavior

Useful CDK accessibility utilities:

- `LiveAnnouncer`
- `FocusTrap`
- `FocusMonitor`
- `InteractivityChecker`
- `ListKeyManager`

Example:

```ts
import { LiveAnnouncer } from '@angular/cdk/a11y';

constructor(private liveAnnouncer: LiveAnnouncer) {}

save(): void {
  // save logic
  this.liveAnnouncer.announce('Profile saved successfully');
}
```

## Why OKLCH Is Preferred For Colors

OKLCH is a modern CSS color function based on the Oklab color space.

Simple explanation:

```text
OKLCH is preferred in design systems because it is closer to how humans perceive color. Lightness changes are more predictable than HSL or RGB, so it is easier to create consistent shades, hover states, focus colors, and dark mode tokens.
```

OKLCH parts:

```text
L = lightness
C = chroma/saturation
H = hue
```

Example:

```css
:root {
  --color-primary: oklch(55% 0.18 250);
  --color-primary-hover: oklch(48% 0.18 250);
  --color-focus: oklch(62% 0.22 250);
  --color-danger: oklch(55% 0.22 25);
  --color-surface: oklch(99% 0.01 250);
  --color-text: oklch(20% 0.02 250);
}
```

Why this helps:

- easier to control lightness
- smoother color scales
- better design token consistency
- more predictable dark mode adjustments
- supports modern wide-gamut color workflows

Important:

```text
OKLCH does not replace WCAG contrast testing. You still need to check contrast ratios for text and UI states.
```

Safe fallback:

```css
.button {
  background: #2454d6;
  background: oklch(55% 0.18 250);
  color: white;
}
```

## Webpack

Webpack is a module bundler.

Simple answer:

```text
Webpack takes JavaScript, TypeScript, CSS, images, and other assets, builds a dependency graph, and bundles them into optimized files for the browser.
```

Webpack can handle:

- TypeScript transpilation
- CSS/SASS processing
- assets
- code splitting
- lazy chunks
- environment builds
- minification
- tree shaking

Angular historically used Webpack internally through Angular CLI, so many Angular developers used Webpack without directly writing Webpack config.

## Vite

Vite is a modern frontend build tool and dev server.

Simple answer:

```text
Vite improves development speed by using native ES modules in the browser during development and Rollup for production builds.
```

Why developers like Vite:

- faster dev server startup
- fast hot module replacement
- simpler config
- modern ESM-first workflow
- great fit for React, Vue, Svelte, and modern frontend tooling

Angular CLI has also moved toward newer build tooling using esbuild/Vite-style development improvements in modern versions.

## Webpack Vs Vite

| Area | Webpack | Vite |
| --- | --- | --- |
| Type | Bundler | Dev server + build tool |
| Dev mode | Bundles before serving | Uses native ESM for faster startup |
| Production | Webpack bundling | Rollup-based production build |
| Config | Powerful but often complex | Usually simpler |
| Ecosystem | Very mature | Modern and fast-growing |
| Best point | Highly configurable | Fast DX and modern defaults |

Interview answer:

```text
Webpack is a mature bundler that builds a dependency graph and bundles assets. Vite is a modern build tool that gives faster development startup using native ES modules and uses optimized production builds. In Angular, I usually rely on Angular CLI build configuration, but I understand the role of bundling, lazy chunks, tree shaking, and production optimization.
```

## Daily Accessibility Cheat Sheet

Before marking UI work done, check this list.

Forms:

- every input has a visible label
- label is connected using `for` and `id`
- required fields are clear
- errors are descriptive
- errors are connected with `aria-describedby`
- invalid fields use `aria-invalid` when appropriate

Buttons and links:

- real actions use `button`
- navigation uses `a`
- no clickable divs unless absolutely necessary
- icon buttons have accessible names

Keyboard:

- all functionality works with keyboard
- tab order is logical
- focus is visible
- no keyboard trap
- modal traps focus correctly
- focus returns after modal closes

Visual:

- text contrast passes WCAG
- focus state is clearly visible
- do not use color alone
- text can resize
- layout works at 200% zoom

Dynamic UI:

- route change updates title/focus
- success/error messages use live regions when needed
- loading state is announced when important
- error messages are clear

Images and media:

- meaningful images have alt text
- decorative images use empty alt
- videos have captions if needed

Angular:

- Material/CDK components still reviewed
- custom dropdowns support keyboard
- dialogs manage focus
- reusable components document accessibility behavior
- forms handle error states accessibly

Testing:

- run Lighthouse
- run axe DevTools
- test keyboard-only flow
- test important flows with screen reader
- review contrast

## Practice Project

Build a small Angular login + dashboard app with intentional accessibility issues, then fix them.

Pages:

- login page
- dashboard page
- profile form
- custom dropdown
- modal dialog
- sortable list

Add these bugs first:

- input without label
- clickable div instead of button
- no focus style
- low contrast text
- form error not connected to input
- modal does not focus close button
- route change does not focus page heading
- status shown only with color
- drag-only reorder

Then fix using:

- semantic HTML
- labels
- buttons
- `aria-describedby`
- `aria-live`
- `:focus-visible`
- CDK FocusTrap or Material dialog
- keyboard alternatives
- contrast-safe colors

## Interview Questions

Prepare these:

- What is WCAG?
- What are POUR principles?
- Difference between WCAG 2.0, 2.1, and 2.2?
- What is WCAG AA?
- How do you test accessibility?
- What is ARIA?
- When should you avoid ARIA?
- Why is `button` better than `div role="button"`?
- How do you make Angular forms accessible?
- How do you handle accessibility in Angular routing?
- How do you make modals accessible?
- What are common accessibility bugs?
- How does Axe help?
- Does Angular Material guarantee accessibility?
- Why is color contrast important?
- Why can color alone be a problem?
- Why use OKLCH in a design system?
- What is Webpack?
- What is Vite?
- Webpack vs Vite?

## Best Interview Answer

```text
WCAG is a set of accessibility standards used to make web applications usable for people with disabilities. I remember it through POUR: perceivable, operable, understandable, and robust.

In Angular, I apply accessibility through semantic HTML, proper form labels, keyboard navigation, visible focus, accessible error messages, route focus management, and live regions for dynamic updates.

I also test with Lighthouse or axe, but I know automated tools cannot catch everything, so I manually test keyboard flow and important screen reader behavior.

Most enterprise projects target WCAG 2.1 AA, and modern teams are also looking at WCAG 2.2 improvements like focus appearance, target size, dragging alternatives, and accessible authentication.
```

## Sources

- W3C WCAG 2.2 Recommendation: https://www.w3.org/WAI/news/2023-10-05/wcag22rec/
- W3C WCAG standards overview: https://www.w3.org/WAI/standards-guidelines/wcag/
- MDN OKLCH CSS color: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch
- MDN OKLAB CSS color: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklab
- Angular accessibility guide: https://angular.dev/best-practices/a11y
