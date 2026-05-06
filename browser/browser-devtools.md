# Browser DevTools, Lighthouse, And Core Web Vitals

This file explains Chrome DevTools from a junior-friendly point of view.

Use this when you want to debug:

- accessibility issues
- performance issues
- slow pages
- layout shift
- API problems
- storage/cookie/session issues
- service worker/cache issues
- Angular production bugs

## Big Picture

Chrome DevTools is like an X-ray machine for a website.

When a user says:

```text
The page is slow.
Button is not working.
Login is failing.
Page jumps while loading.
Some data is old.
Accessibility score is low.
```

DevTools helps you inspect what is happening inside the browser.

## How To Open Chrome DevTools

Use any of these:

- Right click page, then select `Inspect`
- Press `F12`
- Press `Ctrl + Shift + I`
- On Mac, press `Cmd + Option + I`

Common panels:

- `Elements`
- `Console`
- `Network`
- `Performance`
- `Lighthouse`
- `Application`
- `Sources`
- `Memory`

## Core Web Vitals

Core Web Vitals are user experience performance metrics.

Modern Core Web Vitals:

| Metric | Full Form | Measures |
| --- | --- | --- |
| LCP | Largest Contentful Paint | How fast main content loads |
| INP | Interaction to Next Paint | How responsive the page is after user interaction |
| CLS | Cumulative Layout Shift | How visually stable the page is |

Short memory:

```text
LCP = loading speed
INP = interaction responsiveness
CLS = layout stability
```

## LCP

LCP means Largest Contentful Paint.

Simple meaning:

```text
How long does it take for the biggest important visible content to appear?
```

Examples of LCP element:

- hero image
- main heading
- large banner
- main product image
- large text block

Good target:

```text
LCP should be 2.5 seconds or faster.
```

Common causes of poor LCP:

- large unoptimized image
- slow API needed before content displays
- blocking JavaScript
- blocking CSS
- slow server response
- lazy loading the main hero image by mistake
- too much client-side rendering before first content

Angular-specific examples:

- route loads a large module
- component waits for API before showing main content
- bundle size is too large
- heavy initialization in `ngOnInit`
- hero image has no width/height and is too large

Fix ideas:

- optimize images
- use correct image dimensions
- preload important hero image
- lazy load non-critical routes
- use `@defer` for below-the-fold widgets
- reduce initial bundle size
- show useful shell/skeleton early
- avoid blocking main content on non-critical API calls

Interview answer:

```text
LCP measures how quickly the main visible content appears. If LCP is poor, I check large images, render-blocking CSS/JS, slow API calls, server response time, and large Angular bundles.
```

## CLS

CLS means Cumulative Layout Shift.

Simple meaning:

```text
Does the page jump around while loading?
```

Bad user experience:

```text
User tries to click Login, but an image loads and pushes the button down.
```

Good target:

```text
CLS should be 0.1 or less.
```

Common causes of high CLS:

- images without width and height
- ads/iframes inserted without reserved space
- fonts loading late and changing text size
- banners appearing above content
- dynamic Angular components inserted above current content
- skeleton loader size different from final content size

Bad:

```html
<img src="hotel.jpg" alt="Hotel room">
```

Better:

```html
<img
  src="hotel.jpg"
  alt="Hotel room"
  width="800"
  height="450">
```

CSS alternative:

```css
.hero-image {
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: cover;
}
```

Angular-specific fixes:

- reserve space for async data
- make skeleton loaders same height as final cards
- avoid adding banners above content after load
- define image dimensions
- avoid layout-changing animations
- handle web fonts carefully

Interview answer:

```text
CLS measures visual stability. If CLS is high, I look for images without dimensions, late banners, async content insertion, font shifts, and skeleton loaders that do not match final layout.
```

## INP

INP means Interaction to Next Paint.

Simple meaning:

```text
After the user clicks, types, or taps, how quickly does the page visually respond?
```

Good target:

```text
INP should be 200 ms or less.
```

Common causes of poor INP:

