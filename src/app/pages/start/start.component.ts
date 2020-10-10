import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanmakerService } from 'src/app/services/planmaker.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {



  redirect(zahl){
    if(zahl==1){
      this.router.navigate(['lehrer']);
    }
    else if(zahl==2){
      this.router.navigate(['raumplan']);
    }
    else if(zahl==3){
      this.router.navigate(['plaene']);
    }
  }
  constructor(private router:Router, public planmaker: PlanmakerService) { }

  ngOnInit(): void {
  }

}
