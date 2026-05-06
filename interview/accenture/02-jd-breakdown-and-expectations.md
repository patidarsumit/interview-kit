# 02. JD Breakdown And Interview Expectations

## Role Summary

The role says:

> Develop custom software solutions to design, code, and enhance components across systems or applications.

This means they want someone who can:

- understand requirements
- design reusable components
- code production features
- integrate with APIs/CMS/third-party libraries
- improve existing systems
- work in agile delivery
- follow quality and DevSecOps practices

## Must-Have: Angular

Expect deep Angular questions on:

- components
- lifecycle
- routing
- guards
- interceptors
- services and dependency injection
- RxJS
- forms
- lazy loading
- change detection
- performance
- testing
- security
- reusable components/directives/pipes

They may ask you to explain from project experience, not just definitions.

## Good-To-Have: AEM UI Development

If you do not have deep AEM experience, prepare integration-level answers.

Know:

- AEM is a CMS used for enterprise content management
- frontend may consume content authored in AEM
- AEM components/templates can map to UI components
- Adobe Analytics and Target are often used for tracking/personalization
- frontend should handle authorable content, responsive layout, accessibility, and performance

Positioning:

```text
My primary strength is Angular, but I understand how enterprise frontend applications integrate with CMS platforms like AEM. I can work with authored content, component-driven UI, analytics tagging, and API/content integration patterns.
```

### What Is AEM?

AEM means Adobe Experience Manager.

Simple answer:

```text
AEM is an enterprise content management system used to create, manage, publish, and personalize digital experiences such as websites, landing pages, forms, and content-driven applications.
```

In real projects, AEM helps business/content teams manage content without asking developers to change code every time.

Example:

```text
A marketing team can update banner text, images, offers, campaign pages, and SEO content from AEM authoring instead of asking developers to redeploy the frontend.
```

### AEM Terms You Should Know

| Term | Meaning |
| --- | --- |
| Author | Environment where content editors create/update content |
| Publish | Environment where end users see published content |
| Component | Reusable content/UI block, like banner, card, carousel |
| Template | Page structure used to create pages |
| DAM | Digital Asset Manager for images, PDFs, videos |
| Dispatcher | Caching and request filtering layer in front of AEM |
| Adobe Analytics | Tracking and reporting user behavior |
| Adobe Target | Personalization and A/B testing |
| OSGi | Java module system used inside AEM backend |

### AEM UI Development In Frontend Terms

For a frontend developer, AEM UI work may include:

- building reusable components
- converting Figma/design into responsive UI
- consuming AEM content APIs
- mapping CMS content fields to UI
- supporting authorable content
- adding analytics attributes
- handling accessibility
- optimizing images/assets
- testing authored variations

Interview answer:

```text
In AEM UI development, the frontend developer needs to build reusable and responsive components that can work with content authored in AEM. The focus is not only static UI, but also authorable content, component variations, accessibility, performance, caching, analytics tags, and personalization support.
```

### If Asked: Do You Have AEM Experience?

Use honest answer:

```text
My primary hands-on experience is Angular. I have not worked deeply as an AEM backend developer, but I understand AEM from a frontend integration perspective.

I know AEM is used as an enterprise CMS where content authors manage pages, assets, and components. As a frontend engineer, I can contribute by building responsive, accessible UI components, consuming authored content, following design system guidelines, and supporting analytics or personalization needs.

Because I already work with component-driven frontend architecture, reusable UI, accessibility, and performance, I am confident I can ramp up on project-specific AEM practices quickly.
```

### Possible AEM Questions

What is AEM?

```text
AEM is Adobe Experience Manager, an enterprise CMS used for managing websites, digital assets, content pages, forms, and personalized digital experiences.
```

What is the difference between author and publish?

```text
Author is where content editors create and review content. Publish is where approved content is available to end users.
```

What is DAM?

```text
DAM means Digital Asset Manager. It stores and manages assets like images, PDFs, videos, and documents used in pages and components.
```

How can Angular integrate with AEM?

```text
Angular can integrate with AEM by consuming content through APIs or by being part of an AEM-driven frontend setup. The Angular side handles UI rendering, routing, state, accessibility, and interaction, while AEM manages authored content and assets.
```

## Good-To-Have: React.js

Expect comparison questions:

- Angular vs React
- component model
- state management
- hooks vs Angular lifecycle/signals
- when to choose which

Positioning:

```text
Angular gives a full framework with DI, router, forms, HTTP, and opinionated architecture. React is a UI library and usually needs ecosystem choices for routing/forms/state. I can work with React basics, but my stronger production depth is Angular.
```

