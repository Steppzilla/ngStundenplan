import {
  Component,
  OnInit,
  enableProdMode
} from '@angular/core';
import {
  LoginService
} from '../../services/login.service';
import {
  LehrerService
} from 'src/app/services/lehrer.service';
import {
  Lehrjahr
} from 'src/app/interfaces/lehrjahr.enum';
import {
  Lehrer
} from 'src/app/interfaces/lehrer';
import {
  Fach
} from 'src/app/interfaces/fach.enum';
import {
  merge
} from 'rxjs';
import { parseTemplate } from '@angular/compiler';

@Component({
  selector: 'app-epochen-scheduler',
  templateUrl: './epochen-scheduler.component.html',
  styleUrls: ['./epochen-scheduler.component.scss']
})
export class EpochenSchedulerComponent {
  items;
  klassenZuordnung; //entspricht der aus dem gesamtplan


  aktuelleKlasse = "9. Klasse";

  datumstring; // siehe unten für Unterteilung, enthält jeweils Startdatum und ggf End-Wochentag als String der Woche

  epochenplanLeer;
  epochenplan9; // in 0 die Wochen bis Herbst, 1 bis Weihnachten, 3 bis oster, 4 bis sommer (lehreritem)
  epochenplan10;
  epochenplan11;
  epochenplan12;
  //epochenplan13;
  ferien = [
    ['Sommer'],
    ['Herbst'],
    ['Winter'],
    ['Oster'],
    ['Sommer'],
    ['ferien']
  ];
  

  lehrerErmitteln() {
    let c = 9;
    switch (c) {
      case 1:
        return this.klassenZuordnung[Lehrjahr.eins];
      case 2:
        return this.klassenZuordnung[Lehrjahr.zwei];
      case 3:
        return this.klassenZuordnung[Lehrjahr.drei];
      case 4:
        return this.klassenZuordnung[Lehrjahr.vier];
      case 5:
        return this.klassenZuordnung[Lehrjahr.fuenf];
      case 6:
        return this.klassenZuordnung[Lehrjahr.sechs];
      case 7:
        return this.klassenZuordnung[Lehrjahr.sieben];
      case 8:
        return this.klassenZuordnung[Lehrjahr.acht];
      case 9:
        return this.klassenZuordnung[Lehrjahr.neun];
      case 10:
        return this.klassenZuordnung[Lehrjahr.zehn];
      case 11:
        return this.klassenZuordnung[Lehrjahr.elf];
      case 12:
        return this.klassenZuordnung[Lehrjahr.zwoelf];
      case 13:
        return this.klassenZuordnung[Lehrjahr.dreizehn];
      case 14:
        return this.klassenZuordnung[Lehrjahr.dreizehn];
    }
  }


  //row: Wenn gleiches angewählt wird wie in der zeilte davor, dann solln die gemerged werden....
  lehrerWahl(z: number, c: number, lehrerFach: [Lehrer, Fach], event, row) { //angeklicktes Fach wird reingeschrieben
    let aktuellerPlan = this.epochenplan9;
    let anzahlGleich=0;
    if (aktuellerPlan[z][c].includes(lehrerFach)) { // wenn wen man die selbe Lehrer-Fach-Kombination wählt, wird sie gelöscht.
      let index = aktuellerPlan[z][c].indexOf(lehrerFach);
      this.epochenplan9[z][c].splice(index, 1);
    } else if (event.shiftKey) { //mit Shift: Hinzufügen       
      this.epochenplan9[z][c].push(lehrerFach);
    } else {
      this.epochenplan9[z][c] = [lehrerFach]; // standard: Ersetzen des Lehrers durch neuen Lehrer.
      //Wenn fach vorhder oder nacher gleich ist dann:(NEU):
      if(this.epocheVorher===lehrerFach){
        this.color="violet"; //färbt alles sobald zwei gleich sind.
        this.andockItemsIndexes.push([z,c]);  //NEU WENN GLEICH IS 
        //nur wenn felder davor nicht auch gleich sind, darf nur echt das erste sein....
        if(this.epochenStartFelderMitLaenge===undefined){
          this.epochenStartFelderMitLaenge.push([z,c-1]);
          console.log(this.epochenStartFelderMitLaenge);
        }else{
          this.epochenStartFelderMitLaenge.forEach(element => {
            console.log(element);
            console.log(row);
            console.log(z );
            console.log(c-1);

          });

        }
      }else if(this.epocheNachher===lehrerFach){
        this.color="rot";
        this.andockItemsIndexes.push([z,c+1]); //NEU
         //nur wenn felder davor nicht auch gleich sind, darf nur echt das erste sein....
         this.epochenStartFelderMitLaenge.push([z,c]);
      }
    }
  }

color;
andockItemsIndexes=new Array();

  //dropdown färben
  epocheVorher;
  epocheNachher;

  gleicheFelder=[];
  epochenStartFelderMitLaenge=[]; //jeweils, r,c und wochenanzahl

