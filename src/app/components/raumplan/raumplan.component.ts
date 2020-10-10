import { Component, OnInit } from '@angular/core';
import { Stundenplan } from 'src/app/interfaces/stundenplan';
import { LehrerService } from 'src/app/services/lehrer.service';
import { LoginService } from 'src/app/services/login.service';
import { PlanmakerService } from 'src/app/services/planmaker.service';

@Component({
  selector: 'app-raumplan',
  templateUrl: './raumplan.component.html',
  styleUrls: ['./raumplan.component.scss']
})
export class RaumplanComponent implements OnInit {

//raumPlan:Stundenplan;




aktiveParelleleStundenErmitteln(r,c){ //fürn wochenplan erstmal in montag dienstag etc sind die einzelnen arrays drin.

let paralleleStunden;

switch(c){   // 5 wochentage
  case 0:paralleleStunden=this.loginservice.zeitgleicheWochen.montag[r];
  case 1:paralleleStunden=this.loginservice.zeitgleicheWochen.dienstag[r];
  case 2:paralleleStunden=this.loginservice.zeitgleicheWochen.mittwoch[r];
  case 3:paralleleStunden=this.loginservice.zeitgleicheWochen.donnerstag[r];
  case 4:paralleleStunden=this.loginservice.zeitgleicheWochen.freitag[r];
}
  return paralleleStunden;

}


lehrerWahl(string, z,c, item,$event, klasse){ //Das muss den raumplan updaten bei Wahld es lehrerfaches  //string z.B.: "Rhythmus"  //klasse gilt nur bei epoche, rhythmus + schiene. 

console.log("lehrerWahl");
  if(string=="Epoche"){
   this.loginservice.raumPlanComputer.epochenPlan[z][c]=[item,klasse];
  }else if(string=="Schiene"){
this.loginservice.raumPlanComputer.schienenPlan[z][c]=[item, klasse];
  }else if(string=="Rhythmus"){
this.loginservice.raumPlanComputer.rhythmusPlan[z][c]=[item, klasse];
  }else if(string=="Stundenplan"){
   this.loginservice.raumPlanComputer.stundenPlan[z][c]=item;
  }
  console.log(item + " soll in " + string + " geändert werden und wurde reingeschrieben: " );
  console.log(this.loginservice.raumPlanComputer.stundenPlan[0][0]);

}



stundenPlanDruck(){
 // $('#printcontainer2').append($("app-wochenplan h1").clone());
 // $('#printcontainer2').append($("app-wochenplan h2").clone());
 // $('#printcontainer2').append($("#stundenPlan").clone());
  //$('#printcontainer2').append($("app-wochenplan h3").eq(0).clone());
  //$('#printcontainer2').append($("#rhythmus").clone());
 // $('#printcontainer2').append($("app-wochenplan h3").eq(1).clone());
  //$('#printcontainer2').append($("#epochen").clone());
  //$('#printcontainer2').append($("app-wochenplan h3").eq(2).clone());
  //$('#printcontainer2').append($("#schiene").clone());
  //$('app-wochenplan').children().hide();
 // $('#printcontainer2').show();

  window.print();
 // $('app-wochenplan').children().show();

  //$('#printcontainer2').empty();

}





  constructor(planmaker: PlanmakerService, lehrerservice:LehrerService, public loginservice:LoginService) { 









  }

  ngOnInit(): void {
  }

}
