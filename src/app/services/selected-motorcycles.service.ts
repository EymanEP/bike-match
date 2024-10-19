import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Motorcycle} from "../../interfaces/Motorcycle";

@Injectable({
  providedIn: 'root'
})
export class SelectedMotorcyclesService {
  private selectedMotorcyclesSubject = new BehaviorSubject<Motorcycle[]>([]);
  selectedMotorcycles$ = this.selectedMotorcyclesSubject.asObservable();

  // Get current motorcycles
  getMotorcycles(): Motorcycle[] {
    return this.selectedMotorcyclesSubject.value;
  }

  // Add new motorcycle
  addMotorcycle(motorcycle: Motorcycle) {
    const currentMotorcycles = this.getMotorcycles();
    this.selectedMotorcyclesSubject.next([...currentMotorcycles, motorcycle]);
    this.logChanges('add', motorcycle);
  }

  // Remove motorcycle
  removeMotorcycle(motorcycle: Motorcycle) {
    const currentMotorcycles = this.getMotorcycles();
    this.selectedMotorcyclesSubject.next(currentMotorcycles.filter(m => m !== motorcycle));
    this.logChanges('remove', motorcycle);
  }

  // Reset all motorcycles
  resetAllMotorcycles() {
    this.selectedMotorcyclesSubject.next([]);
  }

  private logChanges(action: 'add' | 'remove', motorcycle: Motorcycle) {
    console.log(`Motorcycle ${action}ed: `, motorcycle);
    console.log("Updated list: ", this.getMotorcycles())
  }
}
