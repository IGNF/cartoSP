
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { DsfrFooterModule } from '@edugouvfr/ngx-dsfr';
import { DsfrToolLinkMenuComponent, DsfrLinkComponent } from '@edugouvfr/ngx-dsfr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, DsfrFooterModule, DsfrToolLinkMenuComponent, DsfrLinkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cartosp';
  footerExpanded = false;

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
