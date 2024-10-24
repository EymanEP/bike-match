import {Component, Input, OnInit} from '@angular/core';
import {Motorcycle} from '../../../interfaces/Motorcycle';

interface WebLink {
  store: 'Milanuncios' | 'Wallapop';
  imgSrc: string;
  link: string;
  borderColor: string;
}

@Component({
  selector: 'app-buy-cards',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-row justify-between gap-2 py-5">
      @for (webLink of webLinks; track webLink.store) {
        <div
          class="w-40 flex flex-row justify-center gap-2 rounded-xl px-4 py-2 items-center shadow-lg hover:cursor-pointer"
          [style]="{'border': '2px solid ' + webLink.borderColor}"
          (click)="navigateToUrl(webLink.link)"
        >
          <div class="overflow-hidden w-6 h-6 items-center justify-center rounded-2xl">
            <img [src]="webLink.imgSrc" [alt]="webLink.store + 'Logo'" class="w-full h-full object-cover"/>
          </div>
          <div class="flex flex-col gap-2 text-slate-700">
            <h4 class="my-0">{{ webLink.store }}</h4>
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class BuyCardsComponent implements OnInit {
  @Input() motorcycle!: Motorcycle;
  webLinks!: WebLink[];

  ngOnInit(): void {
    this.getLinks();
  }

  private getLinks() {
    const {make, model} = this.motorcycle;

    const milanunciosWebLink: WebLink = {
      store: 'Milanuncios',
      imgSrc: 'milanuncios-app-icon.png',
      link: `https://www.milanuncios.com/motos-de-segunda-mano/?s=${make}%20${model}`,
      borderColor: '#18B85C'
    };

    const wallapopWebLink: WebLink = {
      store: 'Wallapop',
      imgSrc: 'mobile-logo-wallapop-home-v2.svg',
      link: `https://es.wallapop.com/app/search?category_ids=14000&keywords=${make}%20${model}`,
      borderColor: '#13C1AC'
    };

    this.webLinks = [milanunciosWebLink, wallapopWebLink];
  }

  navigateToUrl(url: string) {
    window.open(url)
  }
}
