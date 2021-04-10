import { AfterContentChecked, AfterContentInit, Component, OnInit } from '@angular/core';
import { PlanmakerService } from 'src/app/services/planmaker.service';

@Component({
  selector: 'app-fachverteilung',
  templateUrl: './fachverteilung.component.html',
  styleUrls: ['./fachverteilung.component.scss']
})
export class FachverteilungComponent implements AfterContentChecked {
  
  classes=[];

  constructor(private planMaker:PlanmakerService) { }

 
  ngAfterContentChecked(){
    [1,2,3,4,5,6,7,8,9,10,11,12,13].forEach(klasse => {
      this.classes[klasse-1]=this.planMaker.stundenPruefen(klasse);
     // console.log(this.classes);
    });
  }

}
