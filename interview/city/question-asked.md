🚀 Citi Bank Angular Interview Questions (6-7 Years Experience) L1 - Real Questions Asked

These questions were recently shared by one of my LinkedIn connections who attended an Angular interview at Citi Bank. What I found interesting is that the discussion was not focused only on Angular basics.

Below are interview-point-of-view answers you can revise before discussion.

## Sequence of Questions Asked

### 1) Give me some context about yourself.

**Answer:** I am a frontend developer with around 6-7 years of experience, mainly working with Angular, TypeScript, RxJS, REST API integration, unit testing, and enterprise application development. In my current role, I work on building scalable UI modules, integrating backend APIs, handling validations, improving performance, and collaborating with backend, QA, DevOps, and product teams. I also have experience with build/deployment processes, Agile delivery, and production support.

### 2) What is your current role and project?

**Answer:** In my current role, I work as a senior Angular developer. I am responsible for developing reusable components, integrating APIs, managing application state, writing unit tests, fixing production issues, and reviewing code. My project is an enterprise web application where users can perform business workflows such as search, create, update, approval, and reporting. I also participate in sprint planning, requirement discussions, API contract reviews, and deployment support.

### 3) What technologies have you worked on?

**Answer:** I have worked with Angular, TypeScript, JavaScript, HTML5, CSS/SCSS, RxJS, Angular Material, NgRx, REST APIs, Jasmine/Karma or Jest for unit testing, Git, Azure DevOps/Jenkins, Jira, Swagger/OpenAPI, and basic cloud/deployment concepts. I have also worked with tools like Postman, Chrome DevTools, npm, Webpack through Angular CLI, and CI/CD pipelines.

### 4) Do you communicate with API team?

**Answer:** Yes. I regularly communicate with the backend/API team for API contracts, request and response models, error handling, authentication headers, pagination, sorting, filtering, and performance-related issues. If an API response does not match the expected contract, I validate it using Swagger/Postman and discuss the fix with the backend team.

### 5) Did you work on API integration and RxJS?

**Answer:** Yes. I have integrated REST APIs using Angular `HttpClient` and RxJS operators. I commonly use operators like `map`, `switchMap`, `mergeMap`, `concatMap`, `forkJoin`, `combineLatest`, `catchError`, `tap`, `debounceTime`, and `takeUntil`. RxJS helps handle async API calls, dependent API flows, search suggestions, cancellation, retry, and data transformation.

### 6) Did you work on unit testing?

**Answer:** Yes. I have written unit tests for components, services, pipes, guards, and interceptors. For components, I test rendering, input/output behavior, form validation, and method calls. For services, I mock HTTP calls using `HttpTestingController`. I also mock dependencies using spies and focus on meaningful test cases around business logic and edge cases.

### 7) Which tools/processes did your team use? (Azure DevOps, SourceTree, Agile, Bitbucket, Jira)

**Answer:** We used Agile methodology with sprint planning, daily standups, backlog grooming, demo, and retrospective. For source control we used Git with Bitbucket/Azure Repos and tools like SourceTree or command line Git. Jira/Azure Boards was used for stories and tasks. Azure DevOps/Jenkins was used for CI/CD pipelines, build validation, and deployment.

### 8) What can you tell me about Webpack?

**Answer:** Webpack is a module bundler. It takes application files like TypeScript, JavaScript, CSS, images, and dependencies, then bundles them into optimized output files for the browser. In Angular, we usually do not configure Webpack directly because Angular CLI abstracts it, but internally Angular build uses bundling, minification, code splitting, optimization, hashing, and tree shaking.

### 9) What exactly happens when we bundle an Angular application?

**Answer:** During bundling, Angular compiles TypeScript and templates, resolves dependencies, converts code into browser-compatible JavaScript, optimizes CSS, removes unused code, creates separate chunks, minifies files, and adds content hashes for cache busting. The final output goes into the `dist` folder and contains files like `index.html`, JS bundles, CSS files, assets, and lazy-loaded chunks.

### 10) How do we see bundled files in the browser?

**Answer:** We can open Chrome DevTools, go to the Network tab, refresh the application, and filter by JS or CSS. We will see files like `main`, `polyfills`, `runtime`, `styles`, and lazy-loaded chunk files. In production builds these files usually have hashed names. We can also inspect the generated files in the `dist` folder after running `ng build`.

### 11) How do you optimize bundle size?

**Answer:** I optimize bundle size by using lazy loading, removing unused dependencies, using tree-shakable imports, avoiding importing whole libraries, enabling production builds, using Angular build budgets, analyzing bundles with tools like source-map-explorer, using standalone components where useful, and avoiding heavy third-party packages unless required.

