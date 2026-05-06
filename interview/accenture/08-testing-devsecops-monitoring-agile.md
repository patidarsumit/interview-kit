# 08. Testing, DevSecOps, Monitoring, Agile

The JD explicitly mentions testing, monitoring, Scrum, and DevSecOps.

Do not ignore these in final round.

## Angular Testing

Prepare:

- component unit tests
- service tests
- pipe tests
- HTTP tests
- guard tests
- form validation tests
- accessibility tests

Strong answer:

```text
I test behavior rather than private implementation. For Angular, I use TestBed for components/services, HttpClient testing utilities for API services, and focused tests for validators, guards, and pipes.
```

## Accessibility Testing

Tools mentioned:

- Axe DevTools
- Selenium/SauceLabs/Perfecto in broader test ecosystem

Talk about:

- semantic HTML
- labels
- keyboard navigation
- ARIA when needed
- focus management
- color contrast
- accessible error messages

## API Testing Awareness

Tools listed:

- Karate
- SoapUI/ReadyAPI
- DevTest

Frontend angle:

```text
I collaborate with API/QA teams by understanding API contracts, status codes, error formats, and test data needs. I also mock APIs during frontend testing where needed.
```

## Monitoring

Tools:

- Dynatrace
- Splunk
- Blue Triangle

Prepare:

- production errors
- API latency
- frontend page performance
- JS errors
- user sessions/browser/device
- correlation IDs/request IDs
- logs and dashboards

Answer:

```text
For production issues, I start with user impact and timeframe, then check logs/monitoring, browser console/network, API errors, and recent deployments. Tools like Splunk/Dynatrace help identify error patterns, latency, and affected users.
```

## DevSecOps

Tools:

- GitHub
- Jenkins
- Maven
- SonarQube

Prepare:

- pull request
- code review
- CI pipeline
- unit test step
- Sonar quality gate
- security scan
- artifact build
- deployment stages

Answer:

```text
In CI/CD, code goes through PR review, automated tests, linting, build, SonarQube quality gate, and deployment pipeline. DevSecOps means security and quality checks are part of delivery, not an afterthought.
```

## Scrum

Prepare:

- sprint planning
- daily standup
- refinement
- sprint review
- retrospective
- story points
- acceptance criteria
- definition of done

Good answer:

```text
I work with Scrum by participating in grooming, planning, daily updates, reviews, and retrospectives. I make sure stories have clear acceptance criteria and raise blockers early.
```

## Code Quality

Mention:

- linting
- formatting
- SonarQube
- unit tests
- code review
- small PRs
- reusable components
- no duplicated logic
- security review

## Final-Round Questions

- How do you ensure quality?
- How do you debug production issue?
- What is your testing approach?
- How do you work in Agile?
- What happens in your CI/CD pipeline?
- Have you used SonarQube?
- How do you handle accessibility defects?
- How do you monitor frontend performance?

