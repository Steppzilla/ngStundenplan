import {
  Injectable
} from '@angular/core';
import {
  LehrerService
} from './lehrer.service';
import {
  StorageService
} from './storage.service';
import {
  Lehrer
} from '../interfaces/lehrer';
import {
  Fach
} from '../interfaces/fach.enum';
import {
  BehaviorSubject
} from 'rxjs';
import {
  Stundenplan
} from '../interfaces/stundenplan'


@Injectable({
  providedIn: 'root'
})
export class PlanmakerService {

  aktuell = new BehaviorSubject < Stundenplan > (null); //von gewähltem lehrer oder klasse der plan
  aktuell$ = this.aktuell.asObservable();

  //Datum
  datum = new Date(); //aktuelles Datum und aktuelle Zeit
  aktuellerTag = this.datum.getDate();
  aktuellerMonat = this.datum.getMonth() + 1;
  aktuellesJahr = this.datum.getFullYear();

  //aktuelle Pläne:
  montag; //Stundenraster Montag
  dienstag;
  mittwoch;
  donnerstag;
  freitag;

  datumstring = [
    ['10.8.', '17.8.', '24.8.', '31.8.', '7.9.', '14.9.', '21.9.', '28.9.'],
    ['19.10.', '26.10.', '2.11.', '9.11.', '16.11.', '23.11.', '30.11.', '7.12.', '14.12.'],
    ['7.1.', '11.1.', '18.1.', '25.1.', '1.2.', '8.2.', '15.2.', '22.2.', '1.3.', '8.3.', '15.3.', '22.3.', '29.3.'],
    ['19.4.', '26.4.', '3.5.', '10.5.', '17.5.', '25.5.', '31.5.', '7.6.', '14.6.']
  ];

  rhythmus9;
  rhythmus10;
  rhythmus11;
  rhythmus12;

  epochenplan9;
  epochenplan10;
  epochenplan11;
  epochenplan12;

  schiene9;
  schiene10;
  schiene11;
  schiene12;


  duplicates;
  duplicateVert;

  //für gesamtplan:
  duplicatesRhythmus = [
    [],
    [],
    [],
    []
  ];
  duplicatesEpoche = [
    [],
    [],
    [],
    []
  ];
  duplicatesSchiene = [
    [],
    [],
    [],
    []
  ];

  //lehrer_klasse_duplicates; //für wochenplan Stundenplan Horitontal unnötig da mo di verschieden
  lehrer_klasse_duplicatesVert; //für wochenplan Stundenplan
  lehrer_klasse_duplicatesRhythmus = [    [],    [],    [],    []  ]; //für wochenplan
  lehrer_klasse_duplicatesEpoche = [    [],    [],    [],    []  ]; //für wochenplan
  lehrer_klasse_duplicatesSchiene = [    [],    [],    [],    []  ]; //für wochenplan

  generateDuplicatesESR(art: string, plan: Array < Array < Array < [Lehrer, Fach] >>> ) {

    plan.forEach((row, r) => {
      let duplicate = [];
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
      if (art === "Epoche") {
        this.duplicatesEpoche[r] = duplicate;
      } else if (art === "Schiene") {
        this.duplicatesSchiene[r] = duplicate;
      } else if (art === "Rhythmus") {
        this.duplicatesRhythmus[r] = duplicate;
      } else {
        console.log("Error. Es werden unkategorisierte Duplicates gesucht");
      }

    });
    //console.log("Rhythmus/Epoche/Schiene")
    //console.log(this.duplicatesRhythmus);
    //console.log(this.duplicatesEpoche);
    //console.log(this.duplicatesSchiene);
  }

