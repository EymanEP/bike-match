import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {SelectedMotorcyclesService} from "../services/selected-motorcycles.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {SearchInputComponent} from "../components/search-input/search-input.component";
import {Button} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {HeroComponent} from "../components/hero/hero.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchInputComponent,
    Button,
    Ripple,
    HeroComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  selectedMotorcycleService = inject(SelectedMotorcyclesService);
  router = inject(Router);
  selectedTotal: number = 0;
  private subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.selectedMotorcycleService.selectedMotorcycles$.subscribe(motorcycles => {
        this.selectedTotal = motorcycles.length;
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCompare() {
    if (this.selectedMotorcycleService.getMotorcycles().length === 2) {
      this.router.navigate(['/compare'])
    }
  }
}
