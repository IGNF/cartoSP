import { Component, OnInit, Input } from '@angular/core';

import { DsfrTabsModule, DsfrButtonModule } from '@edugouvfr/ngx-dsfr';

import { RightpanelService } from '../../rightpanel.service';
import { WfsService } from './../../../services/wfs.service';
import { GeocodageService } from './../../../services/geocodage.service';
import { LocalisationInfoComponent } from '../../content/localisation-info/localisation-info.component';
import { SimpleGeometry } from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

export interface Departement {
  id: number;
  name: string;
  number: string;
}

export interface Epci {
  id: number;
  name: string;
}

export interface Commune {
  id: number;
  name: string;
}

@Component({
  selector: 'app-localisation',
  standalone: true,
  imports: [DsfrTabsModule, DsfrButtonModule],
  templateUrl: './localisation.component.html',
  styleUrl: './localisation.component.css',
  providers: [WfsService, GeocodageService]
})
export class LocalisationComponent implements OnInit {

  constructor(private WfsService: WfsService, private GeocodageService: GeocodageService, private rightpanelService: RightpanelService) {}

  @Input() data!: any;
  selectedTabIndex = 0;
  tabsAriaLabel = "Onglets informations SP"
  fullViewport = true;
  currentTab = "departement";
  departements: Departement[] = [];
  epcis: Epci[] = [];
  communes: Commune[] = [];
  
  highlightLayer = new VectorLayer({
    style: {
      'stroke-color': 'red',
      'stroke-width': 3,
    },
  });

  highlightSource?: VectorSource;

  ngOnInit() {
    var self = this;

    // On charge une première fois la liste
    self.searchLocations(this.data);

    // Ajout event on loadend de la carte pour charger les listes de localisation
    this.data.on('loadend', function(e: any){
      self.searchLocations(e.map);
    }); 
  }

  // Changer d'onglet
  changeTab(tab: any) {
    this.currentTab = tab;
  }

  // Sélectionner une localisation
  selectLocation(selected: any) {
    this.GeocodageService.getSearchTrueGeometry(selected.name).subscribe({
      next : (response: any) => {
          const locationGeom = new GeoJSON().readFeatures(response.features[0].properties.truegeometry, {featureProjection: 'EPSG:3857'})[0].getGeometry();
          this.data.getView().fit(locationGeom as SimpleGeometry, {padding: [30,30,30,30]});
          this.data.removeLayer(this.highlightLayer);
          this.rightpanelService.setContent(LocalisationInfoComponent, {map : this.data, location: selected, type: this.currentTab}, "locationinfo");
      },
      error : (error: any) => { console.error('Error fetching location geometry:', error) }
    });
  }

  // ajouter le highlight sur une localisation
  highlightLocation(name: any) {
    this.GeocodageService.getSearchTrueGeometry(name).subscribe({
      next : (response: any) => {
          const locationGeom = new GeoJSON().readFeatures(response.features[0].properties.truegeometry, {featureProjection: 'EPSG:3857'});
          this.data.removeLayer(this.highlightLayer);
          this.highlightSource = new VectorSource({});
          this.highlightSource?.addFeatures(locationGeom);
          this.highlightLayer.setSource(this.highlightSource);
          this.data.addLayer(this.highlightLayer);
      },
      error : (error: any) => { console.error('Error fetching location geometry:', error) }
    });
  }

  // supprimer le highlight sur une localisation
  unhighlightLocation(name: any) {
    this.data.removeLayer(this.highlightLayer);
  }

  searchLocations(e: any) {
    var self = this;

    if(self.rightpanelService.isExpanded && self.rightpanelService.currentView == "location"){
      if (self.currentTab == "epci"){
        if (e.getView().getZoom() > 10){
          self.WfsService.getEpciFromBbox(e.getView().calculateExtent(e.getSize()).toString()).subscribe({
            next : (response: any) => {
                self.epcis = [];
                response.features.forEach( (feature: { properties: { id: any; nom: any; }; }) => {
                  self.epcis.push({id: feature.properties.id , name: feature.properties.nom });
                });
            },
            error : (error: any) => { console.error('Error fetching epci datas:', error); }
          });
        } else {
          self.epcis = [];
        }
      } else if (self.currentTab == "commune") {
        if (e.getView().getZoom() > 12){
          self.WfsService.getCommuneFromBbox(e.getView().calculateExtent(e.getSize()).toString()).subscribe({
            next : (response: any) => {  
                self.communes = [];
                response.features.forEach( (feature: { properties: { id: any; nom: any; insee_dep: any; }; }) => {
                  self.communes.push({id: feature.properties.id , name: feature.properties.nom });
                });
            },
            error : (error: any) => { console.error('Error fetching commune datas:', error); }
          });
        } else {
          self.communes = [];
        }
      } else {
        self.WfsService.getDepartementFromBbox(e.getView().calculateExtent(e.getSize()).toString()).subscribe({
          next : (response: any) => {  
              self.departements = [];
              response.features.forEach( (feature: { properties: { id: any; nom: any; insee_dep: any; }; }) => {
                self.departements.push({id: feature.properties.id , name: feature.properties.nom, number: feature.properties.insee_dep });
              });
          },
          error : (error: any) => { console.error('Error fetching departement datas:', error); }
        });
      }
    } 
  }
}