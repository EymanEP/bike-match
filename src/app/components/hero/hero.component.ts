import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  template: `
    <div class="relative overflow-hidden">
      <div class="relative z-20">
        <ng-content></ng-content>
      </div>
      <div class="absolute inset-0 z-10 bg-black opacity-60 pointer-events-none"></div>
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none ease-in-out">
        <img [src]="imageSrc" [alt]="imageAlt" class="w-full h-full object-cover"/>
      </div>
    </div>
  `,
  styles: ``
})
export class HeroComponent {
  @Input() imageSrc: string = "";
  @Input() imageAlt: string = "";
}
