import { Component, OnInit } from '@angular/core';
import { LehrerService } from '../lehrer.service';
import{PlanmakerService} from '../planmaker.service';
import { LehrerlisteComponent } from '../lehrerliste/lehrerliste.component';
import { WochenplanComponent } from '../wochenplan/wochenplan.component';



@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  wochentag="Dienstag";
  lehrer;
  klassen;

  planLehrer(lehrer){
    this.planMakerService.planLehrer(lehrer);
  }

  planKlasse(klasse){
    this.planMakerService.planKlasse(klasse);
   }

 constructor( private lehrerService : LehrerService, private planMakerService:PlanmakerService
  ){
   this.lehrer=lehrerService.lehrer;
   this.klassen=lehrerService.klassen;

  // this.planMakerService.planKlasse(1);

 }



}
