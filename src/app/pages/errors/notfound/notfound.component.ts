import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DsfrResponseModule } from '@edugouvfr/ngx-dsfr';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [DsfrResponseModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {

  constructor(private router: Router) { }

  contactSelect() {}

  backToHomeSelect() {
    this.router.navigate(['']);
  }
}
