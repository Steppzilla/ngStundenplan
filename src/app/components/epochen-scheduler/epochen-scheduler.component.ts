import { Component, OnInit, enableProdMode } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-epochen-scheduler',
  templateUrl: './epochen-scheduler.component.html',
  styleUrls: ['./epochen-scheduler.component.scss']
})
export class EpochenSchedulerComponent  {
 items;    

  


  constructor(private loginService:LoginService
     ) {

       this.items=loginService.items;

         
  }
}