### 12) What is tree shaking?

**Answer:** Tree shaking is the process of removing unused code from the final bundle. If a function, class, module, or library export is not used, the build tool can exclude it from the production bundle. It works best with ES modules and production optimization.

### 13) What is lazy loading?

**Answer:** Lazy loading means loading a feature module, route, or component only when the user needs it, instead of loading everything during initial application startup. In Angular, it is commonly implemented using route-level `loadChildren` or `loadComponent`. It improves initial load time by splitting the application into smaller chunks.

### 14) Explain the lifecycle from development till production deployment.

**Answer:** First, requirements are analyzed and stories are created. Developers implement features locally, write unit tests, and raise pull requests. Code is reviewed and merged to the development branch. CI pipelines run linting, tests, and builds. The application is deployed to lower environments like dev/QA/UAT for testing. After QA and business approval, the production build is created and deployed through a release pipeline. Post-deployment, smoke testing and monitoring are performed.

### 15) Do you use interceptors or proxy configuration?

**Answer:** Yes. I use interceptors for cross-cutting HTTP concerns like adding auth tokens, setting headers, logging, showing/hiding loaders, handling global errors, and refreshing tokens. Proxy configuration is mainly used in local development to avoid CORS issues and route frontend API calls to the backend server.

### 16) Have you heard about proxy.conf.json?

**Answer:** Yes. `proxy.conf.json` is used in Angular local development to proxy API requests to a backend server. For example, requests starting with `/api` can be redirected to `http://localhost:8080`. This avoids CORS issues during local development. It is configured in `angular.json` or passed with `ng serve --proxy-config proxy.conf.json`.

### 17) Where is your backend API hosted?

**Answer:** In enterprise projects, backend APIs are usually hosted on cloud or internal infrastructure such as Azure, AWS, Kubernetes, or company-managed servers. From the frontend point of view, we consume environment-specific base URLs for dev, QA, UAT, and production. The actual hosting details are generally owned by the backend/DevOps team.

### 18) How do frontend and backend developers collaborate?

**Answer:** We collaborate through API contract discussions, Swagger/OpenAPI specs, Jira stories, technical design calls, and integration testing. Before implementation, we agree on request payloads, response structure, status codes, validation rules, and error messages. During development, we use mock APIs or lower environment APIs, and we validate integration using Postman and browser testing.

### 19) How do you deploy your application?

**Answer:** Usually deployment is handled through CI/CD pipelines. After code is merged, the pipeline installs dependencies, runs tests, creates a production build using `ng build`, and publishes the `dist` output to a web server, CDN, cloud storage, or container. Environment-specific configuration is injected using build configuration or runtime config depending on the project setup.

### 20) Are you using Angular Material?

**Answer:** Yes. I have used Angular Material components like table, dialog, form fields, select, autocomplete, tabs, paginator, date picker, snackbar, and stepper. It helps build accessible and consistent UI faster. I also customize Material components using SCSS and theme configuration based on the design system.

### 21) What can you tell me about NgRx?

**Answer:** NgRx is a state management library for Angular based on Redux principles. It provides a single predictable store for application state. The main building blocks are Actions, Reducers, Selectors, Effects, and Store. It is useful when the application has complex shared state, multiple components depending on the same data, caching needs, or complicated user workflows.

### 22) Explain one real use case where you used NgRx.

**Answer:** One real use case is user profile and permissions management. After login, we load user details, roles, permissions, and menu configuration. Multiple components need this data, such as header, sidebar, route guards, and feature screens. Instead of calling the API from every component, we store the data in NgRx, expose it through selectors, and use effects to handle API calls.

### 23) Explain Reducers and Effects.

**Answer:** Reducers are pure functions that take the current state and an action, then return a new state. They should not call APIs or perform side effects. Effects handle side effects such as API calls, logging, navigation, or local storage updates. Effects listen for actions, perform async work, and dispatch success or failure actions.

### 24) Explain a scenario where you used RxJS.

**Answer:** A common scenario is search autocomplete. When the user types in a search box, I use `valueChanges`, `debounceTime`, `distinctUntilChanged`, and `switchMap` to call the API only after the user pauses typing. `switchMap` cancels the previous API call if the user types again, so the UI always shows the latest search result.

### 25) How would you combine multiple API responses into one?

**Answer:** If all API calls are independent and I need the final result after all complete, I use `forkJoin`. If APIs are dependent, I use `switchMap`, `concatMap`, or `mergeMap` depending on the flow. If I need to react whenever any source emits a new value, I use `combineLatest`.

