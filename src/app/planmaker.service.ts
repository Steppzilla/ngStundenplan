import { Injectable } from '@angular/core';
import { LehrerService } from './lehrer.service';
import { StorageService } from './storage.service';
import { Lehrer } from './lehrer';
import { Fach } from './fach.enum';
import { BehaviorSubject } from 'rxjs';
import{Stundenplan} from './stundenplan'

@Injectable({
  providedIn: 'root'
})
export class PlanmakerService {
  
  aktuell=new BehaviorSubject<Stundenplan>(null);
  aktuell$=this.aktuell.asObservable();


  montag;  //Stundenraster Montag
  dienstag;
  mittwoch;
  donnerstag;
  freitag;


  planLehrer(lehrer:Lehrer){
    let stundenPlan= new Stundenplan();
    stundenPlan.lehrer=lehrer;
    stundenPlan.stundenPlan=new Array(this.lehrerService.stundenanzahl).fill(null).map((r) => new Array(this.lehrerService.wochentage).fill(null).map((s)=>s=[]));
     stundenPlan.stundenPlan.forEach((reihe,r) => {
       reihe.forEach((cell,c) => {
         cell.splice(0,cell.length); //zelle im plan löschen
         switch(c){
           case 0: //herausfinden ob der lehrer Montag in irgendeiner klasse ist:
             this.montag[r].forEach((zelle,z) => {
               zelle.forEach(lehreritem => {
                 if(lehrer.kuerzel===lehreritem[0].kuerzel){
                   cell.push([lehreritem[0],lehreritem[1],`Kl. ${z+1}`]);
                 }
               });
             });
             break;
           case 1: 
           this.dienstag[r].forEach((zelle,z) => {
             zelle.forEach(lehreritem => {
               if(lehrer.kuerzel===lehreritem[0].kuerzel){
                 cell.push([lehreritem[0],lehreritem[1],`Kl. ${z+1}`]);
               }
             });   
           });
             break;
           case 2:
             this.mittwoch[r].forEach((zelle,z) => {
               zelle.forEach(lehreritem => {
                 if(lehrer.kuerzel===lehreritem[0].kuerzel){
                   cell.push([lehreritem[0],lehreritem[1],`Kl. ${z+1}`]);
                 }
               });
             });
             break;
            case 3:
             this.donnerstag[r].forEach((zelle,z) => {
               zelle.forEach(lehreritem => {
                 if(lehrer.kuerzel===lehreritem[0].kuerzel){
                   cell.push([lehreritem[0],lehreritem[1],`Kl. ${z+1}`]);
                 }
               }); 
             });
             break;
            case 4:
             this.freitag[r].forEach((zelle,z) => {
               zelle.forEach(lehreritem => {
                 if(lehrer.kuerzel===lehreritem[0].kuerzel){
                   cell.push([lehreritem[0],lehreritem[1],`Kl. ${z+1}`]);
                 }
               });
             });
             break;
         }
       });
     });
     this.aktuell.next(stundenPlan);
 
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
  constructor(private lehrerService:LehrerService, storageService: StorageService) { 
    
    storageService.loadAll();


    this.montag=storageService.stundenRasterAll[0];
    this.dienstag=storageService.stundenRasterAll[1];
    this.mittwoch=storageService.stundenRasterAll[2];
    this.donnerstag=storageService.stundenRasterAll[3];
    this.freitag=storageService.stundenRasterAll[4];


    storageService.load("Montag");


    this.planLehrer(lehrerService.lehrer[13]);

  }
}
