import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() appHighlight: string = '#673ab7';
  @Input() defaultColor: string = '';
  
  private originalBackgroundColor: string = '';

  constructor(private el: ElementRef) { 
    this.originalBackgroundColor = this.el.nativeElement.style.backgroundColor;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || this.defaultColor || '#73656f');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.originalBackgroundColor);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.transition = 'background-color 0.3s';
  }
}