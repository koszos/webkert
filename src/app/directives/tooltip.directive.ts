import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input() appTooltip: string = '';
  private tooltip: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) {
      this.createTooltip();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }
  }

  private createTooltip() {

    this.tooltip = this.renderer.createElement('div');
    this.renderer.appendChild(document.body, this.tooltip);
    
    const text = this.renderer.createText(this.appTooltip);
    this.renderer.appendChild(this.tooltip, text);

    this.renderer.setStyle(this.tooltip, 'position', 'absolute');
    this.renderer.setStyle(this.tooltip, 'background-color', 'rgba(0, 0, 0, 0.75)'); 
    this.renderer.setStyle(this.tooltip, 'color', '#fff'); 
    this.renderer.setStyle(this.tooltip, 'padding', '8px 12px');
    this.renderer.setStyle(this.tooltip, 'border-radius', '8px'); 
    this.renderer.setStyle(this.tooltip, 'z-index', '1000');
    this.renderer.setStyle(this.tooltip, 'font-size', '14px');
    this.renderer.setStyle(this.tooltip, 'box-shadow', '0 4px 10px rgba(0, 0, 0, 0.3)');
    this.renderer.setStyle(this.tooltip, 'opacity', '0');


    this.renderer.setStyle(this.tooltip, 'transition', 'opacity 0.2s ease-in-out');


    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip ? this.tooltip.getBoundingClientRect() : { width: 0, height: 0, top: 0, left: 0, bottom: 0, right: 0 };    
    const top = hostPos.bottom + window.scrollY;
    const left = hostPos.left + (hostPos.width / 2) - (tooltipPos.width / 2) + window.scrollX;

    this.renderer.setStyle(this.tooltip, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);

    setTimeout(() => {
      if (this.tooltip) {
        this.renderer.setStyle(this.tooltip, 'opacity', '1');
      }
    }, 50);
  }
}
