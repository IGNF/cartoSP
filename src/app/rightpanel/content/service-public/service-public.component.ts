import { Component, Input, OnInit  } from '@angular/core';

import { DsfrTabsModule, DsfrAccordionModule, DsfrButtonModule } from '@edugouvfr/ngx-dsfr';

import { RightpanelService } from '../../rightpanel.service';
import { LocalisationComponent } from '../../content/localisation/localisation.component';

interface days {
  day: string;
  eng: string;
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
  
  constructor(private rightpanelService: RightpanelService) {}

  @Input() data!: any;    
  selectedTabIndex = 0;
  tabsAriaLabel = "Onglets informations SP"
  fullViewport = true;
  tableTime? : Array<days>;

  ngOnInit() {
    if(this.data.selectedSP.service_horaires_ouverture.length > 4 && this.data.selectedSP.service_horaires_ouverture != null){
      this.tableTime = this.buildTimeTable(this.data.selectedSP.service_horaires_ouverture);
    }
  }

  onButtonBackLocationClic(){
    this.rightpanelService.setContent(LocalisationComponent, this.data.map, "location");
  }

  buildTimeTable(data: string){
    // resultat à compléter et retourner
    var days : Array<days>;
    days = [
      {day: "Lundi", eng: "Mo", time: []},
      {day: "Mardi", eng: "Tu", time: []},
      {day: "Mercredi", eng: "We", time: []},
      {day: "Jeudi", eng: "Th", time: []},
      {day: "Vendredi", eng: "Fr", time: []},
      {day: "Samedi", eng: "Sa", time: []},
      {day: "Dimanche", eng: "Su", time: []},
    ];

    // Liste des jours à comparer
    var listTime = data.split('; ');
    var dayString = "";
    var daysEng = [];
    var timePlage: Array<string> = [];
    var timestring = "";
    var foundIndex;
    var daysList = [];

    listTime.forEach((time) => {
      dayString = time.split(" ")[0];
      daysEng = dayString.split(",");
      timestring = time.split(" ")[1];
      timePlage = timestring.split(",");
      
      daysEng.forEach((dayEng) => {
        if(dayEng.includes("-")){
          daysList = this.splitDays(dayEng.split("-")[0], dayEng.split("-")[1]);
          daysList.forEach((entry) => {
            foundIndex = days.findIndex((days) => (days.eng == entry));
            days[foundIndex].time = timePlage;
          });
        }else{
          foundIndex = days.findIndex((days) => (days.eng == dayEng));
          days[foundIndex].time = timePlage;
        }
      });
    });

    return days;
  }

  splitDays(first: string, last: string) {
    var week = new Array('Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa');
  
    var firstIndex = week.indexOf(first);          //Find first day
    week = week.concat(week.splice(0,firstIndex)); //Shift array so that first day is index 0
    var lastIndex = week.indexOf(last);            //Find last day
    return week.slice(0,lastIndex+1);              //Cut from first day to last day
  }
}