### 26) Which RxJS operator would you use for parallel API calls?

**Answer:** I would use `forkJoin` for parallel API calls when each API completes and I need all responses together. Example: loading user profile, permissions, and dashboard summary at the same time, then rendering the page once all responses are available.

### 27) Why use concatMap instead of mergeMap?

**Answer:** I use `concatMap` when order matters and each request should complete before the next one starts. `mergeMap` runs inner observables in parallel, so responses may complete out of order. For example, saving multiple steps sequentially should use `concatMap`, while independent parallel updates can use `mergeMap`.

### 28) What does switchMap do?

**Answer:** `switchMap` maps a source value to an inner observable and cancels the previous inner observable when a new value comes. It is useful when only the latest result matters, such as search, filtering, route parameter changes, or dropdown-based API loading.

### 29) Where do you use switchMap in real projects?

**Answer:** I use `switchMap` in search autocomplete, route-based detail pages, filter changes, and dependent dropdowns. For example, when route `id` changes, `switchMap` cancels the previous detail API call and loads data for the latest `id`.

### 30) Why do we use pipe()?

**Answer:** `pipe()` is used to compose RxJS operators in a readable sequence. It allows us to transform data, handle side effects, filter emissions, manage errors, and control subscriptions. Example: `apiCall$.pipe(map(...), catchError(...))`.

### 31) What does tap() operator do?

**Answer:** `tap()` is used for side effects without changing the emitted value. It is commonly used for logging, debugging, setting loading flags, analytics, or triggering non-transforming actions. It should not be used to modify data flow logic.

### 32) How does backend share API contracts with frontend?

**Answer:** Backend usually shares API contracts through Swagger/OpenAPI, API documentation, Postman collections, sample request/response JSON, or contract documents. The contract includes endpoint URL, method, headers, request payload, response model, status codes, validations, and error format.

### 33) Do you use Swagger/OpenAPI specifications?

**Answer:** Yes. Swagger/OpenAPI helps frontend developers understand and test API endpoints before integration. I use it to check request payloads, response fields, status codes, query parameters, and authentication requirements. It also reduces confusion between frontend and backend teams.

This is the level expected for 6-7 years Angular developers now.
Not just Angular syntax.
Interviewers are evaluating: real project experience, build and deployment knowledge, RxJS depth, state management, team collaboration, and production-level understanding.

## Angular Fundamentals

### How does Angular Change Detection work?

**Answer:** Angular change detection checks whether component data has changed and updates the DOM accordingly. By default, Angular runs change detection after async events like clicks, timers, promises, and HTTP responses. It starts from the root component and checks the component tree. With better strategies like `OnPush`, signals, and immutable data, we can reduce unnecessary checks.

### Difference between Default and OnPush Change Detection

**Answer:** `Default` checks the component whenever Angular runs change detection. `OnPush` checks the component only when an input reference changes, an event happens inside the component, an observable used with `async` pipe emits, or change detection is manually triggered. `OnPush` improves performance when components use immutable data and predictable inputs.

### What is Zone.js and why is Angular moving away from Zone.js?

**Answer:** Zone.js patches async browser APIs and tells Angular when to run change detection. Angular is moving toward zoneless applications because signals and explicit reactivity can make updates more predictable and reduce unnecessary global change detection. This improves performance and gives developers more control.

### Signals vs NgRx - when would you use each?

**Answer:** Signals are good for local or component-level reactive state, derived values, and simple shared state. NgRx is better for large application state, complex workflows, API side effects, caching, debugging with Redux DevTools, and state shared across many unrelated features. In modern Angular, both can be used together depending on complexity.

### Smart Components vs Dumb Components

**Answer:** Smart components handle data fetching, state management, routing, and business logic. Dumb or presentational components receive data through inputs and emit events through outputs. This separation improves reusability, testability, and maintainability.

### Template-Driven Forms vs Reactive Forms

**Answer:** Template-driven forms are simpler and mostly defined in HTML using `ngModel`. They are suitable for small forms. Reactive forms are defined in TypeScript using `FormGroup`, `FormControl`, and validators. They are better for complex forms, dynamic controls, custom validation, and unit testing.

### Interceptors and their use cases

**Answer:** Interceptors sit between Angular `HttpClient` and the backend. They are used for adding auth tokens, setting headers, request/response logging, loader handling, global error handling, retry logic, and token refresh. They keep repeated HTTP logic out of components and services.

### How do you share data between components that have no relationship?

