import { Component, OnInit, Input } from '@angular/core';
import { LehrerService } from '../services/lehrer.service';
import{PlanmakerService} from '../services/planmaker.service';
import { VirtualTimeScheduler } from 'rxjs';
import { Stundenplan } from '../interfaces/stundenplan';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-wochenplan',
  templateUrl: './wochenplan.component.html',
  styleUrls: ['./wochenplan.component.scss']
})
export class WochenplanComponent implements OnInit {
  //stundenRaster;
  //@Input()
  //lehrerListe;
  stundenPlan:Stundenplan;
 // aktuell:String="Bob";
  //klasseAktiv:boolean=false;


  constructor(
    private planMakerService:PlanmakerService, 
    //loginService:LoginService, 
    private lehrerService:LehrerService
    ) { 
      console.log(lehrerService.alleStundenRaster);
     // this.stundenPlan
     // this.stundenPlan=lehrerService.alleStundenRaster[0];
    

      planMakerService.aktuell$.subscribe((plan)=>{
        this.stundenPlan=plan;
     });

  }

  ngOnInit(): void {
  }

}
