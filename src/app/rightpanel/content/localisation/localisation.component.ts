import { Component, OnInit, Input } from '@angular/core';

import { DsfrTabsModule, DsfrButtonModule } from '@edugouvfr/ngx-dsfr';

import { RightpanelService } from '../../rightpanel.service';

@Component({
  selector: 'app-localisation',
  standalone: true,
  imports: [DsfrTabsModule, DsfrButtonModule],
  templateUrl: './localisation.component.html',
  styleUrl: './localisation.component.css'
})
export class LocalisationComponent implements OnInit {

  constructor(private rightpanelService: RightpanelService) {}

  @Input() data!: any;
  selectedTabIndex = 0;
  tabsAriaLabel = "Onglets informations SP"
  fullViewport = true;   

  ngOnInit() {
    /*console.log(this.data);
    var self = this;
    this.data.on('moveend', function(e: any){
      if(self.rightpanelService.isExpanded && self.rightpanelService.currentView == "location"){
        console.log("mon event");
        console.log(e.map);
      }
    });*/
  }
}

/* A tester les requête wfs
https://data.geopf.fr/wfs/ows?
&TYPENAME=ADMINEXPRESS-COG.LATEST:epci
&REQUEST=GetFeature
&BBOX=239806.10177226245%2C6461736.396976371%2C515194.6048692738%2C6591697.936899454%2CEPSG%3A3857
&OUTPUTFORMAT=application%2Fjson
&SRSNAME=EPSG%3A3857
&VERSION=2.0.0
&MAXFEATURES=500
&SERVICE=WFS
&propertyname=geom,filterfiche,gemeente*/