- heavy JavaScript on click
- expensive Angular change detection
- large list rendering
- filtering/sorting huge arrays on every keystroke
- synchronous loops blocking the main thread
- too many event handlers
- expensive template functions
- large third-party scripts

Bad Angular example:

```html
<input (input)="filterProducts($event)">

@for (product of filteredProducts; track product.id) {
  <app-product-card [product]="product" />
}
```

Problem:

If `filterProducts` does heavy work on every keystroke and the list is large, typing becomes slow.

Fix ideas:

- debounce search input
- use server-side search for very large data
- use virtual scroll
- avoid function calls from template
- use `OnPush` or signals carefully
- split expensive work
- reduce DOM size
- defer non-critical UI

Example:

```ts
searchChanged = new Subject<string>();

ngOnInit(): void {
  this.searchChanged
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.productService.search(term))
    )
    .subscribe((products) => {
      this.products = products;
    });
}
```

Template:

```html
<input
  type="search"
  aria-label="Search products"
  (input)="searchChanged.next($any($event.target).value)">
```

Interview answer:

```text
INP measures page responsiveness after user interaction. If INP is poor in Angular, I check expensive event handlers, large DOM updates, repeated change detection, heavy template work, and third-party scripts.
```

## Performance Tab

The `Performance` tab records what the browser is doing while the page loads or while the user interacts.

Use it when:

- page is slow
- click response is delayed
- scrolling is janky
- animation is lagging
- input typing is slow
- LCP/INP/CLS is poor

Basic steps:

1. Open DevTools.
2. Go to `Performance`.
3. Click record.
4. Reload the page or perform the slow action.
5. Stop recording.
6. Check the timeline.

What to look for:

- long tasks
- scripting time
- rendering time
- layout recalculation
- paint events
- layout shifts
- network dependency
- main thread blocking

## Long Task

A long task is JavaScript work that blocks the main thread for too long.

Simple meaning:

```text
The browser is busy, so the user has to wait.
```

Common Angular causes:

- large loops
- heavy data transformation
- too many components rendering
- expensive pipes
- methods called repeatedly from template
- large third-party library initialization

Bad:

```html
<p>{{ calculateTotal(order) }}</p>
```

If `calculateTotal` is expensive, Angular may call it many times.

Better:

```ts
total = computed(() => calculateTotal(this.order()));
```

Or calculate once when data changes.

## Network Tab

The `Network` tab shows all requests made by the page.

Use it to check:

- API URL
- request method
- status code
- payload
- response
- headers
- cookies
- caching
- duplicate API calls
- slow APIs

Common status codes:

| Code | Meaning |
| --- | --- |
| 200 | Success |
| 201 | Created |
| 204 | Success but no content |
| 400 | Bad request |
| 401 | Not authenticated |
| 403 | Not authorized |
| 404 | Not found |
| 500 | Server error |

Angular interview example:

```text
API is called twice. What do you check?
```

Answer:

```text
I check Network tab first to confirm duplicate calls. Then I check component lifecycle, subscriptions, route resolver, async pipe usage, interceptor retry logic, and whether both parent and child components are calling the same service.
```

## Console Tab

The `Console` tab shows:

- JavaScript errors
- Angular runtime errors
- failed logs
- warnings
- custom debug logs

Use it for:

- quick debugging
- checking runtime exceptions
- testing small JavaScript snippets
- verifying object values

Common Angular errors:

- `ExpressionChangedAfterItHasBeenCheckedError`
- cannot read property of undefined
- injection provider missing
- template binding error
- CORS/API errors shown in console

## Elements Tab

The `Elements` tab shows the real DOM and CSS.

Use it to check:

- HTML structure
- accessibility labels
- CSS styles
- computed styles
- box model
- focus styles
- hidden elements
- ARIA attributes

Accessibility checks:

- is it a real button?
- does input have label?
- does error have id?
- does input use `aria-describedby`?
- is focus outline visible?
- is text contrast readable?

## Accessibility Tree

Chrome DevTools can show accessibility information for selected elements.

Use it to check:

- accessible name
- role
- state
- focusability
- whether element is ignored by screen readers

