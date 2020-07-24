import { Component, OnInit, Input } from '@angular/core';
import { LehrerService } from '../lehrer.service';
import{PlanmakerService} from '../planmaker.service';
import { VirtualTimeScheduler } from 'rxjs';
import { Stundenplan } from '../stundenplan';

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


  constructor(private planMakerService:PlanmakerService, private lehrerService:LehrerService
    ) { 
      planMakerService.aktuell$.subscribe((bob)=>{
        this.stundenPlan=bob;
      });

  }

  ngOnInit(): void {
  }

}
