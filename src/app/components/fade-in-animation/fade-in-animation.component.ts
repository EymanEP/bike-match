import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-fade-in-animation',
  standalone: true,
  imports: [],
  template: `
    <div
      class="fade-in-component"
      [@fadeInLeft]="isVisible ? 'visible' : 'hidden'"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: ``,
  animations: [
    trigger('fadeInLeft', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-100%)' })),
      state('middle', style({ opacity: 50, transform: 'translateX(-50%)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', [animate('0.5s ease-in')]),
    ]),
  ],
})
export class FadeInAnimationComponent {
  isVisible: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.getElementPosition();
    const scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition >= componentPosition) {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }

  private getElementPosition(): number {
    const sectionElement = document.querySelector('.fade-in-component');
    return sectionElement
      ? sectionElement.getBoundingClientRect().top + window.scrollY
      : 0;
  }
}
