import { Component, OnInit, enableProdMode } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-epochen-scheduler',
  templateUrl: './epochen-scheduler.component.html',
  styleUrls: ['./epochen-scheduler.component.scss']
})
export class EpochenSchedulerComponent  {
 items;    //spiel-Items mit .tut und .user oder .name?
 tage; //test für string stundenplaner

  
 add(x,y){
   this.loginService.add(x,y);
 }

  constructor(private loginService:LoginService
     ) {
       this.loginService=loginService;
       this.items=loginService.items;
       this.tage=loginService.tage;

       //this.dinge=loginService.dinge;
       //console.log(this.dinge);
         
  }
}
