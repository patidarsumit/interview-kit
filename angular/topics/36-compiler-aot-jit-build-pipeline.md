# 36. Angular Compiler, AOT, JIT, And Build Pipeline

Angular templates are compiled into JavaScript.

Senior engineers should understand AOT, JIT, template type checking, and production builds.

## AOT

AOT means Ahead-of-Time compilation.

Templates are compiled during build.

Benefits:

- faster runtime startup
- template errors caught earlier
- better security
- smaller runtime compiler needs
- production-ready output

Angular CLI production builds use AOT.

## JIT

JIT means Just-in-Time compilation.

Templates are compiled in the browser at runtime.

JIT was historically useful for development and dynamic scenarios, but production apps should use AOT.

Senior security point:

Do not generate Angular templates dynamically from user input. Templates are executable Angular code.

## Template Type Checking

Angular checks templates against component types.

Example:

```ts
user = signal<{name: string}>({name: 'Sumit'});
```

```html
<p>{{ user().name }}</p>
```

If the template references a missing property, Angular can report it at build time.

## Strict Templates

Enable strict template checking for serious apps.

```json
{
  "angularCompilerOptions": {
    "strictTemplates": true
  }
}
```

## Build Pipeline

Modern Angular builds handle:

- TypeScript compilation
- template compilation
- style processing
- bundling
- code splitting
- optimization
- lazy chunk generation
- asset copying
- budgets

## Production Build

```bash
ng build
```

Production builds optimize output for deployment.

## Source Maps

Source maps help debug compiled code.

In production, expose source maps only according to your security and debugging policy.

## Common Build Problems

- circular imports
- wrong path aliases
- missing standalone imports
- template type errors
- budget failures
- environment-specific config mismatch
- CommonJS dependency warnings

## Senior Best Practices

- keep `strictTemplates` enabled
- treat template errors as real type errors
- avoid dynamic templates
- watch bundle budgets
- understand lazy chunks
- inspect production output when performance matters
- do not depend on JIT for production

## Interview Questions

### AOT vs JIT?

AOT compiles templates during build. JIT compiles templates at runtime.

### Why is AOT safer?

It avoids runtime template compilation and catches template issues earlier.

### What is strict template checking?

Angular validates template expressions using TypeScript type information.

