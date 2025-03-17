import { Component, Input } from '@angular/core';

import { RightpanelService } from '../../rightpanel.service';
import { LocalisationComponent } from '../../content/localisation/localisation.component';
import { DsfrTabsModule, DsfrAccordionModule, DsfrButtonModule } from '@edugouvfr/ngx-dsfr';

@Component({
  selector: 'app-localisation-info',
  standalone: true,
  imports: [DsfrButtonModule, DsfrTabsModule, DsfrAccordionModule],
  templateUrl: './localisation-info.component.html',
  styleUrl: './localisation-info.component.css'
})
export class LocalisationInfoComponent {

  constructor(private rightpanelService: RightpanelService) {}

  @Input() data!: any;
  selectedTabIndex = 0;
  tabsAriaLabel = "Onglets informations SP"
  fullViewport = true;

  onButtonBackLocationClic(){
    this.rightpanelService.setContent(LocalisationComponent, this.data.map, "location");
  }
}
