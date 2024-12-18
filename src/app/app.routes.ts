import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './pages/errors/notfound/notfound.component';
import { AllowedLocation } from './app.routes.guard';

export const routes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: ':location', 
    component: HomeComponent, 
    canActivate: [AllowedLocation(['indre', 'hautes-alpes', 'nord'])]
  },
  //Wild Card Route for any 404 request 
  { path: '**', pathMatch: 'full', component: NotfoundComponent }, 
];
