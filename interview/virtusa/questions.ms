Another day, Another interview! 🚀

Today I attended a Virtusa Angular Developer Interview (6+ Years Experience). Sharing the topics and scenarios that were discussed. Hope this helps others preparing for Angular interviews.

Angular

- Difference between Components and Services
- Service providers:
  - Root level
  - Module level
  - Component level
  - When to use each
- Reactive Forms
  - Why Reactive Forms?
  - When to use them over Template-driven Forms
- Lazy Loading
  - Implementation for a Feature Module
  - Benefits and real-world use cases
- Dependent API calls using RxJS
  - Fetch User Profile → Use User ID → Fetch Orders
  - Implement using "switchMap"
- Difference between:
  - "switchMap"
  - "mergeMap"
  - "concatMap"
  - Appropriate scenarios for each
- "ngOnDestroy"
  - Why unsubscribe?
  - Which observables require unsubscription?
  - Memory leak scenarios

JavaScript

- Difference between:
  - "var"
  - "let"
  - "const"
- Why "var" can lead to unexpected behavior
- Practical scenario using loops and asynchronous callbacks

HTML & CSS

- Flexbox vs CSS Grid
- Bootstrap responsive classes
- Combining Bootstrap with Media Queries
- Responsive design for different screen sizes

Testing

- Angular Unit Testing
- Jasmine and Karma
- Testing Components and Services
- Mocking HTTP requests
- Unit Testing vs Integration Testing

Coding Question

Scenario: Two API calls where the second API depends on the response of the first.

- First API: Fetch the User Profile.
- Extract the "userId" from the response.
- Second API: Fetch the user's Orders using the "userId".
- Implement the solution using the appropriate RxJS operator ("switchMap") and explain why it is the best choice over "mergeMap" and "concatMap".