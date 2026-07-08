import { Component, Input, OnInit  } from '@angular/core';

import {TitleCasePipe} from '@angular/common';

import { DsfrTabsModule, DsfrAccordionModule, DsfrButtonModule } from '@edugouvfr/ngx-dsfr';

import { RightpanelService } from '../../rightpanel.service';
import { ApicartospService } from './../../../services/apicartosp.service';
import { LocalisationComponent } from '../../content/localisation/localisation.component';

import opening_hours from 'opening_hours';

interface days {
  day: string;
  time: Array<String>;
}

interface responseListType {
  name : string,
  openinghours: {weekstable: boolean, openingHours: Array<days>}|{weekstable: boolean, openingHours: Array<{ dates: Array<String>, time: Array<String>}>}|null
}

@Component({
    selector: 'app-service-public',
    imports: [DsfrTabsModule, DsfrAccordionModule, DsfrButtonModule, TitleCasePipe],
    templateUrl: './service-public.component.html',
    styleUrl: './service-public.component.css'
})
export class ServicePublicComponent implements OnInit {
  
  constructor(private rightpanelService: RightpanelService, private apicartospService: ApicartospService) {}

  @Input() data!: any;    
  selectedTabIndex = 0;
  tabsAriaLabel = "Onglets informations SP"
  fullViewport = true;
  typeStructure?: string;
  serviceOpeningHours?: any|null;
  responseList?: any|null;
  serviceName?: string|null;
  websiteUrls: string[] = [];
  accessibilityLink: string | null = null;

  ngOnInit() {
    this.serviceName = null;
    this.responseList = null;
    this.typeStructure = this.data.selectedSP.type_structure;
    this.websiteUrls = this.extractWebsiteUrls(this.data.selectedSP.site_internet);
    this.fetchAccessibilityLink(this.data.selectedSP.identifiants_sources);

    switch (this.typeStructure) {
      case "Implantation":
        this.getResponseList(this.data.selectedSP.id_position);
        this.serviceOpeningHours = this.buildTimeTable(this.data.selectedSP.horaires_ouverture);
        break;
      case "Permanence":
        this.getServiceName(this.data.selectedSP.id_position);
        this.getResponseList(this.data.selectedSP.id_position);
        this.serviceOpeningHours = this.buildTimeTable(this.data.selectedSP.horaires_ouverture);
        break;
      default:
        this.getResponseList(this.data.selectedSP.id_structure);
        this.serviceOpeningHours = this.buildTimeTable(this.data.selectedSP.horaires_ouverture);
      ;
    }
  }

