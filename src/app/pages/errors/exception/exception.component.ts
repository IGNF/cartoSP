import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DsfrResponseModule } from '@edugouvfr/ngx-dsfr';

@Component({
  selector: 'app-exception',
  imports: [DsfrResponseModule],
  templateUrl: './exception.component.html',
  styleUrl: './exception.component.css',
})
export class ExceptionComponent {
  
  constructor(private router: Router) { }

  contactSelect() {
    this.router.navigate(['/nous-contacter']);
  }

  backToHomeSelect() {
    this.router.navigate(['']);
  }

}
