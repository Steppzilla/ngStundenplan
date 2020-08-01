import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { LoginService } from '../login.service';
import { PlanmakerService } from '../planmaker.service';
import { LehrerService } from '../lehrer.service';
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

       //nachm load neu färben:
   //console.log(this.storageService.gefaerbteCells);

   //Array erstellen:
   this.loginService.planPushen('montag');
   this.loginService.planPushen('dienstag');
   this.loginService.planPushen('mittwoch');
   this.loginService.planPushen('donnerstag');
   this.loginService.planPushen('freitag');  

   
   
   
   console.log("länge: " +this.lehrerService.alleStundenRaster.length);
   console.log("jo, gepushed");

   console.log("sppäter: " ); //geht
    console.log(this.loginService.stundenStrings.length);
    console.log(this.loginService.stundenStrings);

   //montag, dienstag etc in den planmakerService speichern:



   console.log("alleraster:");
   console.log(this.lehrerService.alleStundenRaster);
      console.log("raster1");
   console.log(this.lehrerService.alleStundenRaster.length);




   //Logout


   this.loginService.logout();

 

  }



  constructor(
    //private storageService:StorageService,
    private loginService:LoginService, private planMakerService: PlanmakerService, private lehrerService: LehrerService) { 
     
    this.wochenTag('montag');//Montag wird geladen
    //console.log("wo bin ich");
    //console.log( storageService);
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