  generateDuplicates(plan: Array < Array < Array < [Lehrer, Fach] >>> ) {
    let vertical = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    this.duplicates = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    this.duplicateVert = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    plan.forEach((row, r) => {
      let duplicate = {};
      row.forEach((cell, c) => {
        //Horizontale duplicates:
        let prevIndex = c - 1;
        if (this.equal(cell, row[prevIndex])) {
          if (duplicate[prevIndex] === undefined) {
            duplicate[prevIndex] = [prevIndex]; //Info einer einzelne reihe in duplicate
          }
          duplicate[prevIndex].push(c); //
          duplicate[c] = duplicate[prevIndex];
        }

        // verticale duplicates:
        let prevRow = r - 1;
        if (r === 0) {} else if (this.equal(cell, plan[prevRow][c])) { //wenn zelle darüber gleich ist.
          console.log("gleiche gefunden");

          if (vertical[prevRow][c] === undefined) {
            vertical[prevRow][c] = [prevRow]; //vorige reihe/zelle steht entsprechende reihe + celle
          }
          vertical[prevRow][c].push(r); //
          vertical[r][c] = vertical[prevRow][c];
        }
      });
      this.duplicates[r] = duplicate; //pro row macht er das Waagerecht
    });
    this.duplicateVert = vertical;
    console.log(this.duplicateVert);
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
 


  //Epochen und Schiene und rhythmischer Teil ersetzen aus epochenplänen in die stundenraster


  epochenAktuell() {
    let epochenSpeicherIndex = [1, 0];
    //Gesucht: aktuelles Datum soll nächst kleineres Datum ausm Epochenwochen-Datum heraussuchen. Wir zählen also Tage rückwärts bis es gleich ist:
    let heute = this.datum;
    for (let i = 0; i < 7; i++) {
      let tagesEinheit = 24 * 60 * 60 * 1000;
      this.datumstring.forEach((block, b) => {
        block.forEach((datums, d) => {
          let datumSplit = datums.split(".");
          //erste zwei Blöcke 2020er-Datum:
          let monat = parseInt(datumSplit[1]) - 1;
          let tag = parseInt(datumSplit[0]);
          let epochenDatum = new Date(2020, monat, tag);
          if ((b == 0) || (b == 1)) {} else {
            //ab Januarblock dann 2021:
            epochenDatum.setFullYear(2021);
          }
          // unter epochenDatum ist jetzt jeder Starttag einer Epochenwoche (teilweise auch dienstag o.Ä.) gespeichert als Datum.

          //korrektur der heutigen Zeit auf 0 stunden 0 minuten 0 sekunden: Sonst wird der Tag nie derselbe
          heute.setHours(0);
          heute.setMinutes(0);
          heute.setSeconds(0);
          heute.setMilliseconds(0);
          // if (heute.getTime() - i * tagesEinheit > epochenDatum.getTime()) {
          //}
          //epochendatum ist ein Datum des epochenplans in der foreach schleife
          if (heute.getTime() - (i-2) * tagesEinheit == epochenDatum.getTime()) { //wenn datum bis zu 6 tage zurück liegt, nein, 4 tage zurück oder 2 tage davor!
            epochenSpeicherIndex = [b, d];
           // console.log(epochenSpeicherIndex);
          } else { //wenn datum "mehr als" zu 6 tage zurück lieg
       //     console.log("ausnahmezustand");
          }
        });
      });
    }
    // console.log(epochenSpeicherIndex);

    return epochenSpeicherIndex;
  }

  deputateArray={Lehrer: "mrX", Wochenstunden: 0, Epochenstunden: 0, Rhythmusstunden: 0, SchienenstundenKurz:0, SchienenstundenLang:0 };
  //Einzelpläne für Lehrer oder Klassen: (Räume fehlen?)
  //aktuell beschreiben:
  planLehrer(dieserlehrer: Lehrer) {
    this.deputateArray.Lehrer=dieserlehrer.kuerzel;//deputat
    let lehrerPlan = new Stundenplan();
    lehrerPlan.datumString = this.datumstring;
    lehrerPlan.lehrer = dieserlehrer;
    lehrerPlan.stundenPlan = new Array(this.lehrerService.stundenanzahl).fill(null).map((r) => new Array(this.lehrerService.wochentage).fill(null).map((s) => s = []));
    let zaehler=0; //deputatszähler 
    ["montag", "dienstag", "mittwoch", "donnerstag", "freitag"].forEach((day, d) => {
      this[day].forEach((row, r) => {
        row.forEach((cell, c) => {
          cell.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
            if (lehrer.kuerzel === dieserlehrer.kuerzel) {
              c++;
              zaehler++;  //deputat
              lehrerPlan.stundenPlan[r][d].push([lehrer, fach, 'Kl.' + c]);
             
            }
            
            this.deputateArray.Wochenstunden=zaehler; //deputat
          });
        });
      });
    });
    
