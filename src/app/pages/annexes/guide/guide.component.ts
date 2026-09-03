import { Component, ViewChild, AfterViewInit, ElementRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DsfrDownloadComponent } from '@edugouvfr/ngx-dsfr';

@Component({
    selector: 'app-guide',
    imports: [RouterModule, DsfrDownloadComponent],
    templateUrl: './guide.component.html',
    styleUrl: './guide.component.css'
})
export class GuideComponent implements AfterViewInit {
  private activatedRoute = inject(ActivatedRoute);

  @ViewChild('guideScroll') guideScroll: ElementRef | undefined;

  ngAfterViewInit(): void {
    this.activatedRoute.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          // Scroll vers l'élément après un petit délai
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 0);
        }
      }
    });
  }
}