### React Basics You Should Know

React is a JavaScript library for building UI.

Core ideas:

- component
- props
- state
- hooks
- JSX
- conditional rendering
- list rendering
- event handling
- controlled forms

Simple answer:

```text
React is a UI library where we build screens using components. Data is passed using props, component-level data is managed using state, and hooks like useState and useEffect handle state and side effects.
```

### React Vs Angular

| Area | Angular | React |
| --- | --- | --- |
| Type | Full framework | UI library |
| Language | TypeScript-first | JavaScript/TypeScript |
| Router | Built-in Angular Router | Usually React Router/Next.js |
| Forms | Template-driven/reactive forms | Controlled/uncontrolled forms or libraries |
| DI | Built-in dependency injection | Not built-in like Angular |
| State | Services, RxJS, signals, NgRx | useState, context, Redux/Zustand |
| Structure | Opinionated | Flexible |

Interview answer:

```text
Angular is more opinionated and gives a complete framework with router, forms, DI, HTTP, and CLI conventions. React focuses mainly on UI and gives more flexibility, but the team must choose routing, state, forms, and architecture libraries.
```

### Possible React Questions

What are props?

```text
Props are inputs passed from a parent component to a child component. They make components reusable and configurable.
```

What is state?

```text
State is data owned by a component that can change over time and cause the UI to re-render.
```

What is useEffect?

```text
useEffect is used for side effects like API calls, subscriptions, timers, or syncing with external systems after render.
```

What is controlled component?

```text
A controlled component is a form input where the value is controlled by React state.
```

How much React should you claim?

```text
My primary production depth is Angular, but I understand React fundamentals like components, props, state, hooks, routing concepts, and reusable UI patterns. I can work on React code with some ramp-up time.
```

## Good-To-Have: Node.js

They may check API integration understanding:

- REST
- JSON
- auth
- middleware
- logging
- error handling
- Node backend basics

You do not need to sound like backend lead unless your experience says so.

### What Is Node.js?

Node.js is a JavaScript runtime that allows JavaScript to run outside the browser.

Simple answer:

```text
Node.js is commonly used to build backend APIs, middleware, command-line tools, build tools, and server-side applications using JavaScript or TypeScript.
```

### Node.js Concepts To Know

- event loop
- non-blocking I/O
- npm
- Express/NestJS
- middleware
- REST APIs
- request/response
- error handling
- logging
- authentication
- environment variables

### Express/NestJS Basic Understanding

Express is a lightweight Node.js framework.

NestJS is a structured Node.js framework inspired by Angular concepts like modules, controllers, services, and dependency injection.

Interview answer:

```text
I have frontend depth, but I also understand backend API flow. In Node.js/Express or NestJS, requests come to routes/controllers, business logic is handled in services, database logic is separated, and middleware can handle authentication, logging, validation, and error handling.
```

### Possible Node.js Questions

What is middleware?

```text
Middleware is a function that runs between request and response. It can be used for authentication, logging, validation, parsing request body, or error handling.
```

What is REST API?

```text
A REST API exposes resources through HTTP methods like GET, POST, PUT, PATCH, and DELETE. The frontend communicates with it using JSON data.
```

What is JWT?

```text
JWT is a token format used to represent authenticated user claims. In frontend applications, it is commonly used in auth flows, usually with access token and refresh token strategy.
```

How does frontend use backend APIs?

```text
The frontend calls APIs through HTTP clients, sends request data, receives JSON response, handles loading/error states, and updates UI based on the response.
```

## HTML5/CSS/GraphQL/JSON/XML/SQL

Prepare:

- semantic HTML
- accessibility
- responsive CSS
- SCSS basics
- GraphQL query/mutation concept
- JSON vs XML
- SQL joins/basic queries

### HTML5

HTML5 is not just tags. In interviews, focus on semantic structure and accessibility.

Important tags:

- `header`
- `nav`
- `main`
- `section`
- `article`
- `footer`
- `button`
- `label`
- `form`
- `input`

Good answer:

```text
Semantic HTML improves accessibility, SEO, maintainability, and browser behavior. For example, using a real button is better than a clickable div because it supports keyboard and screen readers by default.
```

Example:

```html
<main>
  <h1>Booking details</h1>

  <form>
    <label for="guestName">Guest name</label>
    <input id="guestName" name="guestName">

    <button type="submit">Create booking</button>
  </form>
</main>
```

### CSS

Know practical CSS:

