import {
  Component,
  ComponentRef,
  ViewContainerRef,
  inject,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    <section role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <h2 id="confirm-title">{{ title() }}</h2>
      <p>{{ message() }}</p>

      <button type="button" (click)="closed.emit(false)">Cancel</button>
      <button type="button" (click)="closed.emit(true)">Confirm</button>
    </section>
  `,
})
export class ConfirmDialogComponent {
  readonly title = input.required<string>();
  readonly message = input.required<string>();
  readonly closed = output<boolean>();
}

@Component({
  selector: 'app-confirm-dialog-host',
  standalone: true,
  template: `
    <button type="button" (click)="openConfirmDialog()">
      Delete user
    </button>
  `,
})
export class ConfirmDialogHostComponent {
  private readonly viewContainerRef = inject(ViewContainerRef);
  private dialogRef?: ComponentRef<ConfirmDialogComponent>;

  openConfirmDialog() {
    this.dialogRef?.destroy();
    this.viewContainerRef.clear();

    const componentRef =
      this.viewContainerRef.createComponent(ConfirmDialogComponent);

    componentRef.setInput('title', 'Delete user');
    componentRef.setInput('message', 'This action cannot be undone.');

    let subscription: {unsubscribe: () => void} | undefined;

    subscription = componentRef.instance.closed.subscribe((confirmed) => {
      if (confirmed) {
        console.log('delete user');
      }

      subscription?.unsubscribe();
      componentRef.destroy();
      this.dialogRef = undefined;
    });

    this.dialogRef = componentRef;
  }
}
