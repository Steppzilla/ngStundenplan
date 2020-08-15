import {
  Component,
  OnInit
} from '@angular/core';
import {
  LehrerService
} from '../../services/lehrer.service';
import {
  PlanmakerService
} from '../../services/planmaker.service';
import {
  Stundenplan
} from '../../interfaces/stundenplan';
import {
  Lehrer
} from '../../interfaces/lehrer';
import * as $ from 'jquery';//'../../../node_modules/jquery/dist/jquery.min.js';
import { Fach } from 'src/app/interfaces/fach.enum';

@Component({
  selector: 'app-wochenplan',
  templateUrl: './wochenplan.component.html',
  styleUrls: ['./wochenplan.component.scss']
})
export class WochenplanComponent implements OnInit {
  lehrer: Array < Lehrer > ;
  klassen: Array < number > ;
  aktuellerPlan: Stundenplan;  //stundenPlan:Array<Array<Array<[Lehrer,Fach,String]>>>;.lehrer und .klasse gibts noch

fachcolor(fach:Fach){
 

  return fach;
}


  planLehrer(lehrer) {
    this.planMakerService.planLehrer(lehrer);
  }
  planKlasse(klasse) {
    this.planMakerService.planKlasse(klasse);
  }
  stundenPlanDruck(){
    $('#printcontainer2').append($("app-wochenplan h1").clone());
    $('#printcontainer2').append($("app-wochenplan h2").clone());
    $('#printcontainer2').append($("#stundenPlan").clone());
    $('app-gesamtplan').hide();
    $('app-epochen-scheduler').hide();
    window.print();
    $('app-gesamtplan').show();
    $('app-epochen-scheduler').show();
    $('#printcontainer2').empty();

  }

  constructor(private lehrerService: LehrerService, private planMakerService: PlanmakerService, ) {
    this.lehrer = lehrerService.lehrer;
    this.klassen = lehrerService.klassen;

    planMakerService.aktuell$.subscribe((plan:Stundenplan) => {
      this.aktuellerPlan = plan;
      //    console.log(plan);
    });
    // this.aktuellerPlan=planMakerService.aktuell$;
    //this.planKlasse(1);
    // this.planLehrer(this.lehrerService.lehrer[13]);
  }

  ngOnInit(): void {

  }

}
