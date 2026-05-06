# 01. CI/CD Basics And Architecture

## What Is CI?

CI means Continuous Integration.

Simple answer:

```text
CI means developers frequently merge code into a shared repository, and every change is automatically verified through build, lint, tests, and quality checks.
```

Why CI is useful:

- catches errors early
- avoids big risky merges
- keeps main branch stable
- gives fast feedback to developers
- improves team confidence

Real example:

```text
You push Angular code. CI installs npm packages, runs lint, unit tests, and production build. If something breaks, the PR is blocked before merge.
```

## What Is CD?

CD can mean Continuous Delivery or Continuous Deployment.

Continuous Delivery:

```text
Code is always in a deployable state, but production deployment may need manual approval.
```

Continuous Deployment:

```text
Every successful change is automatically deployed to production.
```

Most enterprise companies use Continuous Delivery for production because approvals, change windows, and compliance are needed.

## CI Vs CD

| Area | CI | CD |
| --- | --- | --- |
| Meaning | Continuous Integration | Continuous Delivery/Deployment |
| Focus | Verify code | Release code |
| Example | test/build PR | deploy to QA/UAT/Prod |
| Main value | catch issues early | deliver reliably |

## What Is A Pipeline?

A pipeline is an automated sequence of steps.

Example:

```text
Install -> Lint -> Test -> Build -> Scan -> Package -> Deploy
```

For Angular:

```text
npm ci
npm run lint
npm test
npm run build
sonar scan
publish dist folder
deploy to server/CDN
```

## How Pipeline Triggers

Pipelines can trigger when:

- code is pushed to a branch
- pull request is opened
- pull request is updated
- code is merged to main/develop
- tag is created
- schedule runs nightly
- manual button is clicked
- another pipeline finishes

Examples:

```text
PR pipeline: runs tests and quality checks before merge.
Main branch pipeline: builds artifact after merge.
Release pipeline: deploys artifact to QA/UAT/Prod.
Nightly pipeline: runs full regression or security scan.
Manual pipeline: used for controlled production deployment.
```

## Common Pipeline Stages

## 1. Checkout

Pipeline downloads source code from Git.

```text
Git repository -> CI workspace
```

## 2. Install Dependencies

For Angular/Node:

```bash
npm ci
```

Why `npm ci`?

```text
npm ci installs exact dependency versions from package-lock.json, which makes CI builds more reproducible.
```

## 3. Lint

Checks coding rules.

Example:

```bash
npm run lint
```

Catches:

- unused variables
- style issues
- bad imports
- possible bugs

## 4. Unit Tests

Runs automated tests.

Example:

```bash
npm test
```

For Angular:

- component tests
- service tests
- pipe tests
- guard tests
- interceptor tests

## 5. Build

Creates production-ready files.

Example:

```bash
npm run build
```

Output:

```text
dist/
```

## 6. Quality Scan

Tools like SonarQube or CodeClimate check:

- code smells
- duplication
- bugs
- vulnerabilities
- maintainability
- coverage

## 7. Artifact Creation

An artifact is the packaged output of a build.

For Angular:

```text
dist/my-app/
```

For backend:

```text
jar, war, docker image, zip package
```

Interview answer:

```text
An artifact is the deployable output created by the build pipeline. It should be versioned so the same artifact can be promoted across environments.
```

## 8. Deployment

Deployment moves artifact to environment.

Environments:

- Dev
- QA
- SIT
- UAT
- Staging
- Production

## 9. Smoke Test

Smoke tests verify basic health after deployment.

Examples:

- app loads
- login page opens
- health endpoint works
- main route returns 200

## CI/CD Architecture Dialogue

Interviewer:

```text
Can you explain how CI/CD works in your project?
```

Answer:

```text
In our project, developers create feature branches and raise pull requests. When a PR is created or updated, the CI pipeline gets triggered automatically.

The pipeline checks out code, installs dependencies, runs linting, unit tests, and creates a production build. Then quality tools like SonarQube can analyze code quality, coverage, duplication, and vulnerabilities.

If any step fails, the PR is blocked and the developer fixes the issue. If all checks pass and code review is approved, the code is merged.

After merge, another pipeline can create a versioned artifact. That artifact is then deployed to lower environments like Dev or QA. Once QA and business validation are completed, the same artifact can be promoted to UAT and Production through approval-based deployment.
```

## How Angular App Is Deployed

Angular build creates static files:

- HTML
- CSS
- JavaScript bundles
- assets

Deployment targets:

- Nginx
- Apache
- CDN
- S3/static hosting
- Docker container
- AEM/static asset pipeline depending on architecture

Simple answer:

```text
Angular applications are usually built into static files using production build. Those files are deployed to a web server, CDN, or container. Environment-specific configuration can come from build-time config or runtime config depending on project setup.
```

## Environment Configuration

Examples:

- API base URL
- analytics key
- feature flags
- app version
- auth config

Build-time config:

```text
Different environment files are used during build.
```

Runtime config:

```text
App loads config JSON at startup, so the same artifact can be used across environments.
```

Senior answer:

```text
Runtime config is often better for enterprise deployment because we can build once and promote the same artifact across environments by changing external configuration.
```

## Rollback

Rollback means returning to previous stable version.

Options:

- redeploy previous artifact
- switch traffic to previous version
- revert release
- disable feature flag
- restore previous config

Interview answer:

```text
Rollback should use a known stable artifact. That is why versioned artifacts and release history are important.
```

## What To Do When Pipeline Fails

Check:

- which stage failed
- logs
- dependency install issue
- test failure
- lint issue
- build error
- quality gate failure
- environment variable missing
- deployment permission issue

Interview answer:

```text
I first identify the failed stage and read the logs. If tests failed, I reproduce locally. If build failed, I check TypeScript or dependency issues. If quality gate failed, I review Sonar findings. If deployment failed, I check credentials, environment config, network, or server status.
```

## Best Interview Answer

```text
CI/CD automates software delivery. CI validates every code change through install, lint, tests, build, and quality checks. CD takes the verified artifact and deploys it to environments through controlled release steps. In enterprise projects, pipelines usually trigger on PR, merge, tags, schedules, or manual approvals.
```
