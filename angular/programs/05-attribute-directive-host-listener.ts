import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]',
  standalone: true,
})
export class HoverHighlightDirective {
  @HostBinding('class.is-highlighted')
  highlighted = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlighted = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlighted = false;
  }
}