**Answer:** For unrelated components, I use a shared service with `Subject`, `BehaviorSubject`, signals, or NgRx store depending on complexity. For small communication, a service is enough. For global app state like user, permissions, filters, or cart data, NgRx or another state management solution is better.

## RxJS

### Explain forkJoin(), combineLatest()

**Answer:** `forkJoin` runs multiple observables in parallel and emits once when all complete, so it is best for HTTP calls. `combineLatest` emits whenever any source emits after all sources have emitted at least once, so it is best for combining ongoing streams like filters, form values, route params, and store selectors.

### switchMap() vs mergeMap() vs concatMap() vs exhaustMap()

**Answer:** `switchMap` cancels the previous request and keeps the latest. `mergeMap` runs requests in parallel. `concatMap` runs requests one by one in order. `exhaustMap` ignores new emissions while the current request is still running. For search use `switchMap`, for parallel saves use `mergeMap`, for ordered saves use `concatMap`, and for login button double-click prevention use `exhaustMap`.

### When would you use debounceTime()?

**Answer:** I use `debounceTime()` when I want to wait for a pause before reacting to frequent events. Common examples are search input, filter input, resize events, and form autosave. It reduces unnecessary API calls and improves performance.

### Real-world RxJS use cases

**Answer:** Real-world RxJS use cases include autocomplete search, dependent dropdowns, combining route params with API calls, polling, retrying failed requests, handling parallel API calls, managing form value changes, canceling stale requests, and composing multiple async operations in a clean way.

## State Management

### When should you use Services vs NgRx?

**Answer:** Services are enough for simple shared data, feature-level state, or small applications. NgRx is useful when state is shared across many screens, has complex update flows, needs caching, or requires predictable debugging. I avoid NgRx for very simple state because it adds boilerplate.

### Explain the complete NgRx Flow

**Answer:** A component dispatches an action. If it is a synchronous state change, a reducer updates the store. If it requires an API call, an effect listens to the action, calls the service, and dispatches success or failure actions. Reducers update the state based on those actions. Components read state using selectors.

### State management best practices

**Answer:** Keep state normalized, avoid storing duplicate derived data, use selectors for computed values, keep reducers pure, handle loading and error states, split state by feature, avoid direct mutation, and keep effects focused on side effects. Also, do not put everything in global state; use local state where it is enough.

## Performance Optimization

### How to improve Angular application performance?

**Answer:** Use lazy loading, `OnPush` change detection, `trackBy`, pure pipes, async pipe, virtual scrolling, pagination, bundle optimization, image optimization, caching, avoiding unnecessary subscriptions, reducing heavy third-party libraries, and profiling with Chrome DevTools or Angular DevTools.

### How does trackBy work?

**Answer:** `trackBy` helps Angular identify list items uniquely in `*ngFor` or `@for`. Instead of recreating DOM elements when the list changes, Angular reuses existing elements based on a unique key like `id`. This improves performance for large or frequently updated lists.

### Handling large datasets

**Answer:** For large datasets, I avoid loading everything at once. I use server-side pagination, filtering, sorting, lazy loading, virtual scrolling, caching, and optimized table rendering. I also avoid expensive calculations in templates and use `trackBy` for lists.

### Virtual Scrolling vs Pagination

**Answer:** Pagination splits data into pages and is useful when users need controlled navigation or backend-supported data loading. Virtual scrolling renders only visible rows while keeping the scrolling experience continuous. Virtual scrolling is good for large lists already available or fetched progressively, while pagination is better when backend controls data size.

### Server-side Pagination

**Answer:** Server-side pagination means the frontend sends page number, page size, sorting, and filter parameters to the backend. The backend returns only the required records and total count. This reduces frontend memory usage and improves performance for large datasets.

### Lazy Loading and its impact on performance

**Answer:** Lazy loading improves initial load performance because only required code is loaded at startup. Feature chunks are downloaded when users navigate to those routes. It reduces initial bundle size, improves first load time, and makes large applications easier to scale.

## Architecture

### Explain Microfrontend Architecture

**Answer:** Microfrontend architecture splits a large frontend application into smaller independently developed and deployed applications. Each microfrontend can represent a domain or feature area. Teams can own separate modules and integrate them through techniques like Module Federation, single-spa, or iframe-based approaches.

### Why choose Microfrontends when Lazy Loading already exists?

**Answer:** Lazy loading improves performance inside one application, but microfrontends solve team and deployment scalability. With microfrontends, different teams can build, release, and maintain separate parts independently. It is useful for large organizations, multiple domains, and independent release cycles.

### SSR vs CSR