Example:

```html
<button aria-label="Close dialog">
  X
</button>
```

The visual text is `X`, but screen reader gets a better accessible name: `Close dialog`.

## Lighthouse

Lighthouse is an audit tool built into Chrome DevTools.

It checks:

- performance
- accessibility
- best practices
- SEO
- PWA basics

How to run:

1. Open DevTools.
2. Go to `Lighthouse`.
3. Select categories.
4. Choose mobile or desktop.
5. Click analyze.

What Lighthouse gives:

- score
- issues
- suggestions
- Core Web Vitals lab data
- accessibility warnings

Important:

```text
Lighthouse is useful, but it does not catch every issue. Manual testing is still required.
```

Accessibility issues Lighthouse may catch:

- missing alt text
- low contrast
- missing form labels
- buttons without names
- invalid ARIA
- missing document title
- heading order problems

Performance issues Lighthouse may catch:

- large JavaScript bundle
- unused JavaScript
- render-blocking resources
- unoptimized images
- poor LCP
- layout shift

Interview answer:

```text
I use Lighthouse for quick audits of performance, accessibility, best practices, and SEO. For accessibility, I combine it with keyboard testing and axe because automated tools cannot catch everything.
```

## Application Tab

The `Application` tab shows browser-side storage and app resources.

Use it to inspect:

- Local Storage
- Session Storage
- Cookies
- IndexedDB
- Cache Storage
- Service Workers
- Manifest

## Local Storage

Local Storage stores data with no automatic expiry.

Common uses:

- theme preference
- language preference
- non-sensitive UI settings

Avoid storing:

- access tokens when better secure cookie strategy is available
- passwords
- personal sensitive data

Debug example:

```text
User logs out but still sees old menu.
```

Check:

- local storage role/user data
- token cleanup
- app state reset
- route guard logic

## Session Storage

Session Storage is cleared when the tab/session ends.

Common uses:

- temporary filters
- current tab state
- short-lived UI state

## Cookies

Cookies are sent with requests depending on domain/path/settings.

Important cookie flags:

| Flag | Meaning |
| --- | --- |
| HttpOnly | JavaScript cannot read the cookie |
| Secure | sent only over HTTPS |
| SameSite | helps reduce CSRF risk |
| Expires/Max-Age | controls lifetime |

Interview answer:

```text
For sensitive auth tokens, HttpOnly Secure cookies are safer against XSS token theft than localStorage, but cookie-based auth needs CSRF protection depending on SameSite and backend design.
```

## IndexedDB

IndexedDB is browser database storage.

Used for:

- offline data
- large structured data
- PWA scenarios
- caching complex data

## Cache Storage

Cache Storage is often used by service workers.

Use it to debug:

- stale assets
- old API responses
- PWA caching problems
- application not updating after deployment

## Service Workers

A service worker can intercept network requests and serve cached responses.

Good for:

- offline support
- asset caching
- PWA behavior

Can cause issues:

- old bundle served after deployment
- stale API data
- page behaves differently after refresh

Debug steps:

- Application tab
- Service Workers
- check current worker
- unregister temporarily
- clear cache storage
- reload page

Interview answer:

```text
If users see old UI after deployment, I check browser cache, service worker, cache storage, CDN cache, and deployment versioning.
```

## Sources Tab

The `Sources` tab is used for debugging JavaScript and TypeScript.

Use it to:

- set breakpoints
- step through code
- inspect variables
- debug event handlers
- check source maps

For Angular:

- ensure source maps are available in local/dev environment
- set breakpoints inside component/service code
- inspect route guard/interceptor behavior

## Memory Tab

The `Memory` tab helps find memory leaks.

Use it when:

- app becomes slower after route changes
- memory keeps increasing
- old components are not garbage collected
- subscriptions or event listeners are not cleaned up

Angular leak examples:

- manual subscription not unsubscribed
- `setInterval` not cleared
- global event listener not removed
- third-party widget not destroyed
- cached component references

Modern Angular fix:

