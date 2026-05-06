# 06. Octopus Deploy

## What Is Octopus Deploy?

Octopus Deploy is a deployment automation and release management tool.

Simple answer:

```text
Octopus Deploy helps automate deployments and promote the same versioned release across environments like Dev, QA, UAT, and Production.
```

It is often used with CI tools like Jenkins, TeamCity, Azure DevOps, GitHub Actions, or Travis CI.

## CI Tool Vs Octopus Deploy

| Area | CI Tool | Octopus Deploy |
| --- | --- | --- |
| Main job | Build and test code | Deploy releases |
| Examples | Jenkins, Travis CI | Octopus Deploy |
| Output | Artifact/package | Environment deployment |
| Focus | Verify and package | Promote and release |

Simple answer:

```text
Jenkins or Travis CI usually builds and packages the application. Octopus Deploy takes that package and deploys it to environments in a controlled way.
```

## How Octopus Works

Flow:

```text
CI pipeline builds artifact
  -> artifact/package is published
  -> Octopus creates release
  -> release is deployed to Dev
  -> same release promoted to QA
  -> same release promoted to UAT
  -> approved release goes to Production
```

## Important Terms

| Term | Meaning |
| --- | --- |
| Project | Application deployment definition |
| Release | Versioned snapshot of package + variables + process |
| Environment | Dev, QA, UAT, Production |
| Deployment process | Steps to deploy application |
| Variable | Environment-specific config |
| Tenant | Customer/team-specific deployment target in some setups |
| Target | Server/machine/cloud target where app is deployed |
| Lifecycle | Rules for promotion across environments |

## Why Same Artifact Matters

Good practice:

```text
Build once, deploy many times.
```

Meaning:

```text
Create one artifact and promote the same artifact from Dev to QA to UAT to Production.
```

Why:

- reduces environment mismatch
- improves release confidence
- makes rollback easier
- avoids rebuilding different code for production

## Octopus For Angular App

Angular output:

```text
dist/
```

Possible package:

```text
angular-app-1.2.3.zip
```

Octopus deployment can:

- extract package
- replace config variables
- copy files to web server
- deploy to IIS/Nginx/container/static hosting
- run post-deployment scripts
- run smoke tests

## Environment Variables

Example variables:

- `API_BASE_URL`
- `AUTH_CLIENT_ID`
- `APP_VERSION`
- `ANALYTICS_KEY`
- `FEATURE_FLAG_ENABLED`

Octopus can store environment-specific values:

```text
Dev API URL
QA API URL
Production API URL
```

Senior note:

```text
For frontend apps, runtime config is useful because the same build artifact can be promoted across environments while Octopus injects environment-specific configuration.
```

## Deployment Approvals

Production deployment may need:

- manual approval
- release manager approval
- change ticket
- scheduled deployment window
- smoke test confirmation

Interview answer:

```text
In enterprise environments, deployment to lower environments may be automatic, but UAT or Production often requires approval gates.
```

## Rollback In Octopus

Rollback can mean:

- redeploy previous release
- switch variables/config
- run rollback step
- restore previous package

Simple answer:

```text
Because Octopus keeps release history, rollback can often be done by redeploying a previous stable release.
```

## Octopus With Jenkins

Common flow:

```text
Jenkins
  -> build app
  -> run tests
  -> run SonarQube
  -> create package
  -> push package to Octopus
  -> create Octopus release
  -> deploy release to environment
```

## Interview Questions

What is Octopus Deploy?

```text
Octopus Deploy is a deployment automation and release management tool used to deploy versioned releases across environments.
```

How is it different from Jenkins?

```text
Jenkins is usually used for CI: build, test, scan, and package. Octopus focuses on deployment, release promotion, environment variables, approvals, and rollback.
```

What is release promotion?

```text
Release promotion means moving the same versioned release from one environment to another, like Dev to QA to UAT to Production.
```

What is build once deploy many?

```text
It means create one artifact from source code and deploy that same artifact across all environments, changing only environment-specific configuration.
```

## Best Interview Answer

```text
Octopus Deploy is used for deployment automation and release management. CI tools like Jenkins create a versioned artifact, and Octopus deploys that artifact across environments like Dev, QA, UAT, and Production with variables, approvals, lifecycles, and rollback support.
```
