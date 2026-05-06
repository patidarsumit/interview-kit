# 04. Travis CI

## What Is Travis CI?

Travis CI is a hosted continuous integration service.

Simple answer:

```text
Travis CI runs automated builds and tests when code is pushed to a repository or when a pull request is opened.
```

It is commonly configured using a `.travis.yml` file.

## How Travis CI Works

Flow:

```text
Developer pushes code
  -> GitHub event triggers Travis CI
  -> Travis reads .travis.yml
  -> installs dependencies
  -> runs scripts
  -> returns pass/fail status to GitHub
```

## Basic .travis.yml For Node/Angular

```yaml
language: node_js
node_js:
  - "20"

cache:
  directories:
    - node_modules

install:
  - npm ci

script:
  - npm run lint
  - npm test -- --watch=false
  - npm run build
```

## Pipeline Trigger

Travis CI can trigger on:

- push
- pull request
- branch update
- tag
- cron schedule

## Build Matrix

Build matrix means running tests against multiple versions or environments.

Example:

```yaml
node_js:
  - "18"
  - "20"
  - "22"
```

This tests whether app works with multiple Node versions.

## Environment Variables

Sensitive values should not be hardcoded.

Examples:

- API keys
- deployment token
- auth secrets

Travis can store encrypted environment variables.

## Travis CI Vs Jenkins

| Area | Travis CI | Jenkins |
| --- | --- | --- |
| Hosting | Hosted CI service | Usually self-hosted or managed |
| Config | `.travis.yml` | Jenkinsfile/UI jobs |
| Setup | Simpler for GitHub projects | More customizable |
| Control | Less infrastructure control | High control |
| Enterprise use | Depends on org | Very common |

## Interview Questions

What is Travis CI?

```text
Travis CI is a CI tool that automatically runs build and test steps when code changes are pushed or pull requests are created.
```

What is `.travis.yml`?

```text
.travis.yml is the configuration file that tells Travis CI which language/runtime to use and which commands to run.
```

How does Travis trigger?

```text
It is triggered by repository events like push, pull request, tag, or scheduled jobs.
```

## Best Interview Answer

```text
Travis CI is a hosted CI tool. It listens to repository events, reads the .travis.yml configuration, installs dependencies, runs scripts like lint/test/build, and reports pass or fail status back to the repository.
```
