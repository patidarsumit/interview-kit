# 33. Angular AI Tooling In v21

Angular v21 includes official guidance for building with AI-assisted tools.

This does not mean AI writes architecture for you. It means Angular provides better instructions and tooling for AI coding workflows.

## Areas In Angular AI Docs

Angular v21 documentation includes:

- getting started with AI
- LLM prompts and AI IDE setup
- agent skills
- Angular CLI MCP server setup
- Angular AI Tutor
- design patterns

## Why Senior Engineers Should Care

AI coding tools are useful only when constrained by:

- project style guide
- architecture rules
- testing expectations
- security rules
- accessibility rules
- performance expectations

## Good AI Prompts For Angular

Include:

- Angular version
- standalone vs NgModule
- signals vs RxJS preference
- folder structure
- testing requirement
- accessibility requirement
- route and provider patterns

Example:

```text
Build this as Angular v21 standalone components.
Use signals for local state.
Use route-level lazy loading.
Do not introduce NgModules.
Add accessible labels and keyboard support.
Add focused unit tests.
```

## Risks

AI tools may:

- use outdated Angular APIs
- mix old and new patterns
- skip accessibility
- create over-broad services
- miss cleanup
- ignore SSR constraints
- use unsafe DOM APIs

## Senior Best Practices

- review generated code carefully
- enforce linting and tests
- ask for modern Angular v21 patterns explicitly
- avoid accepting architecture blindly
- validate security and accessibility
- keep generated code consistent with repo conventions

## Interview Questions

### Can AI replace Angular expertise?

No. It can accelerate implementation, but senior engineers must review architecture, correctness, maintainability, security, and accessibility.

### What is the value of Angular AI tooling?

It helps AI tools understand Angular-specific best practices and project workflows.

