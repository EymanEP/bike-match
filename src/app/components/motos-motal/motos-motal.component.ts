import {Component, EventEmitter, inject, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Motorcycle} from "../../../interfaces/Motorcycle";
import {Subscription} from "rxjs";
import {SelectedMotorcyclesService} from "../../services/selected-motorcycles.service";
import {Button} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {SearchInputComponent} from "../search-input/search-input.component";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-motos-motal',
  standalone: true,
  imports: [
    Button,
    Ripple,
    SearchInputComponent,
  ],
  template: `
    <div
      class="fixed top-0 left-0 z-[980] h-dvh w-dvw overflow-hidden bg-black bg-opacity-40 flex items-center
      justify-center">
      <div
        @fadeInOut
        class="flex flex-col px-4 pb-10 pt-4 text-white gap-10 z-[999] bg-white rounded-2xl shadow-2xl">
        <div class="self-end cursor-pointer" (click)="close()">
          <i class="pi pi-times text-lg text-gray-700"></i>
        </div>
        <div class="h-full flex flex-col gap-5 p-fluid w-[348px] self-center align-middle justify-center">
          <app-search-input [clearInputOnSelect]="true" inputStyle="solid" (onInputSelectChange)="close()"/>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  animations: [
    trigger('fadeInOut', [
      state('void', style({opacity: 0, transform: 'scale(0.95)'})),
      transition(':enter', [
        animate('300ms ease-in', style({opacity: 1, transform: 'scale(1)'})),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({opacity: 0, transform: 'scale(0.95)'})),
      ])
    ])
  ]
})
export class MotosMotalComponent implements OnInit, OnDestroy {
  @Output() closeEmitter = new EventEmitter();
  router = inject(Router);
  firstSelect: Motorcycle | null = null;
  secondSelect: Motorcycle | null = null;
  subscription: Subscription = new Subscription();
  selectedMotorcycleService = inject(SelectedMotorcyclesService);

  ngOnInit() {
    this.subscription.add(
      this.selectedMotorcycleService.selectedMotorcycles$.subscribe(motorcycles => {
        this.firstSelect = motorcycles[0] ?? null;
        this.secondSelect = motorcycles[1] ?? null;
        console.log(this.firstSelect, this.secondSelect)
      })
    )
  }

  ngOnDestroy() {
    // Maybe set the selects to null if they don't reset
    this.subscription.unsubscribe();
  }

  onCompare() {
    console.log(this.selectedMotorcycleService.getMotorcycles())
    this.closeEmitter.emit();
  }

  close() {
    this.closeEmitter.emit();
  }
}