- box model
- flexbox
- grid
- responsive design
- media queries
- specificity
- CSS variables
- SCSS basics
- focus states
- contrast

Interview answer:

```text
For CSS, I focus on responsive layouts, reusable styles, design consistency, accessibility states like focus and contrast, and avoiding fragile CSS selectors.
```

Flexbox vs Grid:

```text
Flexbox is usually better for one-dimensional layout: row or column. Grid is better for two-dimensional layout: rows and columns together.
```

### GraphQL

GraphQL is an API query language.

Simple answer:

```text
GraphQL allows the frontend to request exactly the fields it needs. Instead of multiple REST endpoints, GraphQL commonly exposes a single endpoint where the client sends queries or mutations.
```

Query example:

```graphql
query GetUser {
  user(id: "101") {
    id
    name
    email
  }
}
```

Mutation example:

```graphql
mutation UpdateUser {
  updateUser(id: "101", input: { name: "Sumit" }) {
    id
    name
  }
}
```

REST vs GraphQL:

```text
REST exposes multiple endpoints for resources. GraphQL exposes a query layer where the client can request specific fields. GraphQL can reduce over-fetching and under-fetching, but it requires schema design, caching strategy, and query complexity control.
```

### JSON

JSON means JavaScript Object Notation.

Simple answer:

```text
JSON is a lightweight data format commonly used for API communication between frontend and backend.
```

Example:

```json
{
  "id": 101,
  "name": "Sumit",
  "roles": ["admin", "manager"]
}
```

### XML

XML is a markup-based data format.

Simple answer:

```text
XML is a structured data format that uses tags. It is more verbose than JSON and is common in older enterprise systems, SOAP APIs, configuration files, and integrations.
```

Example:

```xml
<user>
  <id>101</id>
  <name>Sumit</name>
</user>
```

JSON vs XML:

| Area | JSON | XML |
| --- | --- | --- |
| Style | Lightweight object format | Tag-based markup |
| Readability | Usually simpler | More verbose |
| Common use | REST APIs | SOAP/legacy enterprise systems |
| Parsing | Easy in JavaScript | Needs XML parser |

### SQL

SQL means Structured Query Language.

Used for relational databases.

Basic things to know:

- `SELECT`
- `WHERE`
- `JOIN`
- `GROUP BY`
- `ORDER BY`
- `INSERT`
- `UPDATE`
- `DELETE`

Example:

```sql
SELECT employee_id, name, department
FROM employees
WHERE status = 'ACTIVE'
ORDER BY name;
```

Join example:

```sql
SELECT e.name, d.department_name
FROM employees e
JOIN departments d ON d.id = e.department_id;
```

Interview answer:

```text
I am not positioning myself as a database specialist, but I can read and write basic SQL queries, understand joins, filters, sorting, and how frontend filters map to backend/database queries.
```

## Third-Party Libraries

They may ask:

- how do you evaluate a library
- how do you integrate it
- how do you handle upgrades
- how do you reduce bundle impact
- how do you wrap third-party components

Best answer:

```text
I check maintenance, bundle size, security, license, accessibility, documentation, TypeScript support, and whether it fits our architecture. For UI libraries, I prefer wrapping them behind internal components so replacement or upgrade is easier.
```

### Real Example

Suppose you need a chart library.

Check:

- does it support required chart types?
- bundle size
- Angular wrapper availability
- TypeScript support
- accessibility support
- maintenance activity
- license
- documentation
- theming/customization
- SSR compatibility if needed
- performance with large data

Interview answer:

```text
When integrating a third-party library, I do not directly spread it across the whole application. If possible, I wrap it inside our own component or service. That way, if the library changes or we replace it later, the impact is limited.
```

### Third-Party Library Risks

- bundle size increase
- security vulnerabilities
- poor maintenance
- license issues
- accessibility gaps
- breaking changes during upgrade
- inconsistent UI
- SSR/browser-only issues

How to reduce risk:

- wrapper component/service
- version pinning
- code review
- test important flows
- check changelog before upgrade
- run security scan
- lazy load heavy libraries

Example:

```text
For a graph library like AntV G6, I would isolate it inside a workflow canvas component, avoid leaking library-specific APIs everywhere, and destroy/cleanup the instance when the component is destroyed.
```

## Logging/Monitoring

Tools mentioned:

- Dynatrace
- Splunk
- Blue Triangle

They may ask:

- how did you debug production issue
- how did you read logs
- what metrics matter
- how do you track frontend performance

Talk about:

