import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SelectedMotorcyclesService } from '../services/selected-motorcycles.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchInputComponent } from '../components/search-input/search-input.component';
import { Button } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { HeroComponent } from '../components/hero/hero.component';
import { ScrollTopModule } from 'primeng/scrolltop';
import { NgClass } from '@angular/common';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { MatCardComponent } from '../components/mat-card/mat-card.component';
import { FadeInAnimationComponent } from '../components/fade-in-animation/fade-in-animation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchInputComponent,
    Button,
    Ripple,
    HeroComponent,
    ScrollTopModule,
    NgClass,
    AnimateOnScrollModule,
    MatCardComponent,
    FadeInAnimationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  selectedMotorcycleService = inject(SelectedMotorcyclesService);
  router = inject(Router);
  selectedTotal: number = 0;
  compareModality: 'compare' | 'search' = 'compare';
  private subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.selectedMotorcycleService.selectedMotorcycles$.subscribe(
        (motorcycles) => {
          this.selectedTotal = motorcycles.length;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCompare() {
    if (this.selectedMotorcycleService.getMotorcycles().length >= 1) {
      this.router.navigate(['/compare']);
    }
  }

  changeModality(modality: 'compare' | 'search') {
    this.compareModality = modality;
  }
}
