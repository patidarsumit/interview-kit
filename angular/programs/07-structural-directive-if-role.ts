import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input,
} from '@angular/core';

type Role = 'admin' | 'member' | 'guest';

class AuthState {
  currentRole(): Role {
    return 'admin';
  }
}

@Directive({
  selector: '[appIfRole]',
  standalone: true,
})
export class IfRoleDirective {
  appIfRole = input.required<Role>();

  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly authState = inject(AuthState);

  constructor() {
    effect(() => {
      this.viewContainerRef.clear();

      if (this.authState.currentRole() === this.appIfRole()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}

