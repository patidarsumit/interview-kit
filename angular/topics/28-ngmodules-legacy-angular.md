# 28. NgModules And Legacy Angular

Angular now recommends standalone components for new code.

But many real-world codebases still use NgModules.

Senior engineers must understand both.

## What Is An NgModule?

An NgModule is a class decorated with `@NgModule`.

```ts
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [UserCardComponent],
  imports: [CommonModule],
  exports: [UserCardComponent],
})
export class UsersModule {}
```

## NgModule Metadata

- `declarations`: components, directives, pipes owned by this module
- `imports`: dependencies this module needs
- `exports`: declarations/imports made available to other modules
- `providers`: services registered with injector
- `bootstrap`: root component for module bootstrap

## Common Modules

Older Angular commonly imported:

- `BrowserModule`
- `CommonModule`
- `FormsModule`
- `ReactiveFormsModule`
- `RouterModule`
- `HttpClientModule`

Modern Angular often uses standalone imports and provider functions instead.

## `forRoot` And `forChild`

Older libraries used:

```ts
RouterModule.forRoot(routes)
RouterModule.forChild(featureRoutes)
```

`forRoot` convention means app-level providers.

`forChild` convention means feature-level configuration.

## Modern Alternative

```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
});
```

## Migration Strategy

Do:

- use standalone for new components
- migrate feature by feature
- keep legacy NgModules working while transitioning
- avoid big-bang rewrites
- understand module provider scope before moving providers

## Interview Questions

### Are NgModules still valid?

Yes, but Angular recommends standalone components for new code.

### What is the difference between declarations and imports?

Declarations register things owned by the module. Imports bring in dependencies from other modules or standalone declarations.

### What is `forRoot`?

A convention for registering app-wide providers from a module.

