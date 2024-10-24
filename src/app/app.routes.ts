import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CompareComponent} from "./compare/compare.component";
import {compareGuard} from "./services/compare.guard";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'compare',
    component: CompareComponent,
    canActivate: [compareGuard],
  },
  {
    path: '**',
    redirectTo: ''
  }
];
