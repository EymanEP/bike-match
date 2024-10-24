import { Component, HostListener, Input } from '@angular/core';
import { NgIf, CommonModule } from '@angular/common';
@Component({
  selector: 'app-fade-in-animation',
  standalone: true,
  imports: [NgIf, CommonModule],
  template: `
    <div
      [class]="
        direction === 'left'
          ? 'fade-in-component-left'
          : 'fade-in-component-right'
      "
      [ngClass]="{
        'fade-in-visible': isVisible,
        'fade-in-left': direction === 'left',
        'fade-in-right': direction === 'right'
      }"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: `
  .fade-in-component-left {
    opacity: 0;
    transform: translateX(-100%);
    transition: opacity 0.5s ease-in, transform 0.5s ease-in;
  }

  .fade-in-component-right {
    opacity: 0;
    transform: translateX(100%);
    transition: opacity 0.5s ease-in, transform 0.5s ease-in;
  }

  .fade-in-visible {
    opacity: 1;
    transform: translateX(0);
  }

  .fade-in-left {
    transform-origin: left;
  }

  .fade-in-right {
    transform-origin: right;
  }
`,
})
export class FadeInAnimationComponent {
  @Input() direction: 'left' | 'right' = 'left';
  isVisible: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.getElementPosition();
    const scrollPosition = window.scrollY + window.innerHeight;

    this.isVisible = scrollPosition >= componentPosition;
  }

  private getElementPosition(): number {
    const sectionElement = document.querySelector('.fade-in-component');
    return sectionElement
      ? sectionElement.getBoundingClientRect().top + window.scrollY
      : 0;
  }
}
