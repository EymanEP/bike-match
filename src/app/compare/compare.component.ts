import {Component, inject, OnDestroy, OnInit} from '@angular/core';
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

export class CompareComponent implements OnInit, OnDestroy {
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

    this.selectedMotorcycleService.addMotorcycle({
      "id": 0,
      "name": "Kawasaki Ninja 650 (2022)",
      "make": "Kawasaki",
      "model": "Ninja 650 ",
      "year": "2022",
      "type": "Sport",
      "displacement": "649.0 ccm (39.60 cubic inches)",
      "engine": "Twin, four-stroke",
      "power": "52.3 HP (38.2  kW)) @ 8000 RPM",
      "torque": "56.0 Nm (5.7 kgf-m or 41.3 ft.lbs) @ 4000 RPM",
      "compression": "10.8:1",
      "bore_stroke": "83.0 x 60.0 mm (3.3 x 2.4 inches)",
      "valves_per_cylinder": "4",
      "fuel_system": "Injection. DFI® with dual 36mm Keihin throttle bodies",
      "fuel_control": "Double Overhead Cams/Twin Cam (DOHC)",
      "ignition": "TCBI with digital advance",
      "lubrication": "Forced lubrication, semi-dry sump",
      "cooling": "Liquid",
      "gearbox": "6-speed",
      "transmission": "Chain   (final drive)",
      "clutch": "Assist  and  Slipper Clutch",
      "frame": "Trellis, high-tensile steel",
      "front_suspension": "41mm hydraulic telescopic fork",
      "front_wheel_travel": "124 mm (4.9 inches)",
      "rear_suspension": "Horizontal back-link with adjustable spring preload",
      "rear_wheel_travel": "130 mm (5.1 inches)",
      "front_tire": "120/70-17 ",
      "rear_tire": "160/60-17 ",
      "front_brakes": "Double disc. Petal discs and two-piston calipers. Optional ABS.",
      "rear_brakes": "Single disc. Petal disc and single piston caliper. Optional ABS.",
      "total_weight": "192.1 kg (423.4 pounds)",
      "seat_height": "790 mm (31.1 inches) If adjustable, lowest setting.",
      "total_height": "1146 mm (45.1 inches)",
      "total_length": "2055 mm (80.9 inches)",
      "total_width": "739 mm (29.1 inches)",
      "ground_clearance": "130 mm (5.1 inches)",
      "wheelbase": "1410 mm (55.5 inches)",
      "fuel_capacity": "15.14 litres (4.00 US gallons)",
      "starter": "Electric"
    })
    this.selectedMotorcycleService.addMotorcycle({
      "id": 1,
      "name": "Honda XR150L (2022)",
      "make": "Honda",
      "model": "XR150L",
      "year": "2022",
      "type": "Enduro / offroad",
      "displacement": "149.0 ccm (9.09 cubic inches)",
      "engine": "Single cylinder, four-stroke",
      "power": "201.2 HP (146.8  kW))",
      "compression": "9.5:1",
      "bore_stroke": "57.3 x 57.8 mm (2.3 x 2.3 inches)",
      "valves_per_cylinder": "2",
      "fuel_system": "Carburettor",
      "cooling": "Air",
      "gearbox": "5-speed",
      "transmission": "Chain   (final drive)",
      "front_suspension": "Telescopic fork",
      "front_wheel_travel": "160 mm (6.3 inches)",
      "rear_suspension": "Single Shock",
      "rear_wheel_travel": "152 mm (6.0 inches)",
      "front_tire": "70/100-19 ",
      "rear_tire": "110/90-17 ",
      "front_brakes": "Single disc",
      "rear_brakes": "Expanding brake (drum brake)",
      "total_weight": "130.0 kg (286.6 pounds)",
      "seat_height": "825 mm (32.5 inches) If adjustable, lowest setting.",
      "total_height": "1125 mm (44.3 inches)",
      "total_length": "2090 mm (82.3 inches)",
      "total_width": "810 mm (31.9 inches)",
      "ground_clearance": "245 mm (9.6 inches)",
      "wheelbase": "1360 mm (53.5 inches)",
      "starter": "Electric & kick"
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setModal(state: boolean) {
    this.openModal = state;
  }
}
