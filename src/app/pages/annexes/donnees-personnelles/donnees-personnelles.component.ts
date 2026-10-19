import { DOCUMENT } from '@angular/common';
import { afterNextRender, Component, CSP_NONCE, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-donnees-personnelles',
  imports: [],
  templateUrl: './donnees-personnelles.component.html',
  styleUrl: './donnees-personnelles.component.css',
})
export class DonneesPersonnellesComponent {
  readonly optOutLoadFailed = signal(false);

  private readonly document = inject(DOCUMENT);
  private readonly nonce = inject(CSP_NONCE, { optional: true });
  private readonly destroyRef = inject(DestroyRef);
  private readonly optOutContainer = viewChild.required<ElementRef<HTMLDivElement>>('optOutContainer');

  constructor() {
    afterNextRender(() => {
      const script = this.document.createElement('script');
      script.src = 'https://matomo.ign.fr/index.php?module=CoreAdminHome&action=optOutJS&divId=matomo-opt-out&language=auto&showIntro=1';
      script.async = true;
      if (this.nonce) {
        script.nonce = this.nonce;
      }
      script.onerror = () => {
        console.error('Failed to load the Matomo opt-out script.');
        this.optOutLoadFailed.set(true);
      };
      this.optOutContainer().nativeElement.appendChild(script);

      this.destroyRef.onDestroy(() => {
        script.onerror = null;
        script.remove();
      });
    });
  }
}