- error logs
- correlation/request IDs
- API failure rates
- page load time
- Core Web Vitals
- user session/browser details

### What Is Monitoring?

Monitoring means observing the health and behavior of an application in real time or near real time.

Frontend monitoring can include:

- JavaScript errors
- failed API calls
- page load time
- Core Web Vitals
- user sessions
- browser/device info
- release version

Backend monitoring can include:

- API latency
- error rate
- CPU/memory
- database issues
- logs
- traces

### Dynatrace

Dynatrace is an observability and monitoring platform.

It can help monitor:

- application performance
- user sessions
- API latency
- infrastructure health
- frontend/browser performance
- errors and traces

Interview answer:

```text
Dynatrace is used for application performance monitoring and observability. From a frontend perspective, it can help track page performance, user actions, JavaScript errors, API latency, and user-impacting issues.
```

### Splunk

Splunk is commonly used for searching, analyzing, and visualizing logs/events.

Interview answer:

```text
Splunk is useful for log analysis. During production debugging, teams can search logs using timestamp, user ID, request ID, API endpoint, error message, or correlation ID to understand what happened.
```

### Blue Triangle

Blue Triangle is commonly used for digital experience monitoring, performance, and business impact analysis.

Interview answer:

```text
Blue Triangle focuses on digital experience monitoring. It can help track frontend performance, page speed, user experience, and how performance affects business metrics.
```

### Production Debugging Answer

```text
For production issues, I first try to reproduce the issue and collect details like user, browser, route, timestamp, request ID, and release version. Then I check frontend logs, network/API errors, monitoring dashboards, and backend logs if available. I look for whether the issue is user-specific, browser-specific, API-related, deployment-related, or data-related.
```

### Metrics To Mention

- error rate
- API latency
- request count
- page load time
- LCP
- INP
- CLS
- JavaScript errors
- failed login attempts
- session count
- release version
- browser/device breakdown

## Testing

Tools listed are broad:

- QTest
- Axe DevTools
- Selenium
- Karate
- SoapUI/ReadyAPI
- Mocha
- SauceLabs
- Perfecto

For Angular, prepare:

- unit testing components/services/pipes
- HTTP tests
- guard tests
- e2e concepts
- accessibility testing with Axe
- API testing awareness

### QTest

QTest is a test management tool.

Simple answer:

```text
QTest is used to manage test cases, test execution, test plans, defects, and reporting. QA teams often use it to track manual and automated testing progress.
```

### Axe DevTools

Axe DevTools is used for accessibility testing.

It can detect issues like:

- missing labels
- color contrast problems
- invalid ARIA
- missing alt text
- buttons without accessible names

Interview answer:

```text
Axe helps catch accessibility issues automatically, but I also do manual keyboard and screen reader checks because automated tools cannot catch all accessibility problems.
```

### Selenium

Selenium is used for browser automation testing.

Simple answer:

```text
Selenium automates browser interactions like clicking, typing, navigation, and validation. It is commonly used for end-to-end testing across browsers.
```

### Karate

Karate is mainly used for API testing.

Simple answer:

```text
Karate is an API testing framework where teams can write tests for REST services, validate response status, payload, headers, and business behavior.
```

### SoapUI / ReadyAPI

Used for API testing, especially SOAP and REST services.

Simple answer:

```text
SoapUI and ReadyAPI are tools for testing APIs. They are common in enterprise systems where SOAP, REST, request payloads, response validation, and service-level testing are important.
```

### Mocha

Mocha is a JavaScript test framework.

Simple answer:

```text
Mocha is a JavaScript testing framework often used with assertion libraries to test Node.js or frontend JavaScript code.
```

### SauceLabs And Perfecto

These are cloud testing platforms.

They help test:

- browsers
- devices
- mobile web
- cross-browser behavior
- automated test execution at scale

Interview answer:

```text
SauceLabs and Perfecto are cloud-based testing platforms used to run automated tests across different browsers, devices, and operating systems. They are useful for cross-browser and mobile compatibility testing.
```

### Testing Strategy Answer

```text
For frontend testing, I think in layers. Unit tests verify components, services, pipes, guards, and small logic. E2E tests verify critical user journeys like login, form submission, and navigation. Accessibility tests catch WCAG issues. API tests verify backend contracts. In CI/CD, these tests help catch issues before release.
```

## DevSecOps

Tools:

- GitHub
- Jenkins
- Maven
- SonarQube

Prepare:

- PR/code review
- branch strategy
- CI/CD pipeline
- unit tests in pipeline
- Sonar quality gates
- security scanning
- deployment promotion

