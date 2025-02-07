import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DsfrHeaderModule, DsfrFooterModule } from '@edugouvfr/ngx-dsfr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DsfrHeaderModule, DsfrFooterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cartosp';
}
