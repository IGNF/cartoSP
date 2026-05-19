import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DsfrFooterModule } from '@edugouvfr/ngx-dsfr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DsfrFooterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'cartosp';
  readonly headerTitle = 'Cartographie des services publics';

  menuItems = [
    {
      label: 'Guide d\'utilisation',
      icon: '',
      links: [{ label: 'Guide d\'utilisation', href: '/guide-d-utilisation' }],
      connectionMenu: false
    },
    {
      label: 'Expérimentation',
      icon: '',
      links: [{ label: 'Expérimentation', href: '/experimentation' }],
      connectionMenu: false
    },
    {
      label: 'Données',
      icon: '',
      links: [
        { label: 'Téléchargement des données', href: '/telechargement-des-donnees' },
        { label: 'Correction des données', href: '/correction-des-donnees' }
      ],
      connectionMenu: false
    },
    {
      label: 'À propos',
      icon: '',
      links: [{ label: 'À propos', href: '/a-propos' }],
      connectionMenu: false
    },
    {
      label: 'Assistance',
      icon: '',
      links: [
        { label: 'Foire aux questions', href: '/foire-aux-questions' },
        { label: 'Nous contacter', href: '/nous-contacter' }
      ],
      connectionMenu: false
    }
  ];

  ngAfterViewInit(): void {
    this.applyHeaderTitle();
  }

  private applyHeaderTitle(): void {
    const header = document.querySelector('ign-dsfr-header');
    if (!header) {
      return;
    }

    const titleEl = header.querySelector('.fr-header__service-title');
    if (!titleEl) {
      // The web component renders asynchronously; retry once on next frame.
      requestAnimationFrame(() => this.applyHeaderTitle());
      return;
    }

    titleEl.textContent = this.headerTitle;
  }
}
