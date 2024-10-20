import {Component, EventEmitter, inject, OnDestroy, OnInit, Output} from '@angular/core';
import {SelectedMotorcyclesService} from "../../services/selected-motorcycles.service";
import {Router} from "@angular/router";
import {Motorcycle} from "../../../interfaces/Motorcycle";
import {Subscription} from "rxjs";
import {ChipModule} from "primeng/chip";
import {Button} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {NgIf} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ButtonGroupModule} from "primeng/buttongroup";

@Component({
  selector: 'app-bubble-selected',
  standalone: true,
  imports: [
    ChipModule,
    Button,
    Ripple,
    NgIf,
    ButtonGroupModule
  ],
  template: `
    <div
      class="fixed bottom-0 right-0 flex flex-col items-end mr-2 mb-2 gap-4 transition-all
        transition-duration-300"
    >
      <div
        *ngIf="showPanel"
        @slideInOut
        class="bg-white rounded-lg max-h-80 shadow-lg flex
         flex-col gap-2 p-5 justify-center min-w-64 min-h-44"
      >
        <div class="flex flex-col p-panel-content gap-2 flex-1">
          @for (item of selectedMotorcycles; track item.id) {
            <p-chip [label]="item.name" removable (onRemove)="removeSelected(item)"/>
          }
        </div>
        <div class="flex flex-row gap-5">
          <p-button *ngIf="selectedMotorcycles.length < 2"
                    pRipple size="small" rounded label="Add" raised
                    (onClick)="emitOpenModal()"
          />
          <p-button pRipple size="small" rounded raised
                    label="Compare" (onClick)="newComparison()"
          />
        </div>
      </div>
      <p-button
        pRipple
        (onClick)="togglePanel()"
        label="Selected:"
        [rounded]="true"
        [badge]="selectedMotorcycles.length.toString()"
      />
    </div>
  `,
  styles: ``,
  animations: [
    trigger('slideInOut', [
      state('void', style({opacity: 0, transform: 'TranslateY(20%)'})),
      transition(":enter", [
        animate('300ms ease-out', style({opacity: 1, transform: 'TranslateY(0)'})),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({opacity: 0, transform: 'TranslateY(20%)'}))
      ])
    ])
  ]
})
export class BubbleSelectedComponent implements OnInit, OnDestroy {
  @Output() openModal: EventEmitter<void> = new EventEmitter();
  selectedMotorcycleService = inject(SelectedMotorcyclesService);
  router = inject(Router)
  selectedMotorcycles: Motorcycle[] = [];
  showPanel: boolean = false;
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.selectedMotorcycleService.selectedMotorcycles$.subscribe(motorcycles => {
      this.selectedMotorcycles = motorcycles;
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  togglePanel = () => {
    this.showPanel = !this.showPanel;
  };

  emitOpenModal = () => {
    this.openModal.emit();
  }

  removeSelected(selected: Motorcycle) {
    this.selectedMotorcycleService.removeMotorcycle(selected);
  }

  newComparison() {
    window.location.reload();
  }
}