```ts
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

this.userService.user$
  .pipe(takeUntilDestroyed())
  .subscribe((user) => {
    this.user = user;
  });
```

## Real Interview Scenarios

## Scenario 1: Page Is Slow

Answer:

```text
I start with Performance and Network tabs. In Network, I check slow or duplicate APIs and large assets. In Performance, I record the page load and look for long tasks, LCP element, layout shifts, and main-thread blocking. In Angular, I also check bundle size, lazy loading, expensive template methods, change detection, and large DOM rendering.
```

## Scenario 2: Button Click Is Delayed

Answer:

```text
I would check INP-related issues. I record the interaction in the Performance tab, look for long tasks after the click, and inspect whether Angular is doing expensive change detection, rendering a large list, running heavy synchronous logic, or loading a large third-party script.
```

## Scenario 3: Page Jumps While Loading

Answer:

```text
This is likely CLS. I check images without dimensions, banners inserted above content, skeleton loader size mismatch, late font loading, and dynamic Angular components inserted after data loads.
```

## Scenario 4: Login Fails

Answer:

```text
I check the Network tab for login API status, request payload, response body, CORS errors, cookies, and auth headers. Then I check Application tab for token/cookie storage and Console for runtime errors.
```

## Scenario 5: User Sees Old Data After Deployment

Answer:

```text
I check service worker, cache storage, browser cache, CDN cache, and API caching headers. If it is a PWA, I verify whether the old service worker is still serving cached files.
```

## Scenario 6: Accessibility Score Is Low

Answer:

```text
I run Lighthouse and axe for automated issues, then manually test keyboard navigation, focus order, visible focus, screen reader names, form labels, error messages, and color contrast. I also inspect elements in DevTools to verify roles, accessible names, and ARIA attributes.
```

## Junior Daily Debugging Flow

Use this order:

1. Check `Console` for errors.
2. Check `Network` for failing or slow APIs.
3. Check `Elements` for DOM/CSS/accessibility structure.
4. Run `Lighthouse` for quick performance and accessibility audit.
5. Use `Performance` when page is slow or interaction is delayed.
6. Use `Application` when storage, cookie, token, cache, or service worker is involved.
7. Use `Memory` when app slows down after repeated navigation.

## Angular Performance Checklist

Check:

- route lazy loading
- bundle size
- large third-party libraries
- repeated API calls
- expensive template methods
- impure pipes
- large DOM lists
- missing `track`
- missing virtual scroll
- too much work in `ngOnInit`
- unnecessary subscriptions
- change detection strategy
- image sizes
- layout shifts

## Angular Accessibility Checklist In Browser

Check:

- input labels in Elements panel
- button accessible names
- no clickable divs
- tab order
- focus outline
- modal focus trap
- route focus reset
- `aria-live` for dynamic messages
- contrast in Lighthouse or axe
- alt text for images
- errors connected with `aria-describedby`

## Best Final Interview Answer

```text
For browser debugging, I mainly use Chrome DevTools. Console helps me find runtime errors, Network helps with APIs and duplicate calls, Elements helps with DOM, CSS, and accessibility structure, Performance helps analyze LCP, CLS, INP, long tasks, and main-thread blocking, Lighthouse gives quick performance and accessibility audits, and Application helps debug localStorage, cookies, cache storage, and service workers.

For Core Web Vitals, I remember LCP as loading speed, INP as interaction responsiveness, and CLS as layout stability. In Angular, poor scores usually come from large bundles, heavy change detection, large DOM rendering, unoptimized images, duplicate API calls, or dynamic content causing layout shifts.
```

## Sources

- Core Web Vitals: https://web.dev/articles/vitals
- LCP: https://web.dev/articles/lcp
- CLS: https://web.dev/articles/cls
- INP: https://web.dev/articles/inp
- Chrome DevTools Performance panel: https://developer.chrome.com/docs/devtools/performance
- Chrome DevTools Lighthouse: https://developer.chrome.com/docs/devtools/lighthouse
- Chrome DevTools Application panel: https://developer.chrome.com/docs/devtools/application
