1. Angular 19 features, ng-zone
2. Angular application Migration and procedures
3. Microfrontend architecture with ngrx 
4. ngModel example with ngClass 
5. Anagram matching and time complexity 
6. Count the repeated characters in a string (Input: babacdcb || Output  b:3, a:2, c:2,d:1)
7. Separate the Duplicates from an unsorted array
Can you explain object-oriented programming concepts related to oops?
How familiar are you with prototype-based inheritance in JavaScript?
What do you understand about hoisting in JavaScript?
Can you explain Kadane's algorithm?
Can you implement a function to reverse a string?




Interview Questions:
1️⃣ Introduce yourself.
2️⃣ Explain your current project and your role in the project.
3️⃣ What challenges have you faced during Angular version migration?
4️⃣ Which technologies are you using in the frontend and backend?
5️⃣ Explain the difference between throttleTime and debounceTime in RxJS.
6️⃣ Coding Task:
Create a rectangle with a green background.
On hover, change the background color to red.
On hover, open/display the Google website inside the rectangle.
7️⃣ Explain the CORS (Cross-Origin Resource Sharing) policy.
8️⃣ How do you measure a web page's performance, and what techniques do you use to improve it?
9️⃣ How do you make a web page responsive?


# Interview Preparation — Senior Angular Developer (L4) - Part 1
---
## 1. Angular Core & Architecture
### Conceptual
1. Explain the Angular application bootstrap process — from `main.ts` to the first painted component.
2. What is the difference between `NgModule`-based architecture and Standalone Components (Angular 14+)? When would you prefer one over the other?
3. How does Angular's **Dependency Injection** hierarchy work? Explain `providedIn: 'root'` vs module-level vs component-level providers.
4. What are the differences between `ViewEncapsulation.Emulated`, `None`, and `ShadowDom`? When would you use each?
5. Explain the difference between `ContentChild`/`ContentChildren` and `ViewChild`/`ViewChildren`.
6. What is `ng-content` and how does multi-slot content projection work?
7. How does Angular's **Change Detection** work under the hood? Explain `Default` vs `OnPush` strategy with a real scenario.
8. What are **Signals** in Angular 17+? How do they differ from RxJS observables for reactivity?
9. What is the difference between `forRoot()` and `forChild()` in module configuration?
10. Explain **Lazy Loading** — how does it work internally and what are the performance implications?

### Scenario-Based
11. You have a deeply nested component tree with frequent re-renders affecting performance. Walk through your diagnosis and optimization strategy.
12. A component is not updating its view even though the data has changed. What are the likely causes and how do you debug them?
13. How would you architect a **shared component library** that can be consumed across multiple Angular projects in a monorepo?

---

## 2. TypeScript

### Conceptual
1. What are **Generics** in TypeScript and how do you use them in Angular services and components?
2. Explain the difference between `interface` and `type` in TypeScript. When would you prefer one?
3. What are **Decorators** in TypeScript? How does Angular leverage them?
4. What is the difference between `unknown`, `any`, and `never`?
5. Explain **mapped types**, **conditional types**, and **utility types** (`Partial`, `Required`, `Pick`, `Omit`, `Record`) with examples.
6. What is **strict mode** in TypeScript? What additional checks does it enable and why does it matter in large-scale Angular apps?
7. How do you type an Angular `EventEmitter`? What are the pitfalls of using `any` in event bindings?
8. Explain `ReturnType<T>`, `Parameters<T>`, and `InstanceType<T>` utility types.

### Scenario-Based
9. A colleague's PR uses `as any` extensively to bypass type errors. How do you approach the code review and what alternatives do you suggest?
10. How would you model a discriminated union for an API response that can be either `{ status: 'success', data: User }` or `{ status: 'error', message: string }`?



