import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChButtonBckg]'
})
export class ChButtonBckgDirective {

  elemHtml: HTMLElement;

  constructor(elemRef: ElementRef ) {
    this.elemHtml = elemRef.nativeElement as HTMLElement;
    this.onMouseLeave();
  }

  @HostListener('mouseenter') onMouseEnter() {
    console.log('enter');
    this.changeColorAttribute('success');;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeColorAttribute('primary');
    console.log('leave');
  }

  private changeColorAttribute(color: string) {
    this.elemHtml.setAttribute('color', color);
  }


}
