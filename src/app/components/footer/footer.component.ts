import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="flex flex-col gap-2 bg-white shadow-2xl items-center justify-between text-slate-800 py-8 px-5 md:px-24 lg:px-32 md:flex-row md:gap-8">
      <div class="flex flex-col">
        <div class="relative w-16 h-16 overflow-hidden lg:w-20 lg:h-20" (click)="router.navigate(['/'])">
          <img src="/logo-bikematch.png" alt="Bikematch logo"
               class="absolute h-28 -left-5 -top-5 filter-white lg:h-32"/>
        </div>
        <h3 class="text-slate-800 m-0">BikeMatch</h3>
      </div>
      <div class="flex flex-col">
        <h3>Contact</h3>
        <p>epashaliev02&#64;gmail.com</p>
      </div>
      <div>
        <p class="text-center">&copy; 2024 Motorcycle Comparator | All Rights Reserved</p>
      </div>
    </footer>
  `,
  styles: ``,
})
export class FooterComponent {
  router: Router = inject(Router);
}
