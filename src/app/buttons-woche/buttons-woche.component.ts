import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { LoginService } from '../services/login.service';
import { PlanmakerService } from '../services/planmaker.service';
import { LehrerService } from '../services/lehrer.service';
import { initializeApp } from 'firebase';

@Component({
  selector: 'app-buttons-woche',
  templateUrl: './buttons-woche.component.html',
  styleUrls: ['./buttons-woche.component.scss']
})
export class ButtonsWocheComponent implements OnInit {
  wochentag="montag";
  tagvorher="montag";

  wochenTag(tag){  //Buttonclick
    this.tagvorher=this.wochentag;
    this.wochentag=tag;

    this.loginService.login();
   // this.storageService.save(this.tagvorher);
    //this.storageService.load(this.wochentag);

    //this.loginService.save(this.tagvorher);
    
    this.loginService.load(this.wochentag);
  
   /* console.log("länge im Wochenplan: " +this.lehrerService.alleStundenRaster.length);
    console.log("jo, gepushed");
 
    console.log("sppäter: " ); //geht
     console.log(this.loginService.stundenStrings.length);
     console.log(this.loginService.stundenStrings);
 
    //
 
    console.log("alleraster:");
    console.log(this.lehrerService.alleStundenRaster);
       console.log("raster1");
    console.log(this.lehrerService.alleStundenRaster.length);
    */
 



   //Logout


   this.loginService.logout();

 

  }



  constructor(
    
    //private storageService:StorageService,
    private loginService:LoginService,  private lehrerService: LehrerService, private planMakerService: PlanmakerService) { 
      this.loginService.planPushen();
      this.wochenTag('montag');


         //Array erstellen:
  



  
    //console.log("wo bin ich");
    //console.log( storageService);
    console.log("Konstruktor WochenPlan");
  }
    
  ngOnInit(): void {
    
  }

}
/*

this.montag=lehrerService.alleStundenRaster[0];
this.dienstag=lehrerService.alleStundenRaster[1];
this.mittwoch=lehrerService.alleStundenRaster[2];
this.donnerstag=lehrerService.alleStundenRaster[3];
this.freitag=lehrerService.alleStundenRaster[4];

  console.log("donnerstag");
   console.log(this.donnerstag);  //undefiniert

   */