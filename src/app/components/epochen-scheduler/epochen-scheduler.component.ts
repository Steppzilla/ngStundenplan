import {
  Component,
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
import { PlanmakerService } from 'src/app/services/planmaker.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Stundenplan } from 'src/app/interfaces/stundenplan';

@Component({
  selector: 'app-epochen-scheduler',
  templateUrl: './epochen-scheduler.component.html',
  styleUrls: ['./epochen-scheduler.component.scss']
})
export class EpochenSchedulerComponent {
  items;
  klassenZuordnung; //entspricht der aus dem gesamtplan

  aktuelleKlasse;

  datumstring; // siehe unten für Unterteilung, enthält jeweils Startdatum und ggf End-Wochentag als String der Woche

  epochenplanLeer: Array < Array < Array < [Lehrer, Fach] | null >>> ;
  epochenPlanAktuell: Array < Array < Array < [Lehrer, Fach] | null >>> ;
  epochenplan9: Array < Array < Array < [Lehrer, Fach] | null >>> ; // in 0 die Wochen bis Herbst, 1 bis Weihnachten, 3 bis oster, 4 bis sommer (lehreritem)
  epochenplan10: Array < Array < Array < [Lehrer, Fach] | null >>> ;
  epochenplan11: Array < Array < Array < [Lehrer, Fach] | null >>> ;
  epochenplan12: Array < Array < Array < [Lehrer, Fach] | null >>> ;

  schienenplan9;
  schienenplan10;
  schienenplan11;
  schienenplan12;
  schiene;

  duplicatesSchiene=[{}, {}, {}, {}];

  tag;
  //epochenplan13;
  ferien = [
    ['Sommer'],
    ['Herbst'],
    ['Winter'],
    ['Oster'],
    ['Sommer'],
    ['ferien']
  ];
  changeClass(n:number){ //Buttonklick, andere Klasse aufrufen/laden aus internen Variablen

    if(this.planmakerService["epochenplan"+n]!==undefined){
      this.epochenPlanAktuell=this.planmakerService["epochenplan"+n];
    }else{
      this.epochenPlanAktuell=this.datumstring.map(zeile => zeile.map(cell => []));
    }

    if(this.planmakerService["schiene" + n]!==undefined){
      this.schiene=this.planmakerService["schiene" + n];
    }else{
      this.schiene=this.datumstring.map(zeile => zeile.map(cell => []));
    }
    //neue Überschrift:
    this.aktuelleKlasse= n;
    //duplicates bestimmen:
    this.generateDuplicates("Epoche",this.epochenPlanAktuell);
    this.generateDuplicates("Schiene", this.schiene);
   
   // console.log(this.epochenPlanAktuell);
  }

  lehrerErmitteln() {
    let c = this.aktuelleKlasse;
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
  lehrerWahl(art: string, z: number, c: number, lehrerFach: [Lehrer, Fach], event, row) { //angeklicktes Fach wird reingeschrieben

     if ((event.shiftKey)&&(art==="Epoche") ){ //mit Shift: Hinzufügen 
      this.epochenPlanAktuell[z][c].push(lehrerFach);
    } else if(art==="Epoche"){
      this.epochenPlanAktuell[z][c] = [lehrerFach]; // standard: Ersetzen des Lehrers durch neuen Lehrer.
    }
    else if((art==="Schiene")&&(event.shiftKey)){
      this.schiene[z][c].push(lehrerFach);
    }else if(art==="Schiene"){
      this.schiene[z][c] = [lehrerFach];
    }
    this.generateDuplicates("Epoche", this.epochenPlanAktuell);
    this.generateDuplicates("Schiene", this.schiene);
    console.log(this.duplicates);
    //hier im lehrerservice oder planmaker die neuen pläne speichern? übergeben?
    //
    this.planmakerService["epochenplan" + this.aktuelleKlasse]=this.epochenPlanAktuell;//aktuelles im Service zwischenspeichern
    this.planmakerService["schiene" + this.aktuelleKlasse]=this.schiene;
  }

  duplicates = [{}, {}, {}, {}];

  generateDuplicates(art:string , plan:Array<Array<Array<[Lehrer,Fach]>>>) {
    plan.forEach((row, r) => {

      let duplicate = {};
      row.forEach((cell, c) => {
        let prevIndex = c - 1;
        if (this.equal(cell, row[prevIndex])) {
          if (duplicate[prevIndex] === undefined) {
            duplicate[prevIndex] = [prevIndex];
          }
          duplicate[prevIndex].push(c);
          duplicate[c] = duplicate[prevIndex];
        }
      });
      //Fallunterscheidung anders Speichern bei Epoche oder schiene
      if(art==="Epoche"){
      this.duplicates[r] = duplicate;
      }else{
        this.duplicatesSchiene[r]=duplicate;
      }
    });
  }


  equal(fl1: Array < [Lehrer, Fach] > , fl2: Array < [Lehrer, Fach] > ): boolean {
    let returnvalue = true;
    if ((fl1 === undefined) || (fl2 === undefined) || (fl1.length !== fl2.length) || (fl1.length === 0)) {
      returnvalue = false;
    } else {
      fl1.forEach(([lehrer, fach], lf) => {
        if ((lehrer.kuerzel !== fl2[lf][0].kuerzel) || (fach !== fl2[lf][1])) {
          returnvalue = false;
        }
      });
    }
    return returnvalue;
  }

  constructor(private planmakerService: PlanmakerService, private loginService: LoginService, lehrerservice: LehrerService) {
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
        'Do. 7.1. ',
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
this.aktuelleKlasse=9;
    this.epochenplanLeer = this.datumstring.map(zeile => zeile.map(cell => []));
    this.epochenplan9 = this.planmakerService.epochenplan9;
    this.epochenplan10 = this.planmakerService.epochenplan10;
    this.epochenplan11 = this.planmakerService.epochenplan11;
    this.epochenplan12 = this.planmakerService.epochenplan12;
   

  
    this.schienenplan9 = this.planmakerService.schiene9;
    this.schienenplan10 = this.planmakerService.schiene10;
    this.schienenplan11 = this.planmakerService.schiene11;
    this.schienenplan12 = this.planmakerService.schiene12;
    this.tag=loginService.tagAlsString;

    this.epochenPlanAktuell =this.planmakerService.epochenplan9;
    this.schiene=this.planmakerService.schiene9;


  }


}