  // Normalisation des URLs pour garantir qu'elles sont valides et sécurisées
  private normalizeWebsiteUrl(rawUrl: string | null | undefined): string | null {
    if (!rawUrl) {
      return null;
    }

    let normalizedUrl = rawUrl.trim();
    if (!normalizedUrl) {
      return null;
    }

    normalizedUrl = normalizedUrl.replace(/^(https?):(?!\/\/)/i, '$1://');

    if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    try {
      const parsedUrl = new URL(normalizedUrl);
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        return null;
      }
      return parsedUrl.toString();
    } catch {
      return null;
    }
  }

  // Extraction et normalisation de toutes les URLs présentes dans le champ site_internet
  private extractWebsiteUrls(rawUrls: string | null | undefined): string[] {
    if (!rawUrls) {
      return [];
    }

    const chunks = rawUrls
      .split(/[\n\r\t,;|]+/)
      .flatMap((chunk) => chunk.trim().split(/\s+/))
      .flatMap((chunk) => chunk.split(/(?=https?:)/i))
      .map((chunk) => chunk.trim())
      .map((chunk) => chunk.replace(/[),.;]+$/, ''))
      .filter((chunk) => !!chunk);

    const normalizedUrls = chunks
      .map((chunk) => this.normalizeWebsiteUrl(chunk))
      .filter((url): url is string => !!url);

    return [...new Set(normalizedUrls)];
  }

  getServiceName(service_code: string) {
    this.apicartospService.getServiceImplantation(service_code).subscribe({
      next : (response: any) => {
        if(response) this.serviceName = response.nom;
      },
      error : (error: any) => { console.error('Error fetching service name:', error) }
    });
  }

  // id = id_position ou id_service en fonction du type de structure
  getResponseList(id: string) {
    this.responseList = null;
    if(this.typeStructure == "Itinérance") {
      this.apicartospService.getCircuitItinerants(id).subscribe({
        next : (response: Array<any>) => {
          if(response.length != 0) {
            this.responseList = [];
            response.forEach((entry) =>{
              this.responseList?.push({name: entry.adresse, openinghours : this.buildTimeTable(entry.horaires_ouverture)});
            })
          }  
        },
        error : (error: any) => { console.error('Error fetching circuit:', error) }
      });
    }else{
      this.apicartospService.getServicePermanences(id).subscribe({
        next : (response: Array<any>) => {
          if(response.length != 0) {
            this.responseList = [];
            response.forEach((entry) =>{
              this.responseList?.push({name: entry.nom, openinghours : this.buildTimeTable(entry.horaires_ouverture)});
            })
          } 
        },
        error : (error: any) => { console.error('Error fetching permanences list:', error) }
      });
    }
  }

  onButtonBackLocationClic(){
    this.rightpanelService.setContent(LocalisationComponent, this.data.map, "location");
  }

  fetchAccessibilityLink(dila_id: string) {
    if(!dila_id) {
      this.accessibilityLink = null;
      return;
    }

    dila_id = dila_id.trim();

    if(!dila_id.startsWith('DILA:')) {
      this.accessibilityLink = null;
      return;
    }

    dila_id = dila_id.replace(/^DILA:/, '').replace(/\/.*/, '');

    this.apicartospService.getSpAccessibilite(dila_id).subscribe({
      next : (response: any) => {
        if(response && response.count > 0 && response.results[0].web_url) {
          console.log('Accessibility link fetched:', response);
          this.accessibilityLink = response.results[0].web_url;
        } else {
          this.accessibilityLink =  null;
        }
      },
      error : (error: any) => { this.accessibilityLink =  null; console.error('Error fetching accessibility link:', error) }
    });
  }

  buildTimeTable(data: string){
    if(data){
      var openingHours = new opening_hours(data);
      var weekstable = openingHours.isWeekStable();
      if(weekstable) {
        const { monday, sunday } = this.getThisWeek();
        var days : Array<days>;
        days = [
          {day: "lundi", time: []},
          {day: "mardi", time: []},
          {day: "mercredi", time: []},
          {day: "jeudi", time: []},
          {day: "vendredi", time: []},
          {day: "samedi", time: []},
          {day: "dimanche", time: []},
        ];
        var list = openingHours.getOpenIntervals(monday, sunday);
        var daydata: string;
        var starthour;
        var endhour;
        var foundentry;
                
        list.forEach((entry : any) => {      
          daydata = new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(entry[0]);
          starthour = new Intl.DateTimeFormat("fr-FR", { timeStyle: "short", timeZone: "Europe/Paris" }).format(entry[0]);
          endhour = new Intl.DateTimeFormat("fr-FR", { timeStyle: "short", timeZone: "Europe/Paris" }).format(entry[1]);
          foundentry = days.find(({ day }) => day === daydata);
          foundentry?.time.push(starthour + " - " + endhour);
        });
        return {openingHours : days, weekstable: weekstable};
      } else {
        // itinerant date specifiques
        var dayspecific : any;
        dayspecific = {dates: [], time: []};
        var starthour;
        var endhour;
        var currentYear = new Date().getFullYear();
        var list = openingHours.getOpenIntervals(new Date("01 Jan" + currentYear), new Date("31 Dec" + currentYear));
        const options = {
          weekday: "long",
          month: "long",
          day: "numeric",
        };

        list.forEach((entry : any) => {  
          dayspecific.dates.push(entry[0].toLocaleDateString("fr-FR", options))
          starthour = new Intl.DateTimeFormat("fr-FR", { timeStyle: "short", timeZone: "Europe/Paris" }).format(entry[0]);
          endhour = new Intl.DateTimeFormat("fr-FR", { timeStyle: "short", timeZone: "Europe/Paris" }).format(entry[1]);
          dayspecific.time.push(starthour + " - " + endhour);
        });
        dayspecific.dates = [...new Set(dayspecific.dates)];
        dayspecific.time = [...new Set(dayspecific.time)];
        return {openingHours : dayspecific, weekstable: weekstable};
      }
    } 
    
    return null;
  }

  getMonday(d: Date) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    date.setDate(diff);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  getThisWeek() {
    const monday = this.getMonday(new Date());
    const sunday = new Date(monday);
    sunday.setDate(sunday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
    return { monday, sunday };
  }

  showTime(e: any): void {    
    var element = document.getElementById(e.target.value);
    if (element){
      if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "inline-block";
        if(e.target.getAttribute("name") == "datetime") {
          e.target.innerHTML = e.target.innerHTML.replace("Voir les dates ˅", "Voirs moins ˄");
        } else {
          e.target.innerHTML = e.target.innerHTML.replace("Voir les horaires ˅", "Voirs moins ˄");
        }
      } else {
        element.style.display = "none";
        if(e.target.getAttribute("name") == "datetime") {
          e.target.innerHTML = e.target.innerHTML.replace("Voirs moins ˄", "Voir les dates ˅");
        } else {
          e.target.innerHTML = e.target.innerHTML.replace("Voirs moins ˄", "Voir les horaires ˅");
        }
      }
    }
  }
}