JavaScript
✅ Closures & Lexical Scope
✅ Event Loop (Call Stack, Web APIs, Microtasks & Macrotasks)
✅ Promises vs Async/Await
✅ var vs let vs const
✅ Hoisting & Temporal Dead Zone
✅ Debouncing vs Throttling
✅ this keyword & Arrow Functions
✅ map(), filter(), reduce()
✅ Prototype & Prototype Inheritance
Angular
✅ Standalone Components
✅ Angular Signals vs RxJS
✅ Component Lifecycle Hooks
✅ Dependency Injection
✅ Change Detection (Default vs OnPush)
✅ Reactive Forms vs Template-Driven Forms
✅ RxJS Operators (switchMap, mergeMap, concatMap, forkJoin)
✅ Route Guards & Lazy Loading
✅ HTTP Interceptors
✅ Pipes (Pure vs Impure)
✅ @Input(), @Output(), ViewChild()
✅ State Management (Signals, NgRx, Services)
✅ Angular Performance Optimization
✅ Angular 20 New Features
HTML & CSS
✅ Flexbox & Grid
✅ CSS Position (relative, absolute, fixed, sticky)
✅ Responsive Design & Media Queries
✅ Semantic HTML
✅ Pseudo Classes vs Pseudo Elements
✅ Block vs Inline Elements
✅ CSS Specificity
✅ Accessibility (ARIA, Keyboard Navigation)


1. What is ngOnInit()?
2. Explain @ViewChild and @ViewChildren.
3. Explain ViewChild and ViewChildren from the rendering perspective.
4. Do ViewChild and ViewChildren exist after ngAfterViewInit()?
5. What are Promises in JavaScript?
6. Find pairs whose sum is 10 in JavaScript.
7. Explain the Set-based pair-finding program.
8. Explain the pair-finding logic verbally.
9. What is the output of:
let arr = [1,2,3];
arr[10] = 5;
10. Explain why arr.length becomes 11.
11. What is the output of:
'5' + 1
'5' - 1
'5' + true
'5' - true

12. What is Subject in Angular?
13. Types of Subjects.
14. Difference between Observable and Subject.
15. Pass data from child to parent component in Angular 11. with example
16. Explain Auth Guards in Angular.
17. Different types of Route Guards (CanActivate, CanActivateChild, CanDeactivate, CanLoad).
18. What are RxJS operators?
19. Explain forkJoin().
20. What happens in forkJoin() if one API returns 500 and others return 200?
21. Difference between switchMap, mergeMap, concatMap, exhaustMap.
22. Which RxJS operator is used in Google Search autocomplete?
23. Difference between display: none and visibility: hidden.
24. What is ApplicationRef.tick() in Angular?
25. What is tick() in Angular unit testing?
26. What is TestBed in Angular unit testing?


Interview Questions
1️⃣ Where does an Angular application start? Explain the bootstrap process.
2️⃣ What is Server-Side Rendering (SSR)? Why is it used, and how do you implement it?
3️⃣ How do you implement Route Guards in Angular?
4️⃣ What challenges did you face while migrating an application from Angular 14 to Angular 17?
5️⃣ What are the key features introduced in Angular 17?
6️⃣ What is a Standalone Component? Why was it introduced?
7️⃣ How do you optimize performance while rendering large datasets?
8️⃣ How do you pass data between unrelated components?
9️⃣ How do you store and share common data across the entire application?
🔟 How would you handle 10 dependent API calls using RxJS?
1️⃣1️⃣ Explain the difference between Subject and BehaviorSubject.
1️⃣2️⃣ Explain the difference between Template-Driven Forms and Reactive Forms.
1️⃣3️⃣ What is Dependency Injection (DI) in Angular?
1️⃣4️⃣ What are Providers in Angular? What are the different ways to provide a service?
Coding Challenges
💻 Write a custom Title Case Pipe.
💻 Write code for Parent-to-Child and Child-to-Parent communication using @Input() and @Output().
💡 Key Takeaway:
The interview focused on Angular fundamentals, real-world application architecture, RxJS, Dependency Injection, performance optimization, Angular migration experience, and hands-on coding tasks. It was a good mix of conceptual questions and practical implementation.
Hope this helps fellow developers preparing for Angular/Frontend interviews. Feel free to share your interview questions in the comments!