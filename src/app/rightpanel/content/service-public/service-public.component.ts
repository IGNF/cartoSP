import { Component, Input, OnInit  } from '@angular/core';

import { DsfrTabsModule, DsfrAccordionModule, DsfrButtonModule } from '@edugouvfr/ngx-dsfr';

import { RightpanelService } from '../../rightpanel.service';
import { ApicartospService } from './../../../services/apicartosp.service';
import { LocalisationComponent } from '../../content/localisation/localisation.component';

import opening_hours from 'opening_hours';

interface days {
  day: string;
  time: Array<String>;
}

@Component({
  selector: 'app-service-public',
  standalone: true,
  imports: [DsfrTabsModule, DsfrAccordionModule, DsfrButtonModule],
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
  responseList?: Array<any>|null;
  serviceName?: string|null;

  ngOnInit() {
    this.serviceName = null;
    this.responseList = null;
    this.typeStructure = this.data.selectedSP.type_structure;

    switch (this.typeStructure) {
      case "Implantation":
        this.getResponseList(this.data.selectedSP.service_id);
        this.serviceOpeningHours = this.buildTimeTable(this.data.selectedSP.service_horaires_ouverture);
        break;
      case "Permanence":
        this.getServiceName(this.data.selectedSP.service_id);
        this.getResponseList(this.data.selectedSP.service_id);
        this.serviceOpeningHours = this.buildTimeTable(this.data.selectedSP.permanence_horaires);
        break;
      default:
        this.getResponseList(this.data.selectedSP.service_id);
        this.serviceOpeningHours = this.buildTimeTable(this.data.selectedSP.service_horaires_ouverture);
      ;
    }
  }

  getServiceName(service_code: string) {
    this.apicartospService.getServiceImplantation(service_code).subscribe({
      next : (response: any) => {
        if(response) this.serviceName = response.service_nom;
      },
      error : (error: any) => { console.error('Error fetching service name:', error) }
    });
  }

  getResponseList(service_code: string) {
    if(this.typeStructure == "Itinérance") {
      this.apicartospService.getCircuitItinerants(service_code).subscribe({
        next : (response: Array<string>) => {
          if(response.length != 0) this.responseList = response;
        },
        error : (error: any) => { console.error('Error fetching circuit:', error) }
      });
    }else{
      this.apicartospService.getServicePermanences(service_code).subscribe({
        next : (response: Array<string>) => {
          if(response.length != 0) this.responseList = response;
        },
        error : (error: any) => { console.error('Error fetching permanences list:', error) }
      });
    }
  }

  onButtonBackLocationClic(){
    this.rightpanelService.setContent(LocalisationComponent, this.data.map, "location");
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
    var date = new Date(d)
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(d.setDate(diff))
  }

  getThisWeek() {
    const monday = this.getMonday(new Date())
    const sunday = new Date(monday)
    sunday.setDate(sunday.getDate() + 6)
    return { monday, sunday }
  }
}
