import {Component, EventEmitter, inject, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Motorcycle} from "../../../interfaces/Motorcycle";
import {Subscription} from "rxjs";
import {SelectedMotorcyclesService} from "../../services/selected-motorcycles.service";
import {Button} from "primeng/button";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'app-motos-motal',
  standalone: true,
  imports: [
    Button,
    Ripple
  ],
  template: `
    <div
      class="fixed top-0 left-0 z-[999] bg-black bg-opacity-90 h-dvh w-dvw overflow-hidden px-5 py-10 flex
      flex-col text-white gap-10 transition-all duration-300">
      <div class="self-end cursor-pointer" (click)="closeEmitter.emit()">
        <i class="pi pi-times text-2xl"></i>
      </div>
      <div class="h-full flex flex-col gap-5 p-fluid w-[348px] self-center align-middle justify-center">
        // Create a new input that adds a motorcycle to a visual list and to the service.
        <p-button pRipple rounded raised label="Compare" (onClick)="onCompare()"/>
      </div>
    </div>
  `,
  styles: ``
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
}
