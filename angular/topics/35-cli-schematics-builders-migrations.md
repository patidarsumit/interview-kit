# 35. Angular CLI Schematics, Builders, And Migrations

Angular CLI is more than `ng serve`.

Senior Angular engineers should understand schematics, builders, migrations, workspace configuration, and how teams automate project conventions.

## Angular CLI

Common commands:

```bash
ng new my-app
ng serve
ng build
ng test
ng generate component users/user-card
ng update
```

## Schematics

Schematics are code generators.

They can:

- create components
- create services
- modify files
- update configuration
- enforce team conventions
- run migrations

Example:

```bash
ng generate component user-card
```

This runs a schematic that creates files and updates metadata when needed.

## Custom Schematics

Teams use custom schematics to standardize:

- feature folder structure
- component naming
- test file conventions
- route setup
- state services
- barrel files
- design-system usage

Senior example:

```bash
ng generate @company/workspace:feature orders
```

This could generate:

```text
features/orders/
  orders.routes.ts
  orders-page.component.ts
  orders.service.ts
  orders.models.ts
```

## Builders

Builders perform tasks such as:

- build
- test
- serve
- extract i18n
- custom deployment steps

They are configured in `angular.json`.

Example idea:

```json
{
  "architect": {
    "build": {
      "builder": "@angular/build:application"
    }
  }
}
```

## Migrations

Migrations update code when Angular or a library changes APIs.

```bash
ng update @angular/core @angular/cli
```

Migrations may:

- rewrite imports
- update configuration
- change deprecated APIs
- apply new syntax

Example:

```bash
ng generate @angular/core:control-flow
```

This migrates older structural directives to modern control flow syntax where possible.

## `angular.json`

Workspace configuration includes:

- project roots
- build targets
- test targets
- assets
- styles
- scripts
- configurations
- budgets

Senior engineers should know how to inspect build options and budgets.

## Budgets

Budgets protect bundle size.

```json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    }
  ]
}
```

## Senior Best Practices

- use schematics to encode repeated conventions
- review migrations before committing
- keep Angular CLI current
- configure budgets
- avoid hand-editing generated code blindly
- document workspace conventions
- use `ng update` in controlled branches

## Interview Questions

### What are Angular schematics?

Code-generation and transformation tools used by Angular CLI.

### What are builders?

CLI task executors for build, serve, test, and other workspace operations.

### What does `ng update` do?

It updates package versions and runs migrations provided by Angular or libraries.

### Why would a company write custom schematics?

To enforce architecture and generate consistent features across teams.

