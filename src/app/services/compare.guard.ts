import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {SelectedMotorcyclesService} from "./selected-motorcycles.service";
import {Subscription} from "rxjs";
import {Motorcycle} from "../../interfaces/Motorcycle";

export const compareGuard: CanActivateFn = () => {
  const selectedMotorcycleService = inject(SelectedMotorcyclesService);
  const router = inject(Router);
  const subscription: Subscription = new Subscription();
  let selectedMotorcycles: Motorcycle[] = [];
  subscription.add(selectedMotorcycleService.selectedMotorcycles$.subscribe(
      motos => selectedMotorcycles = motos
    )
  )

  if (selectedMotorcycles.length >= 1) {
    subscription.unsubscribe();
    return true;
  } else {
    subscription.unsubscribe();
    router.navigate(['/'])
    return false;
  }
};
