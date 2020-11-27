import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LehrerlisteComponent } from 'src/app/components/gesamtplan/gesamtplan.component';
import { LehrerComponent } from 'src/app/components/lehrer/lehrer.component';
import { LoginService } from 'src/app/services/login.service';
import { PlanmakerService } from 'src/app/services/planmaker.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {



  redirect(zahl){
    if(zahl==1){
      this.router.navigate(['gesamtplan']); //gesamtplan, planer

    }
    else if(zahl==2){
      this.router.navigate(['raumplan']);
    }
    else if(zahl==3){
      this.router.navigate(['plaene']);
    }
    else if(zahl==4){
      this.router.navigate(['rechner']);
    }
  }
  constructor(private router:Router, public planmaker: PlanmakerService,login:LoginService) { 
let tag;
    let xu=this.planmaker.datum.getDay();
    switch(xu){
      case 0:
        tag='montag'; //eigentlich sonntag, aber sonntag ist keine schule...
        break;
      case 1:
        tag='montag';
        break;
      case 2:
        tag="dienstag";
        break;
      case 3:
        tag="mittwoch";
        break;
      case 4:
        tag="donnerstag";
        break;
      case 5:
        tag="freitag";
        break;
      case 6:
        tag="montag"; //Samstag is keine schule, also ist montag
        break;
    }
    login.planPushen(tag);

  }
  ngOnInit(): void {
  }

}
