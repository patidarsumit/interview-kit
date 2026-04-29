import {Component} from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'app-account-popover',
  standalone: true,
  imports: [OverlayModule],
  template: `
    <button
      cdkOverlayOrigin
      #trigger="cdkOverlayOrigin"
      type="button"
      [attr.aria-expanded]="open"
      aria-controls="account-popover"
      (click)="open = !open"
    >
      Account
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="open"
      (overlayOutsideClick)="open = false"
    >
      <section id="account-popover" role="menu">
        <button role="menuitem" type="button">Profile</button>
        <button role="menuitem" type="button">Sign out</button>
      </section>
    </ng-template>
  `,
})
export class AccountPopoverComponent {
  open = false;
}

