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

@Component({
  selector: 'app-wochenplan',
  templateUrl: './wochenplan.component.html',
  styleUrls: ['./wochenplan.component.scss']
})
export class WochenplanComponent implements OnInit {
  lehrer: Array < Lehrer > ;
  klassen: Array < number > ;
  aktuellerPlan: Stundenplan;

  planLehrer(lehrer) {
    this.planMakerService.planLehrer(lehrer);
  }
  planKlasse(klasse) {
    this.planMakerService.planKlasse(klasse);
  }

  constructor(private lehrerService: LehrerService,private planMakerService: PlanmakerService,
    ) {
      this.lehrer = lehrerService.lehrer;
      this.klassen = lehrerService.klassen;

    planMakerService.aktuell$.subscribe((plan) => {
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