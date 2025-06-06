import { Component } from '@angular/core';
import { DsfrDownloadModule } from '@edugouvfr/ngx-dsfr';

@Component({
  selector: 'app-telechargement',
  standalone: true,
  imports: [DsfrDownloadModule],
  templateUrl: './telechargement.component.html',
  styleUrl: './telechargement.component.css'
})
export class TelechargementComponent {

}