### What Is DevSecOps?

DevSecOps means development, security, and operations are integrated into the delivery process.

Simple answer:

```text
DevSecOps means security and quality checks are included throughout development and CI/CD, not only at the end before production.
```

### GitHub

GitHub is used for:

- source code hosting
- pull requests
- code review
- branch strategy
- GitHub Actions CI/CD
- issue tracking depending on team process

Interview answer:

```text
In GitHub, I usually work through branches and pull requests. Code goes through review, automated checks, unit tests, build validation, and then merge based on team process.
```

### Jenkins

Jenkins is a CI/CD automation tool.

Pipeline may include:

- checkout code
- install dependencies
- lint
- unit test
- build
- SonarQube scan
- package artifacts
- deploy to environment

Interview answer:

```text
Jenkins automates the build and deployment pipeline. It helps make delivery consistent by running steps like install, test, build, quality scan, and deployment.
```

### Maven

Maven is mainly used in Java projects for build and dependency management.

Why it appears in frontend JD:

```text
In enterprise projects, frontend may be part of a larger Java/AEM/backend pipeline. Maven may build backend or AEM packages while npm builds frontend assets.
```

Interview answer:

```text
Maven is mostly used for Java-based build and dependency management. I have primarily worked with npm/Angular CLI on frontend, but I understand Maven can be part of enterprise backend or AEM build pipelines.
```

### SonarQube

SonarQube analyzes code quality.

It checks:

- bugs
- vulnerabilities
- security hotspots
- code smells
- duplication
- maintainability
- test coverage

Quality gate:

```text
A quality gate is a pass/fail rule set. If the project does not meet required standards like coverage, duplication, security, or maintainability, the gate can fail and block merge/deployment.
```

Interview answer:

```text
SonarQube helps maintain code quality by detecting bugs, vulnerabilities, code smells, duplication, and coverage gaps. In CI/CD, the quality gate can stop poor-quality code from moving forward.
```

### CI/CD Pipeline Answer

```text
A typical pipeline starts when code is pushed or a PR is raised. It installs dependencies, runs linting, executes unit tests, builds the application, runs SonarQube or security scans, creates artifacts, and deploys to the target environment if all gates pass.
```

### Security Checks For Frontend

Mention:

- dependency vulnerability scanning
- avoid hardcoded secrets
- secure token storage
- XSS prevention
- avoid unsafe HTML
- CSP awareness
- HTTPS
- auth guard/interceptor
- code review
- access control checks

Best answer:

```text
For frontend security, I focus on avoiding XSS, not storing sensitive data insecurely, validating user inputs, using secure authentication flows, reviewing third-party dependencies, and ensuring role-based UI is backed by backend authorization.
```

## Scrum And Agile

The JD mentions Scrum development practices.

Know:

- sprint planning
- daily standup
- refinement/grooming
- sprint review/demo
- retrospective
- story points
- acceptance criteria
- definition of done
- product backlog
- sprint backlog

### Scrum Roles

| Role | Responsibility |
| --- | --- |
| Product Owner | Prioritizes backlog and business value |
| Scrum Master | Helps remove blockers and improves process |
| Development Team | Designs, builds, tests, and delivers increments |

### Interview Answer

```text
I have worked in Agile/Scrum teams where we participate in sprint planning, daily standups, backlog refinement, code reviews, QA coordination, sprint demos, and retrospectives. I focus on understanding acceptance criteria clearly, raising blockers early, and delivering tested work within the sprint.
```

### Definition Of Done

Definition of Done may include:

- code completed
- unit tests added/updated
- code reviewed
- build passing
- Sonar quality gate passing
- accessibility checked
- QA defects fixed
- acceptance criteria met
- deployed to required environment

Interview answer:

```text
Definition of Done means the team-agreed checklist that confirms a story is truly complete, not just coded. It usually includes code review, testing, quality checks, and acceptance criteria verification.
```

## Final JD-Based Answer

If they ask:

```text
How do you match this JD?
```

Use:

```text
My strongest match is Angular and enterprise frontend development. I have experience building reusable components, complex forms, API integrations, role-based flows, performance improvements, accessibility fixes, testing, and CI/CD practices.

For the good-to-have areas, I understand React fundamentals, Node/API flow, GraphQL basics, JSON/XML, SQL basics, third-party integration, monitoring concepts, testing tools, Scrum, and DevSecOps practices.

I may not claim deep hands-on in every tool listed, but I understand how these tools fit into enterprise software delivery and I can ramp up quickly based on project needs.
```
