import {Component, HostListener, inject, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {filter} from "rxjs";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    NgOptimizedImage,
    Ripple
  ],
  template: `
    <nav
      class="flex align-middle justify-between self-center bg-white z-50 overflow-hidden
             transition-all duration-300 shadow-md px-1 md:px-5"
      [ngClass]="{'sticky-navbar': isSticky}">
      <div class="flex flex-row gap-5 items-center">
        <div class="relative w-16 h-16 overflow-hidden lg:w-20 lg:h-20" (click)="router.navigate(['/'])">
          <img src="/logo-bikematch.png" alt="Bikematch logo" class="absolute h-28 -left-5 -top-5 lg:h-32"/>
        </div>
        <h1 class="hidden font-squada-one text-3xl text-slate-800 md:block">BikeMatch</h1>
      </div>
      <div class="flex flex-row items-center gap-0.5 md:gap-2">
        @for (item of items; track item.routerLink) {
          <a pRipple class="flex p-menuitem-link gap-2
                            text-sm lg:text-lg items-center px-2"
             [ngClass]="currentRoute === item.routerLink ? 'font-bold' : ''"
             [routerLink]="item.routerLink">
            <p [class]="item.icon" class="self-center text-[18px] text-slate-800"></p>
            <p class="text-slate-800">{{ item.label }}</p>
          </a>
        }
      </div>
    </nav>
  `,
  styles: `
    .p-menuitem-link {
      color: inherit;
      text-decoration: inherit;
    }

    .sticky-navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      margin: 5px 5px 0 5px;
      border-radius: 10px;
    }

    @media only screen and (max-width: 600px) {
      .sticky-navbar {
        margin: 10px 10px 0 10px;
      }
    }

    @media only screen and (min-width: 600px) {
      .sticky-navbar {
        margin: 10px 20px 0 20px;
      }
    }
  `
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  currentRoute: string = ''
  isSticky: boolean = false;
  router: Router = inject(Router);

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'About',
        icon: 'pi pi-info-circle',
        routerLink: '/about'
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        routerLink: '/contact'
      }
    ]

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      })
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isSticky = scrollPosition > 0;
  }
}
