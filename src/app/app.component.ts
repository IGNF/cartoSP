
import { Component, AfterViewInit, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { DsfrDisplayComponent, DsfrFooterModule, DsfrHeaderModule } from '@edugouvfr/ngx-dsfr';
import { DsfrToolLinkMenuComponent, DsfrLinkComponent } from '@edugouvfr/ngx-dsfr';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, NgIf, DsfrFooterModule, DsfrDisplayComponent, DsfrHeaderModule, DsfrToolLinkMenuComponent, DsfrLinkComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private router = inject(Router);
  private footerResizeObserver?: ResizeObserver;

  // Tracks the actual rendered height of #small-footer since it can wrap onto several lines on narrow screens
  @ViewChild('smallFooter') set smallFooterRef(ref: ElementRef<HTMLElement> | undefined) {
    this.footerResizeObserver?.disconnect();
    if (ref) {
      this.footerResizeObserver = new ResizeObserver((entries) => {
        const height = entries[0]?.contentRect.height;
        if (height) {
          document.documentElement.style.setProperty('--small-footer-height', `${height}px`);
        }
      });
      this.footerResizeObserver.observe(ref.nativeElement);
    }
  }

  title = 'cartosp';
  footerExpanded = false;
  mapPage = false;

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
      this.router.events.subscribe(() => { 
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

  skipTo(targetId: string, event: Event): void {
    event.preventDefault();

    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${targetId}`);
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  hideNotice(): void {
    const button = event?.target as HTMLButtonElement;
    const notice = button?.parentNode?.parentNode as HTMLElement;
    notice?.parentNode?.removeChild(notice);
    const mainInfoReduce = document.getElementsByClassName('main--info-reduce')[0] as HTMLElement;
    mainInfoReduce?.classList.remove('main--info-reduce');
  }

  ngOnDestroy(): void {
    this.footerResizeObserver?.disconnect();
  }
}
