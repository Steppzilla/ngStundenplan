import { Injectable } from '@angular/core';
import { LehrerService } from './lehrer.service';
import { StorageService } from './storage.service';
import { Lehrer } from '../lehrer';
import { Fach } from '../fach.enum';
import { BehaviorSubject } from 'rxjs';
import{Stundenplan} from '../interfaces/stundenplan'
import { LoginService } from './login.service';
import { Plan } from '../interfaces/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanmakerService {
  
  aktuell=new BehaviorSubject<Stundenplan>(null);
  aktuell$=this.aktuell.asObservable();

//aktuelle Pläne:
  montag;  //Stundenraster Montag
  dienstag;
  mittwoch;
  donnerstag;
  freitag;

  planLehrer(dieserlehrer:Lehrer){
    console.log(this.montag);
    let lehrerPlan= new Stundenplan;
    lehrerPlan.stundenPlan=new Array(this.lehrerService.stundenanzahl).fill(null).map((r) => new Array(this.lehrerService.wochentage).fill(null).map((s)=>s=[]));
    this.montag.forEach((row,r) => {
      row.forEach((cell ,c) => {
        cell.forEach(([lehrer,fach]) => {
          if(lehrer.kuerzel===dieserlehrer.kuerzel){
            lehrerPlan.stundenPlan[r][0].push([lehrer,fach,'Kl. ' + c]);
          }
        });
      });
    });

    this.aktuell.next(lehrerPlan);
  }

 
   planKlasse(klasse:number){
    let stundenPlan= new Stundenplan();
    stundenPlan.klasse=klasse;
    stundenPlan.stundenPlan=new Array(this.lehrerService.stundenanzahl).fill(null).map((r) => new Array(this.lehrerService.wochentage).fill(null).map((s)=>s=[]));
     klasse--;
    //console.log(klasse);
     stundenPlan.stundenPlan.forEach((reihe,r) => {
       reihe.forEach((cell,c) => {
         cell.splice(0,cell.length);
         switch(c){
           case 0:
             this.montag[r].forEach((zelle,z) => {
               if(z===klasse){ //nur die erste Zelle bei Klasse 1, also index 0
               zelle.forEach(lehrerItem => {
                 cell.push([lehrerItem[0],lehrerItem[1],""]);
               });
             }
             });
             break;
           case 1: 
           this.dienstag[r].forEach((zelle,z) => {
             if(z===klasse){ //nur die erste Zelle
             zelle.forEach(lehrerItem => {
               cell.push([lehrerItem[0],lehrerItem[1],""]);
             });
           }
           });
             break;
           case 2:
             this.mittwoch[r].forEach((zelle,z) => {
               if(z===klasse){ //nur die erste Zelle
               zelle.forEach(lehrerItem => {
                 cell.push([lehrerItem[0],lehrerItem[1],""]);
               });
             }
             });
             break;
            case 3:
             this.donnerstag[r].forEach((zelle,z) => {
               if(z===klasse){ //nur die erste Zelle
               zelle.forEach(lehrerItem => {
                 cell.push([lehrerItem[0],lehrerItem[1],""]);
               });
             }
             });
             break;
            case 4:
             this.freitag[r].forEach((zelle,z) => {
               if(z===klasse){ //nur die erste Zelle
               zelle.forEach(lehrerItem => {
                 cell.push([lehrerItem[0],lehrerItem[1],""]);
               });
             }
             });
             break;
         }
       });
     });
     this.aktuell.next(stundenPlan);

   }

  constructor(private lehrerService:LehrerService) { 
    //this.planLehrer(lehrerService.lehrer[13]);
  }
}