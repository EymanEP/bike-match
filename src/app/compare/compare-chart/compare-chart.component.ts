import {Component, Input, OnInit} from '@angular/core';
import {Motorcycle} from "../../../interfaces/Motorcycle";
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'app-compare-chart',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './compare-chart.component.html',
  styles: ``
})
export class CompareChartComponent implements OnInit {
  @Input() motorcycles: Motorcycle[] = [];
  radarData: any = null;
  radarOptions: any = null;

  ngOnInit() {
    const firstMoto = this.motorcycles[0];
    const secMoto = this.motorcycles[1];

    const getNumberStr = (displacement: string | undefined) => {
      if (displacement)
        return Number(displacement.split(" ")[0]);

      return 0;
    }

    const getCylinders = (engine: string) => {
      const newEng = engine.toLowerCase();
      const firstSplit = newEng.split(",")[0];
      const engineType = [{str: "single", num: 1}, {str: "v2", num: 2}, {str: "twin", num: 2}, {str: "three", num: 3}, {
        str: "four",
        num: 4
      }];
      let cyls = 0;

      engineType.forEach(({str, num}) => {
        if (firstSplit.includes(str)) {
          cyls = num;
        }
      })

      return cyls;
    }

    const getGearbox = (gearbox: string | undefined) => {
      let gears;
      if (gearbox)
        gears = gearbox.split("-")[0];
      return Number(gears ?? 0);
    }

    const maxValues = {
      displacement: Number(getNumberStr(firstMoto.displacement) >= getNumberStr(secMoto.displacement)
        ? getNumberStr(firstMoto.displacement)
        : getNumberStr(secMoto.displacement)
      ) + 100,
      fuelCapacity: 25,
      year: 2025,
      cylinders: 4,
      gearbox: 6
    };

    const scaleData = (value: number, max: number) => (value / max) * 100

    this.radarData = {
      labels: ['Displacement', 'Fuel Capacity', 'Year', 'Cylinders', 'Gearbox'],
      datasets: [
        {
          label: this.motorcycles[0].name,
          data: [
            scaleData(getNumberStr(firstMoto.displacement), maxValues.displacement),
            scaleData(getNumberStr(firstMoto.fuel_capacity), maxValues.fuelCapacity),
            scaleData(Number(firstMoto.year), maxValues.year),
            scaleData(getCylinders(firstMoto.engine), maxValues.cylinders),
            scaleData(getGearbox(firstMoto.gearbox), maxValues.gearbox),
          ]
        },
        {
          label: secMoto.name,
          data: [
            scaleData(getNumberStr(secMoto.displacement), maxValues.displacement),
            scaleData(getNumberStr(secMoto.fuel_capacity), maxValues.fuelCapacity),
            scaleData(Number(secMoto.year), maxValues.year),
            scaleData(getCylinders(secMoto.engine), maxValues.cylinders),
            scaleData(getGearbox(secMoto.gearbox), maxValues.gearbox),
          ]
        }
      ]
    };

    this.radarOptions = {
      scales: {
        r: {
          angleLines: {
            display: true
          },
          min: 0,
          max: 100,
          ticks: {
            beginAtZero: true,
            callback: function (value: any) {
              return value;
            }
          },
        }
      },
      plugins: {
        tooltip: false,
      },
    }

  }
}
