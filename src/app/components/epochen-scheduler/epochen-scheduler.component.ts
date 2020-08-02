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
import { Lehrer } from 'src/app/interfaces/lehrer';
import { Fach } from 'src/app/interfaces/fach.enum';

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
  ferien=[['Sommer'],['Herbst'], ['Winter'],['Oster'],['Sommer'], ['ferien']];

  lehrerErmitteln() {
    let c=9;
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


  lehrerWahl(r: number, c: number, lehrerFach: [Lehrer, Fach], event) { //angeklicktes Fach wird reingeschrieben
    // console.log(this.stundenRaster[r][c]);
    let aktuellerPlan=this.epochenplan9;
    let aktuelleReihe=0;
     if (aktuellerPlan[aktuelleReihe][c].includes(lehrerFach)) {      // wenn wen man die selbe Lehrer-Fach-Kombination wählt, wird sie gelöscht.
       let index = aktuellerPlan[aktuelleReihe][c].indexOf(lehrerFach);
       this.epochenplan9[aktuelleReihe][c].splice(index, 1);
     }
     else if (event.shiftKey) {                                  //mit Shift: Hinzufügen       
       this.epochenplan9[aktuelleReihe][c].push(lehrerFach);
     } 
     else {
       this.epochenplan9[aktuelleReihe][c] = [lehrerFach];   // standard: Ersetzen des Lehrers durch neuen Lehrer.
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
    // console.log(this.klassenZuordnung);

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

    this.epochenplanLeer = new Array(this.datumstring[0].map((r) => r = []));
    this.epochenplan9 = this.epochenplanLeer;
    this.epochenplan10 = this.epochenplanLeer;
    this.epochenplan11 = this.epochenplanLeer;
    this.epochenplan12 = this.epochenplanLeer;
    console.log(this.epochenplan9);
    console.log(this.datumstring[0]);

  }


}
