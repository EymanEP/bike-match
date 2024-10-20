import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {ContactComponent} from "./contact/contact.component";
import {CompareComponent} from "./compare/compare.component";
import {compareGuard} from "./services/compare.guard";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
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
