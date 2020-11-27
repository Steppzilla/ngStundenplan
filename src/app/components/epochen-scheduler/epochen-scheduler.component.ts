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


@Component({
  selector: 'app-epochen-scheduler',
  templateUrl: './epochen-scheduler.component.html',
  styleUrls: ['./epochen-scheduler.component.scss']
})
export class EpochenSchedulerComponent {
  items;
  klassenZuordnung; //entspricht der aus dem gesamtplan
  aktuelleKlasse; //zahl zwischen 9-12 (epochenklasse)
  datumstring; // siehe unten für Unterteilung, enthält jeweils Startdatum und ggf End-Wochentag als String der Woche

  epochenplanLeer: Array < Array < Array < [Lehrer, Fach] | null >>> ;

    tag; //montag oder dienstag , Wochentag

  aktuelleEpochenIndexe; //zwei zahlen z.b.[i,x] wobei i von 0-4 geht und dann jeweils die startdaten der wochen darunter gespeichert sind (indexe vom datumstring)

  //epochenplan13;
  ferien = [    ['sun.svg'],    ['leaf.svg'],    ['snowflake.svg'],    ['spriessen.svg'],    ['sun.svg'],    ['ferien']
  ];
  changeClass(n:number){ //Buttonklick,  Klasse 9-12 wählen
        //neue Überschrift:
    this.aktuelleKlasse= n;
    //duplicates bestimmen:
    this.planmakerS.generateDuplicatesESR("Rhythmus", this.planmakerS["rhythmus"+this.aktuelleKlasse]);
    this.planmakerS.generateDuplicatesESR("Epoche",this.planmakerS["epochenplan"+this.aktuelleKlasse]);
    this.planmakerS.generateDuplicatesESR("Schiene", this.planmakerS["schiene"+this.aktuelleKlasse]);
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
  //this.planmakerS["epochenplan"+n]);
 // this.planmakerS["schiene"+n]);
  // this.planmakerS["rhythmus"+n]);
  //row: Wenn gleiches angewählt wird wie in der zeilte davor, dann solln die gemerged werden....
  lehrerWahl(art: string, z: number, c: number, lehrerFach: [Lehrer, Fach], event, row) { //angeklicktes Fach wird reingeschrieben
     if ((event.shiftKey)&&(art==="Epoche") ){ //mit Shift: Hinzufügen 
      this.planmakerS["epochenplan"+this.aktuelleKlasse][z][c].push(lehrerFach);
    } else if(art==="Epoche"){
      this.planmakerS["epochenplan"+this.aktuelleKlasse][z][c]= [lehrerFach]; // standard: Ersetzen des Lehrers durch neuen Lehrer.
    }
    else if((art==="Schiene")&&(event.shiftKey)){
      this.planmakerS["schiene"+this.aktuelleKlasse][z][c].push(lehrerFach);
    }else if(art==="Schiene"){
      this.planmakerS["schiene"+this.aktuelleKlasse][z][c] = [lehrerFach];
    }
    else if((art==="Rhythmus")&&(event.shiftKey)){
      this.planmakerS["rhythmus"+this.aktuelleKlasse][z][c].push(lehrerFach);
    }else if(art==="Rhythmus"){
      this.planmakerS["rhythmus"+this.aktuelleKlasse][z][c] = [lehrerFach];
    }
    this.planmakerS.generateDuplicatesESR("Epoche", this.planmakerS["epochenplan"+this.aktuelleKlasse]);
    this.planmakerS.generateDuplicatesESR("Schiene", this.planmakerS["schiene"+this.aktuelleKlasse]);
    this.planmakerS.generateDuplicatesESR("Rhythmus", this.planmakerS["rhythmus"+this.aktuelleKlasse]);
    //hier im lehrerservice oder planmaker die neuen pläne speichern? übergeben?
    this.planmakerS["epochenplan" + this.aktuelleKlasse]=this.planmakerS["epochenplan"+this.aktuelleKlasse];//aktuelles im Service zwischenspeichern
    this.planmakerS["schiene" + this.aktuelleKlasse]=this.planmakerS["schiene"+this.aktuelleKlasse];
    this.planmakerS["rhythmus" + this.aktuelleKlasse]= this.planmakerS["rhythmus"+this.aktuelleKlasse];
  }

 

  constructor(public planmakerS: PlanmakerService, private loginService: LoginService, lehrerservice: LehrerService) {
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
    this.datumstring =this.planmakerS.datumstring;
    this.aktuelleKlasse=9;

    this.epochenplanLeer = this.datumstring.map(zeile => zeile.map(cell => []));

    this.tag=loginService.tagAlsString;



    this.aktuelleEpochenIndexe=this.planmakerS.epochenAktuell();

  }

  


}