    zaehler=0; //deputat
    //Epoche:
    //Original-Definition vorm Füllen nat. ohne Klasse:  this.epochenplanLeer = this.datumstring.map(zeile => zeile.map(cell => []));
    lehrerPlan.epochenPlan = this.datumstring.map(zeile => zeile.map(cell => []));
    [9, 10, 11, 12].forEach(z => {
      this['epochenplan' + z].forEach((row, r) => {
        row.forEach((week, w) => {
          week.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
            if (lehrer.kuerzel === dieserlehrer.kuerzel) {
              zaehler++; //deputat
              lehrerPlan.epochenPlan[r][w].push([lehrer, fach, 'Kl. ' + z]);
            }
            this.deputateArray.Epochenstunden=zaehler; //deputat
          });
        });
      });
    });
    zaehler=0; //deputat
    let zaehler2=0;
    //Schiene
    lehrerPlan.schienenPlan = this.datumstring.map(zeile => zeile.map(cell => []));
    [9, 10, 11, 12].forEach(z => {
      this['schiene' + z].forEach((row, r) => {
        row.forEach((week, w) => {
          week.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
            if (lehrer.kuerzel === dieserlehrer.kuerzel) {
              lehrerPlan.schienenPlan[r][w].push([lehrer, fach, 'Kl. ' + z]);
              //unterscheiden ob 11., 12.(kurz) oder andere Klasse:
              if( (z==12)||(z==11)){
                zaehler++; //deputat
              }else{
                zaehler2++;//deputat
              }
            }
            this.deputateArray.SchienenstundenKurz=zaehler; //deputat
              this.deputateArray.SchienenstundenLang=zaehler2;//deputat
          });
        });
      });
    });
    zaehler=0; //deputat
    //Rhythmus:
    lehrerPlan.rhythmusPlan = this.datumstring.map(zeile => zeile.map(cell => []));
    // new Array(this.datumstring).fill(null).map((item,i)=> new Array(this.datumstring[i]).fill(null).map((s)=>s=[]));
    [9, 10, 11, 12].forEach(z => {
      this['rhythmus' + z].forEach((row, r) => {
        row.forEach((week, w) => {
          week.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
            if (lehrer.kuerzel === dieserlehrer.kuerzel) {
              lehrerPlan.rhythmusPlan[r][w].push([lehrer, fach, 'Kl. ' + z]);
              zaehler++; //deputat
              
            }
            this.deputateArray.Rhythmusstunden=zaehler; //deputat
          });
        });
      });
    });
    //korrektur wenn aktuelle Rhythmus/Epoche/Schiene:
    let index= this.epochenAktuell(); //returns EpochespeicherIndex
    if (lehrerPlan.rhythmusPlan[index[0]][index[1]][0]==undefined){
     // console.log("es läuft kein ryhtmischer teil");   
    }else{   //Wenn schiene läuft stunden abziehen von Wochenstunden
      this.deputateArray.Wochenstunden=this.deputateArray.Wochenstunden-5;
    }
    if (lehrerPlan.epochenPlan[index[0]][index[1]][0]==undefined){
     // console.log("es läuft keine Epoche");   
    }else{   
      this.deputateArray.Wochenstunden=this.deputateArray.Wochenstunden-10;
    }
    if (lehrerPlan.schienenPlan[index[0]][index[1]][0]==undefined){
     // console.log("es läuft keine Schiene");   
    }else{   //wenn 11 oder 12. Klasse müssen nur 6 Stunden abgezogen werden, sonst 8
      if((lehrerPlan.schienenPlan[index[0]][index[1]][0][2]=="Kl. 12")||(lehrerPlan.schienenPlan[index[0]][index[1]][0][2]=="Kl. 11")){
        this.deputateArray.Wochenstunden=this.deputateArray.Wochenstunden-6;
      }else{
        this.deputateArray.Wochenstunden=this.deputateArray.Wochenstunden-8;
      }
    }


    this.aktuell.next(lehrerPlan);
    this.duplicateWochenplan(lehrerPlan);
    this.duplicateWochenplan_ESR(lehrerPlan);

  }

  planKlasse(klasse: number) {
    let klassenPlan = new Stundenplan();
    klassenPlan.klasse = klasse;
    klassenPlan.stundenPlan = new Array(this.lehrerService.stundenanzahl).fill(null).map((r) => new Array(this.lehrerService.wochentage).fill(null).map((s) => s = []));
    ["montag", "dienstag", "mittwoch", "donnerstag", "freitag"].forEach((day, d) => {
      this[day].forEach((row, r) => {
        row[klasse - 1].forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          klassenPlan.stundenPlan[r][d].push([lehrer, fach, 'Kl.' + klasse]);
        });
      });
    });
    this.aktuell.next(klassenPlan);
    this.duplicateWochenplan(klassenPlan);
    this.duplicateWochenplan_ESR(klassenPlan);

  }

  //Duplicates für wochenplaner:
  equals(fl1: Array < [Lehrer, Fach , string] > , fl2: Array < [Lehrer, Fach ,string] > ): boolean {
    let returnvalue = true;
    //console.log(fl1 + " : " + fl2);
    if ((fl1 === undefined) || (fl2 === undefined) || (fl1.length !== fl2.length) || (fl1.length === 0)) {
      returnvalue = false;
    } else {
      fl1.forEach(([lehrer, fach, text], index) => {
        if ((lehrer.kuerzel !== fl2[index][0].kuerzel) || (fach !== fl2[index][1])||(text!==fl2[index][2])) {
          returnvalue = false;
        }
      });
    }
    return returnvalue;
  }


  duplicateWochenplan(plan: Stundenplan ) {   //Lehrerplan bzw klassenplan
    let vertical = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
   // this.lehrer_klasse_duplicates = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    this.lehrer_klasse_duplicatesVert = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    plan.stundenPlan.forEach((row, r) => {
      row.forEach((cell, c) => {
        //Horizontale duplicates brauch ich im stundenplan nicht (mo, di etc sind verschieden)   
        // verticale duplicates:
        let prevRow = r - 1;
        if (r === 0) {} else if 
        ( this.equals(cell, plan.stundenPlan[prevRow][c])) { //wenn zelle darüber gleich ist.
          console.log("gleiche gefunden");

          if (vertical[prevRow][c] === undefined) {
            vertical[prevRow][c] = [prevRow]; //vorige reihe/zelle steht entsprechende reihe + celle
          }
          vertical[prevRow][c].push(r); //
          vertical[r][c] = vertical[prevRow][c];
        }
      });
    });
    this.lehrer_klasse_duplicatesVert = vertical;
  }



 duplicateWochenplan_ESR(plan:Stundenplan ) {
//  console.log("wochenplan:");
//  console.log(plan);
  ["rhythmusPlan", "epochenPlan", "schienenPlan"].forEach(res=>{
    let speicherort;
    if(res=="rhythmusPlan"){speicherort="duplicatesRhythmus";}
    else if(res=="epochenPlan"){speicherort="duplicatesEpoche";}
    else if(res=="schienenPlan"){speicherort="duplicatesSchiene";}
    plan[res].forEach((row, r) => {
      let duplicate = [];
      row.forEach((cell, c) => {
        let prevIndex = c - 1;
        if (this.equals(cell, row[prevIndex])) {
          if (duplicate[prevIndex] === undefined) {
            duplicate[prevIndex] = [prevIndex];
          }
          duplicate[prevIndex].push(c);
          duplicate[c] = duplicate[prevIndex];
        }
      });
      this["lehrer_klasse_"+speicherort][r]=duplicate;
  });
    });
  //  console.log("wochenplan: Rhythmus/Epoche/Schiene");
  //  console.log(this.lehrer_klasse_duplicatesRhythmus);
  //  console.log(this.lehrer_klasse_duplicatesEpoche);
  //  console.log(this.lehrer_klasse_duplicatesSchiene);
  }


  constructor(private lehrerService: LehrerService) {
    this.epochenAktuell(); //legt datum fest und welche epochen dann angezeigt werden (zwei indizes)
    let lehrerPlan = new Stundenplan();
    lehrerPlan.stundenPlan = new Array(this.lehrerService.stundenanzahl).fill(null).map((r) => new Array(this.lehrerService.wochentage).fill(null).map((s) => s = []));
    lehrerPlan.epochenPlan = this.datumstring.map(zeile => zeile.map(cell => []));
    lehrerPlan.rhythmusPlan = this.datumstring.map(zeile => zeile.map(cell => []));
    lehrerPlan.schienenPlan = this.datumstring.map(zeile => zeile.map(cell => []));
    lehrerPlan.lehrer = lehrerService.lehrer[0];
    lehrerPlan.datumString = this.datumstring;
    this.aktuell.next(lehrerPlan);
    // lehrerService.stundenRaster$.subscribe((stundenRaster) => this.stundenRaster = stundenRaster);
  }
}
