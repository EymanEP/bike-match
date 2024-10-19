import {Component, Input, OnInit} from '@angular/core';
import {Motorcycle} from "../../../interfaces/Motorcycle";
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {NgForOf} from "@angular/common";

interface Column {
  field: string;
  header?: string;
}

@Component({
  selector: 'app-compare-table',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    NgForOf
  ],
  templateUrl: './compare-table.component.html',
  styles: ``
})
export class CompareTableComponent implements OnInit {
  @Input() motorcycles: Motorcycle[] = [];
  cols: Column[] = [];
  comparisonRows: any[] = [];

  ngOnInit() {
    const firstMoto = this.motorcycles[0];
    const secMotoc = this.motorcycles[1];

    this.cols = [
      {field: 'property', header: 'Property'},
      {field: 'firstMoto', header: firstMoto.name},
      {field: "secMoto", header: secMotoc.name}
    ]

    this.comparisonRows = this.generateComparisons(firstMoto, secMotoc);
  }

  generateComparisons(first: Motorcycle, second: Motorcycle) {
    const comparisonData: any[] = [];
    (Object.keys(first) as Array<keyof Motorcycle>).forEach((key) => {
      comparisonData.push(
        {
          property: this.formatPropertyName(key),
          firstMoto: first[key],
          secMoto: second[key]
        }
      )
    })

    return comparisonData;
  }

  formatPropertyName(key: string) {
    return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
}
