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
    [
      '10.8.',      '17.8.',      '24.8.',      '31.8.',      '7.9.',      '14.9.',      '21.9.',      '28.9.'
    ],

    [
      '19.10.',      '26.10.',      '2.11.',      '9.11.',      '16.11.',      '23.11.',      '30.11.',      '7.12.',      '14.12.'
    ],

    [
      '7.1.',      '11.1.',      '18.1.',      '25.1.',      '1.2.',      '8.2.',      '15.2.',      '22.2.',      '1.3.',      '8.3.',     '15.3.',      '22.3.',      '29.3.'
    ],
    [
      '19.4.',      '26.4.',      '3.5.',      '10.5.',      '17.5.',      '25.5.',      '31.5.',      '7.6.',      '14.6.'
    ]
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




  //Epochen und Schiene und rhythmischer Teil ersetzen aus epochenplänen in die stundenraster


  epochenAktuell() {
    let epochenSpeicherIndex = [];
    //console.log(this.datumstring);

    //Gesucht: aktuelles Datum soll nächst kleineres Datum ausm Epochenwochen-Datum heraussuchen. Wir zählen also Tage rückwärts bis es gleich ist:
    let heute = this.datum;

    for (let i = 0; i < 7; i++) {
      let tagesEinheit = 24 * 60 * 60 * 1000;
     // console.log(heute.getTime() - i * tagesEinheit);
 

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
     //   console.log("größer");
      //  console.log(heute.getTime() - i * tagesEinheit);
      //  console.log(epochenDatum.getTime());
      //}
      //epochendatum ist ein Datum des epochenplans in der foreach schleife
      if (heute.getTime() - i * tagesEinheit == epochenDatum.getTime()) { //wenn datum bis zu 6 tage zurück liegt
      //  console.log("gleich:");
      //  console.log("laufende Epoche:" + new Date(epochenDatum.getTime())); // dies hier hat 0 uhr als Anhaltspunkt
       // console.log("Heute--:" + new Date(heute.getTime()-i*tagesEinheit)); 
        epochenSpeicherIndex.push(b, d);
      }
      else { //wenn datum "mehr als" zu 6 tage zurück liegt
      epochenSpeicherIndex=[1, 0]; //geschummelt, das ist die ersten epoche nach den herbstferien... das soll eigentlich je nach ferien wechseln

      }

      });

      });

     
  

    }
   // console.log(epochenSpeicherIndex);

  
