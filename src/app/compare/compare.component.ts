import {Component, inject, OnInit} from '@angular/core';
import {CompareChartComponent} from "./compare-chart/compare-chart.component";
import {CompareTableComponent} from "./compare-table/compare-table.component";
import {BubbleSelectedComponent} from "../components/bubble-selected/bubble-selected.component";
import {MotosMotalComponent} from "../components/motos-motal/motos-motal.component";
import {SelectedMotorcyclesService} from "../services/selected-motorcycles.service";
import {Motorcycle} from "../../interfaces/Motorcycle";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [
    CompareChartComponent,
    CompareTableComponent,
    BubbleSelectedComponent,
    MotosMotalComponent
  ],
  templateUrl: './compare.component.html',
  styles: ``
})
export class CompareComponent implements OnInit {
  selectedMotorcycleService: SelectedMotorcyclesService = inject(SelectedMotorcyclesService);
  selectedMotorcycles: Motorcycle[] = [];
  openModal: boolean = false;
  subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.selectedMotorcycleService.selectedMotorcycles$.subscribe(motorcycles => {
        this.selectedMotorcycles = motorcycles;
      })
    )
    console.log("COMPARISON: ", this.selectedMotorcycleService.getMotorcycles())
  }

  ngOnDestroy() {
    // If the motorcycles dont reset themselves do it manually
    // this.selectedMotorcycleService.resetAllMotorcycles();
    this.subscription.unsubscribe();
  }

  setModal(state: boolean) {
    this.openModal = state;
  }
}
