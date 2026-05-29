import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { transform } from 'ol/proj';
import { Feature } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import { CartospIsocurve } from "geopf-extensions-openlayers/src";
import { RightpanelService } from '../../rightpanel/rightpanel.service';
import { LocalisationInfoComponent } from '../../rightpanel/content/localisation-info/localisation-info.component';
import { ApicartospService } from '../../services/apicartosp.service';
import { GeocodageService } from '../../services/geocodage.service';
import { IsochroneStatsService } from '../../services/isochronestats.service';

@Component({
  selector: 'app-isochrone-simple',
  standalone: true,
  template: '',
  styles: []
})
export class IsochroneSimpleComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef, private rightpanelService: RightpanelService, private apicartospService: ApicartospService, private geocodageService: GeocodageService, private isochroneStatsService: IsochroneStatsService) {}

  ngOnInit() {
    this.control = new CartospIsocurve({
      position : "top-left",
      target: this.elementRef.nativeElement,
      locations: [
        {nom:"Ain", code: "01"},
        {nom:"Aisne", code: "02"},
        {nom:"Allier", code: "03"},
        {nom:"Alpes-de-Haute-Provence", code: "04"},
        {nom:"Hautes-Alpes", code: "05"},
        {nom:"Alpes-Maritimes", code: "06"},
        {nom:"Ardèche", code: "07"},
        {nom:"Ardennes", code: "08"},
        {nom:"Ariège", code: "09"},
        {nom:"Aube", code: "10"},
        {nom:"Aude", code: "11"},
        {nom:"Aveyron", code: "12"},
        {nom:"Bouches-du-Rhône", code: "13"},
        {nom:"Calvados", code: "14"},
        {nom:"Cantal", code: "15"},
        {nom:"Charente", code: "16"},
        {nom:"Charente-Maritime", code: "17"},
        {nom:"Cher", code: "18"},
        {nom:"Corrèze", code: "19"},
        {nom:"Corse-du-Sud", code: "2A"},
        {nom:"Haute-Corse", code: "2B"},
        {nom:"Côte-d'Or", code: "21"},
        {nom:"Côtes-d'Armor", code: "22"},
        {nom:"Creuse", code: "23"},
        {nom:"Dordogne", code: "24"},
        {nom:"Doubs", code: "25"},
        {nom:"Drôme", code: "26"},
        {nom:"Eure", code: "27"},
        {nom:"Eure-et-Loir", code: "28"},
        {nom:"Finistère", code: "29"},
        {nom:"Gard", code: "30"},
        {nom:"Haute-Garonne", code: "31"},
        {nom:"Gers", code: "32"},
        {nom:"Gironde", code: "33"},
        {nom:"Hérault", code: "34"},
        {nom:"Ille-et-Vilaine", code: "35"},
        {nom:"Indre", code: "36"},
        {nom:"Indre-et-Loire", code: "37"},
        {nom:"Isère", code: "38"},
        {nom:"Jura", code: "39"},
        {nom:"Landes", code: "40"},
        {nom:"Loir-et-Cher", code: "41"},
        {nom:"Loire", code: "42"},
        {nom:"Haute-Loire", code: "43"},
        {nom:"Loire-Atlantique", code: "44"},
        {nom:"Loiret", code: "45"},
        {nom:"Lot", code: "46"},
        {nom:"Lot-et-Garonne", code: "47"},
        {nom:"Lozère", code: "48"},
        {nom:"Maine-et-Loire", code: "49"},
        {nom:"Manche", code: "50"},
        {nom:"Marne", code: "51"},
        {nom:"Haute-Marne", code: "52"},
        {nom:"Mayenne", code: "53"},
        {nom:"Meurthe-et-Moselle", code: "54"},
        {nom:"Meuse", code: "55"},
        {nom:"Morbihan", code: "56"},
        {nom:"Moselle", code: "57"},
        {nom:"Nièvre", code: "58"},
        {nom:"Nord", code: "59"},
        {nom:"Oise", code: "60"},
        {nom:"Orne", code: "61"},
        {nom:"Pas-de-Calais", code: "62"},
        {nom:"Puy-de-Dôme", code: "63"},
        {nom:"Pyrénées-Atlantiques", code: "64"},
        {nom:"Hautes-Pyrénées", code: "65"},
        {nom:"Pyrénées-Orientales", code: "66"},
        {nom:"Bas-Rhin", code: "67"},
        {nom:"Haut-Rhin", code: "68"},
        {nom:"Rhône", code: "69"},
        {nom:"Haute-Saône", code: "70"},
        {nom:"Saône-et-Loire", code: "71"},
        {nom:"Sarthe", code: "72"},
        {nom:"Savoie", code: "73"},
        {nom:"Haute-Savoie", code: "74"},
        {nom:"Paris", code: "75"},
        {nom:"Seine-Maritime", code: "76"},
        {nom:"Seine-et-Marne", code: "77"},
        {nom:"Yvelines", code: "78"},
        {nom:"Deux-Sèvres", code: "79"},
        {nom:"Somme", code: "80"},
        {nom:"Tarn", code: "81"},
        {nom:"Tarn-et-Garonne", code: "82"},
        {nom:"Var", code: "83"},
        {nom:"Vaucluse", code: "84"},
        {nom:"Vendée", code: "85"},
        {nom:"Vienne", code: "86"},
        {nom:"Haute-Vienne", code: "87"},
        {nom:"Vosges", code: "88"},
        {nom:"Yonne", code: "89"},
        {nom:"Territoire de Belfort", code: "90"},
        {nom:"Essonne", code: "91"},
        {nom:"Hauts-de-Seine", code: "92"},
        {nom:"Seine-Saint-Denis", code: "93"},
        {nom:"Val-de-Marne", code: "94"},
        {nom:"Val-d'Oise", code: "95"},
        {nom:"Guyane française", code: "973"},
        {nom:"Guadeloupe", code: "971"},
        {nom:"Martinique", code: "972"},
        {nom:"Réunion", code: "974"},
        {nom:"Mayotte", code: "976"},
        {nom:"Saint-Barthélemy", code: "977"},
        {nom:"Saint-Martin", code: "978"},
        {nom:"Saint-Pierre-et-Miquelon", code: "975"},
        {nom:"Wallis-et-Futuna", code: "986"},
        {nom:"Polynésie française", code: "987"},
        {nom:"Nouvelle-Calédonie", code: "988"}
      ],
      typologies: [
        {nom:"Caisse d'allocations familiales (Caf)"}, 
        {nom:"Caisse d'assurance retraite et de la santé au travail (Carsat)"},
        {nom:"Caisse primaire d’assurance maladie (CPAM)"}, 
        {nom:"Espace conseil France rénov'"}, 
        {nom:"France Santé"},
        {nom:"France services"}, 
        {nom:"France Travail"}, 
        {nom:"Maison départementale des solidarités (MDS)"}, 
        {nom:"Mutualité sociale agricole (MSA)"}, 
        {nom:"Point-justice"}, 
        {nom:"Service des impôts des particuliers (SIP)"}
      ],
      cartospApi: this.apicartospService.apiUrl + "/isochrone"
    });

    this.control.addEventListener("isochrone:add",  (e: any) => {
      let isochrones = e.layer.values_.source.getFeatures();
      let location = e.target._typologyLocationSelected;

      // Set loading state immediately and open the panel before the API call
      e.layer.set('totalsDepartement', { loading: true });
      this.rightpanelService.setContent(LocalisationInfoComponent,{map : this.map, location: {name: e.layer.values_.name_location,number: e.layer.values_.location}, type: "departement", isochronecall: true}, "locationinfo");

      // get location bbox in EPSG:4326 for isochrone statistics API call
      this.geocodageService.getAdminExpressDepartementGeometry(location).subscribe({
        next : (response: any) => {
          if (response?.features?.[0]?.geometry) {
            const locationGeom = new GeoJSON().readGeometry(response.features[0].geometry);

            // Highlight the location on the map
            const layers = this.map.getLayers().getArray();
            const highlightLayer = layers.find((l: any) => l.values_?.name === 'highlight') as any;
            if (highlightLayer) {
              const source: VectorSource = highlightLayer.getSource();
              source.clear();
              source.addFeature(new Feature(locationGeom));
              highlightLayer.setVisible(true);
              this.map.getView().fit(locationGeom.getExtent(), { padding: [30, 30, 30, 30] });
            }
            const extent3857 = locationGeom.getExtent();
            const [minLon, minLat] = transform([extent3857[0], extent3857[1]], 'EPSG:3857', 'EPSG:4326');
            const [maxLon, maxLat] = transform([extent3857[2], extent3857[3]], 'EPSG:3857', 'EPSG:4326');
            const BBOX = `${minLat},${minLon},${maxLat},${maxLon}`;

            this.isochroneStatsService.getIsochroneStatsByBbox({location_code: location, bbox: BBOX}, isochrones).subscribe({
              next : (response: any) => {
                e.layer.set('totalsDepartement', response);
                console.log("Isochrone statistics totals:", response);
                const TARGET_LAYER_NAME = "base_carto_sp_18_02_gpkg_18-02-2026_wfs:carto_sp_18_02__base_carto_sp";
                const layers = this.map.getLayers().getArray();
                const targetLayer = layers.find((l: any) => l.name === TARGET_LAYER_NAME);
                if (targetLayer) {
                  const maxZIndex = layers.reduce((max: number, l: any) => Math.max(max, l.getZIndex() ?? 0), 0);
                  targetLayer.setZIndex(maxZIndex + 1);
                }
              },
              error : (error: any) => { console.error('Error fetching isochrone statistics:', error) }
            });
          } else {
            console.error('No geometry found for location:', location);
          }
        },
        error : (error: any) => { console.error('Error fetching location geometry for statistics:', error) }
      });
    });

    this.control.addEventListener("isochrone:remove",  (e: any) => {
      this.rightpanelService.setContent(LocalisationInfoComponent,{map : this.map, location: {name: e.layer.values_.name_location,number: e.layer.values_.location}, type: "departement", isochronecall: true}, "locationinfo");
    });

    this.map.addControl(this.control);
  }

}