**Answer:** CSR, or client-side rendering, renders the page in the browser after JavaScript loads. SSR, or server-side rendering, renders HTML on the server and sends it to the browser. SSR improves first contentful paint, SEO, and perceived performance, while CSR is simpler for internal enterprise apps where SEO is usually not important.

### API versioning strategies

**Answer:** Common API versioning strategies include URL versioning like `/api/v1/users`, header-based versioning, query parameter versioning, and backward-compatible contract evolution. Frontend should avoid breaking changes by coordinating API versions and using clearly documented contracts.

### Angular build process - what files are generated?

**Answer:** Angular build generates optimized files in the `dist` folder. Common files include `index.html`, `main` bundle, `polyfills`, `runtime`, `styles`, assets, and lazy-loaded chunk files. Production builds also include minification, hashing, optimization, and tree shaking.

### How are lazy-loaded modules bundled and loaded?

**Answer:** Lazy-loaded modules or components are split into separate JavaScript chunks during build. They are not loaded during initial startup. When the user navigates to the route, Angular router requests the related chunk from the server and loads it dynamically.

### How do you handle API versioning?

**Answer:** I handle API versioning by keeping base URLs and API paths configurable, consuming documented versions, avoiding hardcoded scattered endpoints, and coordinating with backend before contract changes. If a new version is introduced, we update services gradually and test affected flows in lower environments.

## Security

### How do you sanitize user input?

**Answer:** Angular automatically escapes values rendered in templates, which helps prevent XSS. For user input, I validate on both frontend and backend, avoid directly injecting HTML, and use Angular `DomSanitizer` only when absolutely required. The backend should also sanitize and validate because frontend validation can be bypassed.

### What is XSS and how do you prevent it?

**Answer:** XSS, or Cross-Site Scripting, happens when malicious scripts are injected into a web page and executed in the user's browser. To prevent it, avoid `innerHTML` with untrusted content, rely on Angular template escaping, sanitize HTML, use Content Security Policy, validate input, encode output, and never trust user-generated content.

### What is Security-by-Design?

**Answer:** Security-by-Design means considering security from the start of development instead of adding it later. It includes secure authentication, authorization, input validation, least privilege, secure API design, threat modeling, logging, dependency scanning, and secure handling of sensitive data.

### How do you securely send/store third-party API keys?

**Answer:** Third-party API keys should not be stored in Angular code because frontend code is visible in the browser. Sensitive keys should be stored on the backend or a secure secrets manager. The frontend should call our backend, and the backend should call the third-party API using the secret key.

### How do you secure client data after login?

**Answer:** Use secure authentication and authorization, HTTPS, short-lived tokens, refresh token rotation where applicable, route guards, role checks, secure cookies when possible, proper logout, clearing sensitive client state, and avoiding sensitive data in local storage. Also, API authorization must be enforced on the backend.

### Where should user roles and permissions be stored?

**Answer:** Roles and permissions should be stored and enforced on the backend. The frontend can store a copy in memory or state management to show/hide UI elements, but it should not be the source of truth. Backend APIs must always validate permissions before returning or modifying data.

### How would you implement RBAC (Role-Based Access Control) in Angular?

**Answer:** I would load user roles and permissions after login, store them in a service or NgRx store, use route guards to protect routes, and use structural directives or helper methods to show/hide UI actions. However, Angular RBAC is only for user experience; the backend must enforce actual access control.

### Difference between RBAC and ReBAC

**Answer:** RBAC gives access based on roles, such as admin, manager, or user. ReBAC gives access based on relationships, such as document owner, team member, account manager, or reporting manager. RBAC is simpler, while ReBAC is more flexible for complex relationship-based permissions.

## Configuration & Deployment

### Environment files vs Configuration files

**Answer:** Angular environment files are build-time configuration files replaced during build, such as `environment.ts` and `environment.prod.ts`. Runtime configuration files are loaded when the app starts, often from a JSON file. Runtime config is more flexible because the same build can be deployed to different environments without rebuilding.

### Structure of environment/config setup across environments

**Answer:** A good setup keeps environment-specific values like API base URL, feature flags, auth settings, and logging level separate for dev, QA, UAT, and production. For enterprise projects, runtime config is often preferred so DevOps can deploy the same artifact across environments with different configuration.

### Global Error Handling strategy

**Answer:** I use HTTP interceptors for API errors and Angular `ErrorHandler` for application-level errors. API errors can be mapped to user-friendly messages, logged, and handled globally for cases like 401, 403, 404, and 500. Application errors should be logged to monitoring tools, while the UI should show clear feedback without exposing technical details.
