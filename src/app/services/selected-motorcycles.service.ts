import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Motorcycle} from "../../interfaces/Motorcycle";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class SelectedMotorcyclesService {
  private localStorageKey = "selectedMotorcycles";
  private selectedMotorcyclesSubject = new BehaviorSubject<Motorcycle[]>([]);
  selectedMotorcycles$ = this.selectedMotorcyclesSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const savedMotorcycles: Motorcycle[] | undefined = this.localStorageService.getItem(this.localStorageKey);
    if (savedMotorcycles) {
      this.selectedMotorcyclesSubject.next(savedMotorcycles);
    }
  }

  // Get current motorcycles
  getMotorcycles(): Motorcycle[] {
    return this.selectedMotorcyclesSubject.value;
  }

  // Add new motorcycle
  addMotorcycle(motorcycle: Motorcycle) {
    const currentMotorcycles = this.getMotorcycles();
    const updatedMotorcycles = [...currentMotorcycles, motorcycle];
    this.selectedMotorcyclesSubject.next(updatedMotorcycles);
    this.saveToLocalStorage(updatedMotorcycles);
    this.logChanges('add', motorcycle);
  }

  // Remove motorcycle
  removeMotorcycle(motorcycle: Motorcycle) {
    const currentMotorcycles = this.getMotorcycles();
    const updatedMotorcycles = currentMotorcycles.filter(m => m !== motorcycle)
    this.selectedMotorcyclesSubject.next(updatedMotorcycles);
    this.saveToLocalStorage(updatedMotorcycles);
    this.logChanges('remove', motorcycle);
  }

  // Reset all motorcycles
  resetAllMotorcycles() {
    this.selectedMotorcyclesSubject.next([]);
    this.localStorageService.removeItem(this.localStorageKey);
    console.log("Motorcycles cleared")
  }

  private logChanges(action: 'add' | 'remove', motorcycle: Motorcycle) {
    console.log(`Motorcycle ${action}ed: `, motorcycle);
    console.log("Updated list: ", this.getMotorcycles())
  }

  private saveToLocalStorage(motorcycles: Motorcycle[]) {
    this.localStorageService.setItem(this.localStorageKey, motorcycles);
  }
}
