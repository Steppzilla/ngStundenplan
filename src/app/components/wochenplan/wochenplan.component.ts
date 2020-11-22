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
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-wochenplan',
  templateUrl: './wochenplan.component.html',
  styleUrls: ['./wochenplan.component.scss']
})
export class WochenplanComponent implements OnInit {

  vari=1; //1-4 Abschnitte zwiscihen den Ferien
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
    $('#printcontainer2').append($("app-wochenplan h3").eq(0).clone());
    $('#printcontainer2').append($("#rhythmus").clone());
    $('#printcontainer2').append($("app-wochenplan h3").eq(1).clone());
    $('#printcontainer2').append($("#epochen").clone());
    $('#printcontainer2').append($("app-wochenplan h3").eq(2).clone());
    $('#printcontainer2').append($("#schiene").clone());
    $('app-wochenplan').children().hide();
    $('#printcontainer2').show();
 //   $('app-gesamtplan').hide();
  //  $('app-epochen-scheduler').hide();
    window.print();
    $('app-wochenplan').children().show();
   // $('app-gesamtplan').show();
   // $('app-epochen-scheduler').show();
    $('#printcontainer2').empty();
  }

  constructor(private lehrerService: LehrerService, private planMakerService: PlanmakerService,private login:LoginService ) {
    let tag="donnerstag";
    let xu=this.planMakerService.datum.getDay();
    switch(xu){
      case 0:
        tag='montag'; //eigentlich sonntag, aber sonntag ist keine schule...
      case 1:
        tag='montag';
      case 2:
        tag="dienstag";
      case 3:
        tag="mittwoch";
      case 4:
        tag="donnerstag";
      case 5:
        tag="freitag";
      case 6:
        tag="montag"; //Samstag is keine schule, also sieht man schon montag
    }
  //  tag="donnerstag";
    this.login.planPushen(tag);
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