  click(prevCell: [Lehrer, Fach], cellafter: [Lehrer, Fach]) { //Einzelklick auf große Zelle, check, ob zelle davor oder danach gleich ist.
    if (prevCell != null) {
      this.epocheVorher = prevCell[0];
    } else {
      this.epocheVorher = undefined;
    }
    if (cellafter != null) {
      this.epocheNachher = cellafter[0]; //sonst nistet der das irgendwie.. jetzt ist wieder lehrer/fach
    } else {
      this.epocheNachher = undefined;
    }
  }

  farbwaehler(row, i,lehrerfach) { //Einzelklick auf große Zelle, öffnet Menü, färbt kleine Elemente
    let c=i;
    if ((this.epocheVorher !== undefined) && (this.epocheVorher.length !== null)&&(this.epocheVorher === lehrerfach)) { //definiertes voriges feld und nicht länge null und GLEICH
        return "violet";
    } 
    if ((this.epocheNachher !== undefined) && (this.epocheNachher.length !== null)&&(this.epocheNachher === lehrerfach) ) { //feld danach definiert und nicht länge null und gleich
        return "violet";
    } 
    return "hellblau";
  }



  //Doppelte felder werden gefärbt (andockitems/gleiche felder werden in lehrerWahl ermittelt)
  hauptFaerber(z,i) { //doppelte in der reihe zählen und ggf. epochen mergen..., lehrerfach sind alle möglichen lehrer/fach-kombis
    let bool=false;
    if(this.andockItemsIndexes===undefined){}else{
      this.andockItemsIndexes.forEach((element) => {
       if((element[0]===z)&&(element[1]===i)){
        bool=true;
      }
    });
   return bool?"rot":"gruen";   //feld 2,3,4 werden versteckt, rest gruen
  }
}

breite(row,z,i){  //wie hauptfärber nur für breite des parents
  //let bool=false;
  let breite="normalsize";
  let index:number=i;
   if(this.andockItemsIndexes===undefined){}else{
     this.andockItemsIndexes.forEach((element) => {
       //wenn voriges element gleich ist, versteckt er das aktuelle i element, angeklicktes ist schon    
     if((element[0]===z)&&(element[1]===index)){               //bsp: element ist [1,3] und einst ist [1,4], dann muss [1,2] über 3 felder gehen. i ist aktueller index/Standort (hab ihn schon angeklickt)
      breite="";
     }
     
    /* else if((element[0]===z)&&(element[1]===index+1)){//wenn doppeltes element links vom angeklickten (das davor und davor aber nicht gleich)
       //verdoppeln
        breite="show verdoppeln";

       if((element[1]===index-1)){
           //verdreifachen wenn vom aktuellen index aus die nächsten beiden gleich sind...
         breite="show dreimal";
       
         if(element[1]===index-2){
           breite="show viermal";
           //vervierfachen

         }
       }
     }
     */

   });


   //wenn 2 folgende gleich sin
  // return bool?"gruen":"rot";
  // if(bool===true)

  return breite;   //feld 2,3,4 werden versteckt, rest gruen
 }
}
  




  constructor(private loginService: LoginService, lehrerservice: LehrerService) {


    this.items = loginService.items;

    let klassenZuordnung = {};

    lehrerservice.lehrer.forEach((r) => {
      r.zuweisung.forEach((s) => {
        if (klassenZuordnung[s[0]] === undefined) {
          klassenZuordnung[s[0]] = new Array();
        }
        klassenZuordnung[s[0]].push([r, s[1]]);
      });
    });
    this.klassenZuordnung = klassenZuordnung;
 
    this.datumstring = [
      [
        '10.8.',
        '17. 8.',
        '24.8.',
        '31.8.',
        '7.9.',
        '14.9.',
        '21.9.',
        '28.9. '
      ],

      [
        '19.10.',
        '26.10.',
        '2.11.',
        '9.11.',
        '16.11.',
        '23.11.',
        '30.11.',
        '7.12.',
        '14.12.'
      ],

      [
        '7.1. ',
        '11.1.',
        '18.1.',
        '25.1.',
        '1.2.',
        '8.2.',
        '15.2.',
        '22.2.',
        '1.3.',
        '8.3.',
        '15.3.',
        '22.3.',
        '29.3.-Mi.'
      ],
      [
        '19.4.',
        '26.4.',
        '3.5.',
        '10.5.-Mi',
        '17.5.',
        'Di. 25.5.',
        '31.5.',
        '7.6.',
        '14.6.-Fr.'
      ]
    ]

    this.epochenplanLeer = this.datumstring.map(zeile => zeile.map(cell => []));

    this.epochenplan9 = this.epochenplanLeer;
    this.epochenplan10 = this.epochenplanLeer;
    this.epochenplan11 = this.epochenplanLeer;
    this.epochenplan12 = this.epochenplanLeer;

  }


}
