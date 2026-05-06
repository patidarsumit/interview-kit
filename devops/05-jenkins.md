# 05. Jenkins

## What Is Jenkins?

Jenkins is an automation server used for CI/CD.

Simple answer:

```text
Jenkins automates build, test, quality scan, packaging, and deployment pipelines.
```

It is widely used in enterprise projects because it is flexible and highly configurable.

## How Jenkins Works

Basic flow:

```text
Developer pushes code
  -> webhook triggers Jenkins
  -> Jenkins pulls code
  -> runs pipeline stages
  -> reports success/failure
  -> publishes artifact or deploys
```

## Jenkins Job Vs Jenkins Pipeline

| Term | Meaning |
| --- | --- |
| Job | A configured task in Jenkins |
| Pipeline | Code-defined sequence of CI/CD stages |
| Jenkinsfile | File that defines pipeline as code |

## What Is Jenkinsfile?

Jenkinsfile defines the pipeline steps.

Basic example:

```groovy
pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test -- --watch=false'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
  }
}
```

## Common Jenkins Stages

- checkout
- install dependencies
- lint
- unit tests
- build
- SonarQube scan
- package artifact
- deploy to environment
- post-deployment smoke test

## Pipeline Triggers

Jenkins can trigger through:

- Git webhook
- SCM polling
- scheduled cron
- manual build
- upstream/downstream pipeline
- pull request events through plugins

Best answer:

```text
In modern setup, Git webhook is preferred because Jenkins starts automatically when code changes, instead of constantly polling the repository.
```

## Jenkins Architecture

Important parts:

| Part | Meaning |
| --- | --- |
| Controller | Main Jenkins server that manages jobs and UI |
| Agent/Node | Machine/container where build actually runs |
| Executor | Slot that runs a build |
| Plugin | Extension that adds integrations |
| Workspace | Folder where Jenkins checks out code |

Simple architecture:

```text
Jenkins Controller
  |
  | schedules job
  v
Jenkins Agent
  |
  | runs npm/test/build/deploy
  v
Artifacts + Reports
```

## Jenkins With SonarQube

Flow:

```text
Jenkins pipeline
  -> run tests with coverage
  -> run SonarQube scanner
  -> wait for quality gate
  -> fail pipeline if gate fails
```

Why:

```text
It prevents code with serious quality/security issues from moving forward.
```

## Jenkins With Angular

Example stages:

```text
Checkout
Install npm dependencies
Run lint
Run unit tests
Build Angular app
Archive dist artifact
Deploy dist to server/CDN/container
```

## Failed Jenkins Build

What to check:

- failed stage
- console logs
- dependency install error
- test failure
- TypeScript build error
- environment variable missing
- permissions
- server/deployment issue

Interview answer:

```text
I first check which stage failed and read console logs. Then I reproduce locally if it is test/build related. If it is deployment-related, I check credentials, environment variables, server connectivity, and artifact availability.
```

## Jenkins Vs Travis CI

```text
Jenkins is more customizable and commonly self-hosted in enterprises. Travis CI is simpler hosted CI and often configured using .travis.yml. Jenkins gives more control over agents, plugins, credentials, and deployment workflows.
```

## Interview Questions

What is Jenkins?

```text
Jenkins is a CI/CD automation server used to build, test, scan, package, and deploy applications.
```

What is Jenkinsfile?

```text
Jenkinsfile is pipeline-as-code configuration that defines stages and steps for Jenkins pipeline.
```

What are Jenkins agents?

```text
Agents are machines or containers where Jenkins executes pipeline jobs.
```

How does Jenkins trigger pipeline?

```text
Through Git webhooks, polling, schedules, manual builds, or upstream/downstream pipeline triggers.
```

## Best Interview Answer

```text
Jenkins is an automation server used for CI/CD. A Jenkins pipeline can be defined using Jenkinsfile with stages like checkout, install, lint, test, build, SonarQube scan, artifact creation, and deployment. Pipelines are usually triggered by Git webhooks, pull requests, branch merges, schedules, or manual approvals.
```
