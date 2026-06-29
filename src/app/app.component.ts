
import { Component, AfterViewInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { DsfrDisplayComponent, DsfrFooterModule, DsfrHeaderModule, DsfrTooltipDirective } from '@edugouvfr/ngx-dsfr';
import { DsfrToolLinkMenuComponent, DsfrLinkComponent } from '@edugouvfr/ngx-dsfr';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, NgIf, DsfrFooterModule, DsfrDisplayComponent, DsfrHeaderModule, DsfrToolLinkMenuComponent, DsfrLinkComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'cartosp';
  footerExpanded = false;
  mapPage = false;
  
  constructor(private router: Router) {}

  readonly displayModalId = 'theme-modal-id';
  readonly footerDisplayLabel = "Paramètres d'affichage";
  mandatoryLinks = [
    { label: 'Plan du site', link: '/plan-du-site' },
    {
      label: 'Accessibilité: partiellement conforme',
      link: '/accessibilite'
    },
    {
      label: 'Mentions légales',
      link: '/mentions-legales'
    }
  ];

  ngAfterViewInit(): void {
      this.router.events.subscribe((res) => { 
          if (this.router.url.startsWith('/carte')) {
            this.footerExpanded = false;
            this.mapPage = true;
          }else{
            this.footerExpanded = true;
            this.mapPage = false;
          }
      })
  }

  closeMobileMenu(): void {
    const openButton = document.getElementById('button-csp-menu');
    const modal = document.getElementById('modal-csp-menu');

    openButton?.setAttribute('aria-expanded', 'false');
    openButton?.setAttribute('data-fr-opened', 'false');
    modal?.setAttribute('aria-hidden', 'true');
    modal?.classList.remove('fr-modal--opened');
    document.documentElement.classList.remove('fr-no-scroll');
    document.body.classList.remove('fr-no-scroll');
  }

  expandFooter(): void {
    this.footerExpanded = true;
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 0);
  }

  collapseFooter(): void {
    this.footerExpanded = false;
  }
}
