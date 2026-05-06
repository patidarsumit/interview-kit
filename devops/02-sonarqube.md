# 02. SonarQube

## What Is SonarQube?

SonarQube is a code quality and security analysis tool.

Simple answer:

```text
SonarQube analyzes source code to find bugs, vulnerabilities, security hotspots, code smells, duplication, and test coverage issues.
```

It helps teams maintain code quality before code reaches production.

## What SonarQube Checks

SonarQube commonly checks:

- bugs
- vulnerabilities
- security hotspots
- code smells
- duplicated code
- maintainability
- reliability
- test coverage
- complexity

## What Is Quality Gate?

A quality gate is a pass/fail decision based on rules.

Example rules:

- no new critical bugs
- no new blocker vulnerabilities
- coverage on new code must be at least 80%
- duplication on new code must be below allowed limit
- maintainability rating should be acceptable

Simple answer:

```text
A SonarQube quality gate decides whether code is good enough to move forward in the pipeline. If the quality gate fails, the PR or deployment can be blocked.
```

## Why New Code Matters

Many teams focus quality gates on new code.

Why?

```text
Old code may already have technical debt. New code quality rules prevent the team from adding more problems.
```

Senior answer:

```text
Quality gate on new code is practical because it improves quality gradually without blocking every release because of legacy issues.
```

## SonarQube In Pipeline

Flow:

```text
Developer push
  -> CI pipeline
  -> install dependencies
  -> run tests with coverage
  -> build
  -> SonarQube scan
  -> quality gate result
  -> pass/fail
```

If pass:

```text
PR can be merged or artifact can move forward.
```

If fail:

```text
Developer fixes issues or discusses accepted exception.
```

## Angular Example

For Angular, SonarQube may check:

- TypeScript code smells
- duplicated logic
- low test coverage
- unused code
- complexity
- security issues
- bad patterns

Example issue:

```text
Function has too much complexity.
```

Fix:

```text
Break logic into smaller functions or move business logic into service.
```

## Bugs Vs Code Smells Vs Vulnerabilities

| Term | Meaning |
| --- | --- |
| Bug | Code likely to behave incorrectly |
| Vulnerability | Security weakness that can be exploited |
| Security hotspot | Security-sensitive code needing review |
| Code smell | Maintainability problem |
| Duplication | Same/similar code repeated |

## Interview Questions

What is SonarQube?

```text
SonarQube is a static code analysis tool used to detect bugs, vulnerabilities, code smells, duplication, and coverage issues.
```

What is quality gate?

```text
A quality gate is a set of pass/fail conditions. If code does not meet required quality standards, the pipeline can fail.
```

What will you do if SonarQube fails?

```text
I check the failed rule, understand whether it is a bug, vulnerability, coverage issue, or code smell, then fix it. If it is a false positive or accepted risk, I discuss with the team instead of ignoring it silently.
```

How does SonarQube improve code quality?

```text
It gives early feedback in CI/CD, prevents poor-quality code from being merged, and helps track maintainability, reliability, security, duplication, and coverage over time.
```

## Best Interview Answer

```text
SonarQube is used in CI/CD to check code quality and security. It scans code for bugs, vulnerabilities, security hotspots, code smells, duplication, and coverage. The quality gate gives a pass/fail result. If the gate fails, we fix the issue before merging or deploying.
```
