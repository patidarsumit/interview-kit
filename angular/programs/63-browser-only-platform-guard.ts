import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {Directive, PLATFORM_ID, effect, inject, input} from '@angular/core';

@Directive({
  selector: '[appDocumentTitle]',
  standalone: true,
})
export class DocumentTitleDirective {
  readonly appDocumentTitle = input.required<string>();

  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.document.title = this.appDocumentTitle();
      }
    });
  }
}

