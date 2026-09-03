import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { DsfrResponseModule } from '@edugouvfr/ngx-dsfr';

@Component({
    selector: 'app-notfound',
    imports: [DsfrResponseModule],
    templateUrl: './notfound.component.html',
    styleUrl: './notfound.component.css'
})
export class NotfoundComponent {
  private router = inject(Router);


  contactSelect() {
    this.router.navigate(['/nous-contacter']);
  }

  backToHomeSelect() {
    this.router.navigate(['']);
  }
}
