import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Motorcycle} from "../../../interfaces/Motorcycle";
import {FetchMotorcycleService} from "../../services/fetch-motorcycle.service";
import {SelectedMotorcyclesService} from "../../services/selected-motorcycles.service";
import {FormsModule} from "@angular/forms";
import {AutoCompleteModule} from "primeng/autocomplete";

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    FormsModule,
    AutoCompleteModule
  ],
  template: `
    <p-autoComplete
      [(ngModel)]="selectedMotorcycle"
      [suggestions]="suggestions"
      (completeMethod)="search($event)"
      [showClear]="true"
      (onSelect)="onInputSelected()"
      (onClear)="onCleared()"
      inputId="float-label"
      optionLabel="name"
      placeholder="Type here your motorcycle to compare"
      [inputStyle]="inputStyleString"
    />
  `,
  styles: ``
})
export class SearchInputComponent implements OnInit {
  @Input() clearInputOnSelect?: boolean;
  @Input() inputStyle?: 'clear' | 'solid';
  @Output() onInputSelectChange = new EventEmitter();
  suggestions: any = [];
  selectedMotorcycle: Motorcycle | null = null;
  inputStyleString!: Object;
  private lastSelectedMotorcycle: Motorcycle | null = null;
  private fetchMotorcycleService = inject(FetchMotorcycleService);
  private selectedMotorcycleService = inject(SelectedMotorcyclesService);

  ngOnInit() {
    if (this.inputStyle === undefined) {
      this.inputStyle = "clear";
    }

    this.inputStyleString = this.inputStyle === 'clear' ? {
        'background-color': 'rgba(255, 255, 255, 0)',
        'color': 'white',
        'border': '2px white solid'
      } :
      {};
  }

  search(event: any) {
    const query = event.query.split(" ");
    const yearPattern = /\b(19[0-9]{3}|20[0-9]{2})\b/;
    let year: string | undefined;

    query.forEach((word: string) => {
      if (word.match(yearPattern)) year = word;
    })

    const make: string = query[0] || undefined;
    const model: string = query[1] || undefined;

    if (make) {
      this.fetchMotorcycleService.searchMotorcycles(make, model, year).subscribe(
        (data: Motorcycle[]) => {
          this.suggestions = data.map((item: Motorcycle) => (
            {
              ...item,
              id: Math.floor(Math.random()),
              name: `${item.make} ${item.model} (${item.year})`,
            }
          ))
        }
      )
    }
  }

  onInputSelected() {
    if (this.selectedMotorcycle) {
      this.selectedMotorcycleService.addMotorcycle(this.selectedMotorcycle);
    }
    this.lastSelectedMotorcycle = this.selectedMotorcycle;

    if (this.clearInputOnSelect) {
      this.selectedMotorcycle = null;
      this.lastSelectedMotorcycle = null;
      this.onInputSelectChange.emit();
    }
  }

  onCleared() {
    if (this.lastSelectedMotorcycle) {
      this.selectedMotorcycleService.removeMotorcycle(this.lastSelectedMotorcycle);
    }

    this.selectedMotorcycle = null;
  }
}