return epochenSpeicherIndex;

   

  }



  //Einzelpläne für Lehrer oder Klassen: (Räume fehlen?)
  //aktuell beschreiben:
  planLehrer(dieserlehrer: Lehrer) {


    let lehrerPlan = new Stundenplan();
lehrerPlan.datumString=this.datumstring;

    lehrerPlan.lehrer = dieserlehrer;

    lehrerPlan.stundenPlan = new Array(this.lehrerService.stundenanzahl).fill(null).map((r) => new Array(this.lehrerService.wochentage).fill(null).map((s) => s = []));

    this.montag.forEach((row, r) => {
      row.forEach((cell, c) => {
        cell.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            c++;
            lehrerPlan.stundenPlan[r][0].push([lehrer, fach, 'Kl.' + c]);
          }
        });
      });
    });
    this.dienstag.forEach((row, r) => {
      row.forEach((cell, c) => {
        cell.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            c++;
            lehrerPlan.stundenPlan[r][1].push([lehrer, fach, 'Kl.' + c]);
          }
        });
      });
    });
    this.mittwoch.forEach((row, r) => {
      row.forEach((cell, c) => {
        cell.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            c++;
            lehrerPlan.stundenPlan[r][2].push([lehrer, fach, 'Kl.' + c]);
          }
        });
      });
    });
    this.donnerstag.forEach((row, r) => {
      row.forEach((cell, c) => {
        cell.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            c++;
            lehrerPlan.stundenPlan[r][3].push([lehrer, fach, 'Kl.' + c]);
          }
        });
      });
    });
    this.freitag.forEach((row, r) => {
      row.forEach((cell, c) => {
        cell.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            c++;
            lehrerPlan.stundenPlan[r][4].push([lehrer, fach, 'Kl.' + c]); //4. zeile für freitag
          }
        });
      });
    });

    


    //Epoche:
   //Original-Definition vorm Füllen nat. ohne Klasse:  this.epochenplanLeer = this.datumstring.map(zeile => zeile.map(cell => []));

    lehrerPlan.epochenPlan = this.datumstring.map(zeile => zeile.map(cell => []));
    ///new Array(this.datumstring).fill(null).map((item,i)=> new Array(this.datumstring[i]).fill(null).map((s)=>s=[]));

    this.epochenplan9.forEach((row, r) => {
      row.forEach((week, w) => {
        week.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            lehrerPlan.epochenPlan[r][w].push([lehrer, fach, 'Kl. 9' ]);
          }
        });
      });
    });
    this.epochenplan10.forEach((row, r) => {
      row.forEach((week, w) => {
        week.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            lehrerPlan.epochenPlan[r][w].push([lehrer, fach, 'Kl. 10' ]);
          }
        });
      });
    });
    this.epochenplan11.forEach((row, r) => {
      row.forEach((week, w) => {
        week.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            lehrerPlan.epochenPlan[r][w].push([lehrer, fach, 'Kl. 11' ]);
          }
        });
      });
    });
    this.epochenplan12.forEach((row, r) => {
      row.forEach((week, w) => {
        week.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            lehrerPlan.epochenPlan[r][w].push([lehrer, fach, 'Kl. 12' ]);
          }
        });
      });
    });

    //Schiene
    lehrerPlan.schienenPlan = this.datumstring.map(zeile => zeile.map(cell => []));
    //new Array(this.datumstring).fill(null).map((item,i)=> new Array(this.datumstring[i]).fill(null).map((s)=>s=[]));

    this.schiene9.forEach((row, r) => {
      row.forEach((week, w) => {
        week.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            lehrerPlan.schienenPlan[r][w].push([lehrer, fach, 'Kl. 9' ]);
          }
        });
      });
    });
    this.schiene10.forEach((row, r) => {
      row.forEach((week, w) => {
        week.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            lehrerPlan.schienenPlan[r][w].push([lehrer, fach, 'Kl. 10' ]);
          }
        });
      });
    });
    this.schiene11.forEach((row, r) => {
      row.forEach((week, w) => {
        week.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            lehrerPlan.schienenPlan[r][w].push([lehrer, fach, 'Kl. 11' ]);
          }
        });
      });
    });
    this.schiene11.forEach((row, r) => {
      row.forEach((week, w) => {
        week.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            lehrerPlan.schienenPlan[r][w].push([lehrer, fach, 'Kl. 12' ]);
          }
        });
      });
    });

    //Rhythmus:

    lehrerPlan.rhythmusPlan = this.datumstring.map(zeile => zeile.map(cell => []));
   // new Array(this.datumstring).fill(null).map((item,i)=> new Array(this.datumstring[i]).fill(null).map((s)=>s=[]));

    this.rhythmus9.forEach((row, r) => {
      row.forEach((week, w) => {
        week.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            lehrerPlan.rhythmusPlan[r][w].push([lehrer, fach, 'Kl. 9' ]);
          }
        });
      });
    });
    this.rhythmus10.forEach((row, r) => {
      row.forEach((week, w) => {
        week.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            lehrerPlan.rhythmusPlan[r][w].push([lehrer, fach, 'Kl. 10' ]);
          }
        });
      });
    });
    this.rhythmus11.forEach((row, r) => {
      row.forEach((week, w) => {
        week.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            lehrerPlan.rhythmusPlan[r][w].push([lehrer, fach, 'Kl. 11' ]);
          }
        });
      });
    });
    this.rhythmus12.forEach((row, r) => {
      row.forEach((week, w) => {
        week.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            lehrerPlan.rhythmusPlan[r][w].push([lehrer, fach, 'Kl. 12' ]);
          }
        });
      });
    });  





    this.aktuell.next(lehrerPlan);
   // console.log(this.aktuell$);


  }



  planKlasse(klasse: number) {
    let klassenPlan = new Stundenplan();
    klassenPlan.klasse = klasse;
    klassenPlan.stundenPlan = new Array(this.lehrerService.stundenanzahl).fill(null).map((r) => new Array(this.lehrerService.wochentage).fill(null).map((s) => s = []));
    this.montag.forEach((row, r) => {
      row[klasse - 1].forEach(([lehrer, fach]: [Lehrer, Fach]) => {
        klassenPlan.stundenPlan[r][0].push([lehrer, fach, 'Kl.' + klasse]);
      });
    });
    this.dienstag.forEach((row, r) => {
      row[klasse - 1].forEach(([lehrer, fach]: [Lehrer, Fach]) => {
        klassenPlan.stundenPlan[r][1].push([lehrer, fach, 'Kl.' + klasse]);
      });
    });
    this.mittwoch.forEach((row, r) => {
      row[klasse - 1].forEach(([lehrer, fach]: [Lehrer, Fach]) => {
        klassenPlan.stundenPlan[r][2].push([lehrer, fach, 'Kl.' + klasse]);
      });
    });
    this.donnerstag.forEach((row, r) => {
      row[klasse - 1].forEach(([lehrer, fach]: [Lehrer, Fach]) => {
        klassenPlan.stundenPlan[r][3].push([lehrer, fach, 'Kl.' + klasse]);
      });
    });
    this.freitag.forEach((row, r) => {
      row[klasse - 1].forEach(([lehrer, fach]: [Lehrer, Fach]) => {
        klassenPlan.stundenPlan[r][4].push([lehrer, fach, 'Kl.' + klasse]);
      });
    });
    this.aktuell.next(klassenPlan);
  }







 
  //Statt Lehrerkürzel soll die Klasse dann angezeigt werden


  constructor(private lehrerService: LehrerService) {
    this.epochenAktuell(); //legt datum fest und welche epochen dann angezeigt werden (zwei indizes)

    let lehrerPlan = new Stundenplan();
    lehrerPlan.stundenPlan = new Array(this.lehrerService.stundenanzahl).fill(null).map((r) => new Array(this.lehrerService.wochentage).fill(null).map((s) => s = []));
    lehrerPlan.epochenPlan = this.datumstring.map(zeile => zeile.map(cell => []));
    lehrerPlan.rhythmusPlan = this.datumstring.map(zeile => zeile.map(cell => []));
    lehrerPlan.schienenPlan = this.datumstring.map(zeile => zeile.map(cell => []));
    lehrerPlan.lehrer = lehrerService.lehrer[0];
    lehrerPlan.datumString=this.datumstring;
    this.aktuell.next(lehrerPlan);

   // lehrerService.stundenRaster$.subscribe((stundenRaster) => this.stundenRaster = stundenRaster);
  }
}
