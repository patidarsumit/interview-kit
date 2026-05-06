# 07. AEM, React, Node.js Adjacent Prep

The JD says Angular is must-have, while AEM UI Development, React.js, and Node.js are good-to-have.

Prepare enough to sound integration-ready.

## AEM UI Development

AEM stands for Adobe Experience Manager.

It is an enterprise CMS used for:

- content authoring
- templates
- pages
- reusable content components
- digital asset management
- personalization
- analytics integration

## How Angular Can Work With AEM

Possible patterns:

- Angular app consumes content from AEM APIs
- AEM manages page/content, Angular renders interactive components
- frontend integrates Adobe Analytics/Target tracking
- AEM components map to frontend components

Answer:

```text
My primary hands-on depth is Angular. From an AEM integration perspective, I understand that AEM provides authorable content and component/page structure. Angular can consume that content through APIs or be integrated into an AEM-driven experience. Key concerns are component mapping, responsive UI, accessibility, caching, analytics tagging, and performance.
```

## Adobe Analytics / Target

Know:

- Adobe Analytics tracks user behavior
- Adobe Target supports personalization/A-B testing
- frontend may need tagging/events
- data layer consistency matters

## React.js

Prepare comparison:

Angular:

- full framework
- DI
- Router
- Forms
- HTTP
- RxJS
- opinionated structure

React:

- UI library
- hooks
- ecosystem choices
- often paired with Next.js, React Router, Redux/Zustand

Answer:

```text
Angular is more batteries-included and opinionated, which helps enterprise teams keep consistency. React gives more flexibility but requires library choices for routing/forms/state. I can work with React fundamentals, but my stronger production depth is Angular.
```

## Node.js

Know:

- JavaScript runtime outside browser
- REST APIs
- Express
- middleware
- auth
- logging
- database integration

Answer:

```text
I understand Node.js from an integration/API perspective. I can work with REST APIs, JSON payloads, auth headers, error responses, and basic Express-style middleware. My primary contribution in this role would still be Angular/frontend, but I can collaborate effectively with Node/backend teams.
```

## GraphQL

Know:

- client asks for exact fields
- query for read
- mutation for write
- can reduce over-fetching
- needs caching/error handling

Example:

```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
  }
}
```

## JSON vs XML

JSON:

- lightweight
- common in REST APIs
- easy with JavaScript

XML:

- tag-based
- common in older enterprise/SOAP systems
- supports schemas/namespaces

## SQL

Prepare basics:

```sql
SELECT id, name
FROM users
WHERE role = 'admin'
ORDER BY created_at DESC;
```

Know:

- joins
- where
- group by
- indexes
- SQL injection concept

