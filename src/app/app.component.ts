import {Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterModule, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {SelectedMotorcyclesService} from "./services/selected-motorcycles.service";
import {filter} from "rxjs";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'bike-match';
  private selectedMotorcycleService = inject(SelectedMotorcyclesService);
  private router = inject(Router);

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects !== '/compare') {
          this.selectedMotorcycleService.resetAllMotorcycles();
        }
      })
  }

}
