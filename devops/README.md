# DevOps Interview Kit For Web Developers

This folder explains DevOps topics from a frontend/full-stack interview point of view.

It is written for both:

- freshers who need the basic picture
- experienced developers who need interview-ready explanations

## What DevOps Means

DevOps is a way of building and delivering software where development, testing, security, deployment, and operations work together.

Simple answer:

```text
DevOps helps teams deliver software faster and more reliably by automating build, test, quality checks, deployment, monitoring, and feedback.
```

For a web developer, DevOps means you should understand:

- how code moves from local machine to production
- how pipeline triggers
- what happens after a pull request
- how unit tests and builds run
- how SonarQube or CodeClimate checks code quality
- how Jenkins or Travis CI runs CI jobs
- how Octopus Deploy handles deployment/release promotion
- how logs and monitoring help after deployment

## Files

Read in this order:

1. [01-ci-cd-basics-and-architecture.md](./01-ci-cd-basics-and-architecture.md)
2. [02-sonarqube.md](./02-sonarqube.md)
3. [03-codeclimate.md](./03-codeclimate.md)
4. [04-travis-ci.md](./04-travis-ci.md)
5. [05-jenkins.md](./05-jenkins.md)
6. [06-octopus-deploy.md](./06-octopus-deploy.md)

## One Big Architecture Picture

```text
Developer
  |
  | pushes code
  v
Git Repository
  |
  | triggers pipeline
  v
CI Tool: Jenkins / Travis CI / GitHub Actions
  |
  | install dependencies
  | lint
  | unit tests
  | build
  | quality scan
  v
Quality Tools: SonarQube / CodeClimate
  |
  | pass quality gate
  v
Artifact
  |
  | deploy/release
  v
Deployment Tool: Octopus Deploy / Jenkins / Cloud Pipeline
  |
  v
Dev / QA / UAT / Production
  |
  v
Monitoring + Logs + Feedback
```

## Best Interview Answer

```text
In a typical CI/CD flow, a developer pushes code or raises a pull request. That event triggers a pipeline in a CI tool like Jenkins, Travis CI, or GitHub Actions. The pipeline installs dependencies, runs linting, executes tests, builds the application, and runs quality/security checks using tools like SonarQube or CodeClimate.

If all gates pass, the pipeline creates an artifact. Then a deployment tool like Octopus Deploy or Jenkins promotes that artifact through environments such as Dev, QA, UAT, and Production. After deployment, monitoring and logs help detect issues and improve future releases.
```

## What A Frontend Developer Should Know

You do not need to be a full DevOps engineer, but you should be able to explain:

- what happens when you push code
- why PR checks fail
- how tests run in pipeline
- why build can fail
- what SonarQube quality gate means
- how environment variables work
- why artifacts are created
- how deployment to UAT/Prod happens
- how rollback works at a high level
- how logs/monitoring help after release

## Common Interview Questions

- What is CI/CD?
- What is a pipeline?
- How does a pipeline trigger?
- What are common pipeline stages?
- What is a build artifact?
- What is SonarQube?
- What is quality gate?
- What is CodeClimate?
- What is Jenkins?
- What is Travis CI?
- What is Octopus Deploy?
- Difference between CI and CD?
- What happens after code is merged?
- How do you handle failed pipeline?
- How do you deploy Angular app?
- How do environment variables work?
- What is rollback?
- How do you ensure code quality in CI/CD?
