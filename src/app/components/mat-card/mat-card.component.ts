import {Component, HostListener, Input, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {NgIf} from "@angular/common";

interface ImageProps {
  url: string,
  alt: string,
}

@Component({
  selector: 'app-mat-card',
  standalone: true,
  imports: [
    CardModule,
    DividerModule,
    NgIf
  ],
  template: `
    <div class="matcard">
      <div class="flex-1">
        <ng-content></ng-content>
      </div>
      <p-divider [layout]="isMobile ? 'horizontal' : 'vertical'" />
      <div class="flex w-full h-full rounded-xl shadow-lg overflow-hidden flex-1" *ngIf="imageProps">
        <img [src]="imageProps.url" [alt]="imageProps.alt" class="object-cover w-full h-auto"/>
      </div>
    </div>
  `,
  styles: `
    .matcard {
      border: 2px solid #ebebeb;
      @apply flex flex-col rounded-xl shadow-lg w-full h-full px-8 py-5 gap-4 items-center
      md:flex-row ;
    }
  `
})

export class MatCardComponent implements OnInit {
  @Input() imageProps?: ImageProps;
  isMobile: boolean = false;

  ngOnInit() {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.isMobile = window.matchMedia('(max-width: 600px)').matches;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkWindowSize();
  }


}
