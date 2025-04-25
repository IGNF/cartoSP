import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GuideComponent } from './pages/annexes/guide/guide.component';
import { TelechargementComponent } from './pages/annexes/telechargement/telechargement.component';
import { AproposComponent } from './pages/annexes/apropos/apropos.component';
import { FaqComponent } from './pages/annexes/faq/faq.component';
import { ContactComponent } from './pages/annexes/contact/contact.component';
import { CguComponent } from './pages/annexes/cgu/cgu.component';
import { DonneesPersonnellesComponent } from './pages/annexes/donnees-personnelles/donnees-personnelles.component';
import { MentionsLegalesComponent } from './pages/annexes/mentions-legales/mentions-legales.component';
import { PlanDuSiteComponent } from './pages/annexes/plan-du-site/plan-du-site.component';
import { AccessibiliteComponent } from './pages/annexes/accessibilite/accessibilite.component';
import { NotfoundComponent } from './pages/errors/notfound/notfound.component';
import { AllowedLocation } from './app.routes.guard';

export const routes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'guide-d-utilisation', component: GuideComponent },
  { path: 'telechargement-des-donnees', component: TelechargementComponent },
  { path: 'a-propos', component: AproposComponent },
  { path: 'foire-aux-questions', component: FaqComponent },
  { path: 'nous-contacter', component: ContactComponent },
  { path: 'cgu', component: CguComponent },
  { path: 'donnees-personnelles', component: DonneesPersonnellesComponent },
  { path: 'mentions-legales', component: MentionsLegalesComponent },
  { path: 'plan-du-site', component: PlanDuSiteComponent },
  { path: 'accessibilite', component: AccessibiliteComponent },
  { path: ':location', 
    component: HomeComponent, 
    canActivate: [AllowedLocation(['indre', 'hautes-alpes', 'nord'])]
  },
  //Wild Card Route for any 404 request 
  { path: '**', pathMatch: 'full', component: NotfoundComponent }, 
];
