import { Injectable } from '@angular/core';
import { LehrerService } from './lehrer.service';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  gefaerbteCells=[];
  stundenRasterAll=[];
  loadAll(){
    this.stundenRasterAll.push(this.entStringen(localStorage.getItem("stundenRasterMontag")));
    this.stundenRasterAll.push(this.entStringen(localStorage.getItem("stundenRasterDienstag"))); 
    this.stundenRasterAll.push(this.entStringen(localStorage.getItem("stundenRasterMittwoch")));
    this.stundenRasterAll.push(this.entStringen(localStorage.getItem("stundenRasterDonnerstag")));
    this.stundenRasterAll.push(this.entStringen(localStorage.getItem("stundenRasterFreitag")));
  }
  entStringen(y:string){
    try{
    y=atob(y);
     let parsed=JSON.parse(y);
     return parsed;
    }catch(e){
      console.log(e);

      return this.lehrerservice.createEmptyStundenraster();
    }
  }
  save(tagvorher){
    let x=btoa(JSON.stringify(this.lehrerservice.stundenRaster.getValue()));
 //   console.log(" vorher (save): " + tagvorher + " aktuell (load): " + tag);
    switch(tagvorher){
      case "montag": 
          localStorage.setItem("stundenRasterMontag",x);
          break;
      case "dienstag":
        localStorage.setItem("stundenRasterDienstag",x); 
        break;
      case "mittwoch":
        localStorage.setItem("stundenRasterMittwoch",x);
        break;
      case "donnerstag":
        localStorage.setItem("stundenRasterDonnerstag",x);
        break;
      case "freitag":
        localStorage.setItem("stundenRasterFreitag",x);
        break;
    }
    
  }

  load(day){
    let y;
    switch(day){ 
      case "montag": 
        y=localStorage.getItem("stundenRasterMontag");
          break;
      case "dienstag":
        y =localStorage.getItem("stundenRasterDienstag"); 
        break;
      case "mittwoch":
        y=localStorage.getItem("stundenRasterMittwoch");
        break;
      case "donnerstag":
        y=localStorage.getItem("stundenRasterDonnerstag");
        break;
      case "freitag":
       y=localStorage.getItem("stundenRasterFreitag");
        break;
    }
    y=atob(y);
    try {
      let stundenRaster=JSON.parse(y);
 
   // console.log(stundenRaster);

    this.gefaerbteCells.splice(0,this.gefaerbteCells.length);
  //  this.lehrerservice.stundenRaster.next(stundenRaster);

    this.lehrerservice.stundenRaster.getValue().forEach((reihe, r) => {
  
      let kuerzelRow=[];    //für rote färbung
      reihe.forEach((zelle,z) => {
          var loadCell=stundenRaster[r][z];  //geladene Zelle/ aus dem Speicher
          zelle.splice(0, zelle.length); //aktuelle Zelle löschen

          loadCell.forEach((lehrerFach,l) => {       //geladene Zellen aufrufen, lehrerFach aus Speicher einzeln auslesen
            zelle.push(lehrerFach); //in aktuelle Zelle pushen

            kuerzelRow.forEach(([lehrers,zelle,element])=>{ //für färbung doppelte ermitteln, alle bisherigen lehrer durchgehen, 
              //lehrer-index ermitteln
              if(lehrerFach[0].kuerzel===lehrers.kuerzel){
                 this.gefaerbteCells.push([[z,l],[zelle, element],r,lehrerFach[0]]);
              }
            });
            kuerzelRow.push([lehrerFach[0],z,l]); //Färbung: Kürzelrow beschrieben jeweils mit dem jeweiligen lehrer der Zelle 
          });

      });
    }); 
    //this.lehrerservice.alleStundenRaster.push(stundenRaster)
    }catch(e){
      console.log(e); 
    }
  } //load ende
  

  constructor(private lehrerservice:LehrerService) { 

  }
}
