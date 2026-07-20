import { Routes, ActivatedRouteSnapshot } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GuideComponent } from './pages/annexes/guide/guide.component';
import { AproposComponent } from './pages/annexes/apropos/apropos.component';
import { FaqComponent } from './pages/annexes/faq/faq.component';
import { ContactComponent } from './pages/annexes/contact/contact.component';
import { MentionsLegalesComponent } from './pages/annexes/mentions-legales/mentions-legales.component';
import { PlanDuSiteComponent } from './pages/annexes/plan-du-site/plan-du-site.component';
import { AccessibiliteComponent } from './pages/annexes/accessibilite/accessibilite.component';
import { NotfoundComponent } from './pages/errors/notfound/notfound.component';
import { ExceptionComponent } from './pages/errors/exception/exception.component';
import { AllowedLocation } from './app.routes.guard';

export const routes: Routes = [ 
  { path: '', title: 'Cartographie des services publics - Accueil', component: AccueilComponent },
  { path: 'carte', title: 'Cartographie des services publics - Carte', component: HomeComponent },
  { path: 'guide-d-utilisation', title: 'Cartographie des services publics - Guide d\'utilisation', component: GuideComponent },
  { path: 'a-propos', title: 'Cartographie des services publics - À propos', component: AproposComponent },
  { path: 'foire-aux-questions', title: 'Cartographie des services publics - Foire aux questions', component: FaqComponent },
  { path: 'nous-contacter', title: 'Cartographie des services publics - Nous contacter', component: ContactComponent },
  { path: 'mentions-legales', title: 'Cartographie des services publics - Mentions légales', component: MentionsLegalesComponent },
  { path: 'plan-du-site', title: 'Cartographie des services publics - Plan du site', component: PlanDuSiteComponent },
  { path: 'accessibilite', title: 'Cartographie des services publics - Accessibilité', component: AccessibiliteComponent },
  { path: 'carte/departement/:location',
    title: (route: ActivatedRouteSnapshot) => `Cartographie des services publics - Département - ${route.paramMap.get('location')}`,
    component: HomeComponent, 
    canActivate: [AllowedLocation([
      '01', '02', '03', '04', '05', '06', '07', '08', '09',
      '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
      '2a', '2b',
      '21', '22', '23', '24', '25', '26', '27', '28', '29',
      '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
      '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
      '50', '51', '52', '53', '54', '55', '56', '57', '58', '59',
      '60', '61', '62', '63', '64', '65', '66', '67', '68', '69',
      '70', '71', '72', '73', '74', '75', '76', '77', '78', '79',
      '80', '81', '82', '83', '84', '85', '86', '87', '88', '89',
      '90', '91', '92', '93', '94', '95',
      '971', '972', '973', '974', '975', '976', '977', '978',
      '984', '986', '987', '988'
    ])]
  },
  { path: 'erreur', title: 'Cartographie des services publics - Erreur', pathMatch: 'full', component: ExceptionComponent },
  { path: 'page-introuvable', title: 'Cartographie des services publics - Page introuvable', pathMatch: 'full', component: NotfoundComponent },
  //Wild Card Route for any 404 request 
  { path: '**', title: 'Cartographie des services publics - Page introuvable', pathMatch: 'full', component: NotfoundComponent },
];
