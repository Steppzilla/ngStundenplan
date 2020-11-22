import {
  Component,
  OnInit,
} from '@angular/core';
import {
  LehrerService
} from '../../services/lehrer.service';
import {
  Lehrjahr
} from '../../interfaces/lehrjahr.enum';
import {
  Lehrer
} from '../../interfaces/lehrer';
import {
  Fach
} from '../../interfaces/fach.enum';
import {
  LoginService
} from '../../services/login.service';

import {
  PlanmakerService
} from 'src/app/services/planmaker.service';
import * as $ from 'jquery'; //'../../../node_modules/jquery/dist/jquery.min.js';

@Component({
  selector: 'app-lehrerliste',
  templateUrl: './gesamtplan.component.html',
  styleUrls: ['./gesamtplan.component.scss']
})

export class LehrerlisteComponent implements OnInit {
  

  datumstring; //objekt mit strings[['3.1.', '4.5.' , ... ],[...],[...],[...]]
  aktuelleEpochenIndexe;

  lehrer; //Für buttons
  klassen; //für buttons
  lehrerKuerzel;
  klassenZuordnung;
  stundenRaster: Array < Array < Array < [Lehrer, Fach] >>> ; //aktuelles stundenraster
  schieneLage = {
    zeilenStarts: [6, 4, 8, 7],
    cellsMoMi: [8, 11],
    cellsDo: [8, 9]
  };
  testArray = [1, 2, 3];
  //Buttons:
  wochentag: string ;
  tagvorher: string;




  printGesamtplaene() {
    //printAdd
    //Tabelle
    $('#printcontainer').append("<h1>" + "Gesamtplan" + "</h1>");
    $('#printcontainer').append("<h2>" + "Montag" + "</h2>");
    //tabelle in print-container kopieren
    $('#printcontainer').append($(".gesamtStundenplan-Table").eq(0).clone());
    //tabellen-Cells im print-container leeren:
    var raster = this.lehrerservice.createEmptyStundenraster();
    raster.forEach((zeile, z) => {
      zeile.forEach((cell, c) => {
        $('#printcontainer .gesamtStundenplan-Table').children().first().children().eq(z + 1).children().eq(c + 1).children().first().children().remove(); //eqc++1 wählt td element aus, das kind ist der dropButton (div)
      });
    });

    //tabelle clonen
    $('#printcontainer').append($("#printcontainer .gesamtStundenplan-Table").eq(0).clone());
    //mit Montag befüllen
    this.planmaker.montag.forEach((zeile, z) => {
      zeile.forEach((cell, c) => {
        cell.forEach(lehrerFach => {
          //$('.gesamtStundenplan-Table').eq(1).children().first().children().eq(z+1).children().eq(c+1).children().first().children().remove();
          $('#printcontainer .gesamtStundenplan-Table').eq(1).children().first().children().eq(z + 1).children().eq(c + 1).children().first().append('<div class="lehrerFachBehaelter">  <p>' + lehrerFach[1] + '</p> <p >' + lehrerFach[0].kuerzel + '</p></div>');
        });
      });
    });

    $('#printcontainer').append("<h2>" + "Dienstag" + "</h2>");
    $('#printcontainer').append($(" #printcontainer .gesamtStundenplan-Table").eq(0).clone());
    this.planmaker.dienstag.forEach((zeile, z) => {
      zeile.forEach((cell, c) => {
        cell.forEach(lehrerFach => {
          // $('.gesamtStundenplan-Table').eq(2).children().first().children().eq(z+1).children().eq(c+1).children().first().children().remove();
          $('#printcontainer  .gesamtStundenplan-Table').eq(2).children().first().children().eq(z + 1).children().eq(c + 1).children().first().append('<div class="lehrerFachBehaelter"> <p>' + lehrerFach[1] + '</p> <p >' + lehrerFach[0].kuerzel + '</p> </div>');
        });
      });
    });

    $('#printcontainer').append("<h2>" + "Mittwoch" + "</h2>");
    $('#printcontainer').append($(" #printcontainer .gesamtStundenplan-Table").eq(0).clone());
    this.planmaker.mittwoch.forEach((zeile, z) => {
      zeile.forEach((cell, c) => {
        cell.forEach(lehrerFach => {
          //  $('.gesamtStundenplan-Table').eq(3).children().first().children().eq(z+1).children().eq(c+1).children().first().children().remove();
          $('#printcontainer  .gesamtStundenplan-Table').eq(3).children().first().children().eq(z + 1).children().eq(c + 1).children().first().append('<div class="lehrerFachBehaelter"> <p>' + lehrerFach[1] + '</p> <p >' + lehrerFach[0].kuerzel + '</p> </div>');
        });
      });
    });

    $('#printcontainer').append("<h2>" + "Donnerstag" + "</h2>");
    $('#printcontainer').append($("#printcontainer .gesamtStundenplan-Table").eq(0).clone());
    this.planmaker.donnerstag.forEach((zeile, z) => {
      zeile.forEach((cell, c) => {
        cell.forEach(lehrerFach => {
          // $('.gesamtStundenplan-Table').eq(4).children().first().children().eq(z+1).children().eq(c+1).children().first().children().remove();
          $('#printcontainer .gesamtStundenplan-Table').eq(4).children().first().children().eq(z + 1).children().eq(c + 1).children().first().append('<div class="lehrerFachBehaelter"> <p>' + lehrerFach[1] + '</p> <p >' + lehrerFach[0].kuerzel + '</p> </div>');
        });
      });
    });

    $('#printcontainer').append("<h2>" + "Freitag" + "</h2>");
    $('#printcontainer').append($("#printcontainer .gesamtStundenplan-Table").eq(0).clone());
    this.planmaker.freitag.forEach((zeile, z) => {
      zeile.forEach((cell, c) => {
        cell.forEach(lehrerFach => {
          // $('.gesamtStundenplan-Table').eq(5).children().first().children().eq(z+1).children().eq(c+1).children().first().children().remove();
          $('#printcontainer  .gesamtStundenplan-Table').eq(5).children().first().children().eq(z + 1).children().eq(c + 1).children().first().append('<div class="lehrerFachBehaelter"> <p>' + lehrerFach[1] + '</p> <p >' + lehrerFach[0].kuerzel + '</p> </div>');
        });
      });
    });
    //leere tabelle entfernen:
    $('#printcontainer .gesamtStundenplan-Table').eq(0).remove();

    $('app-wochenplan').hide();
    $('app-epochen-scheduler').hide();
    window.print();
    $('#printcontainer').empty();
    $('app-wochenplan').show();
    $('app-epochen-scheduler').show();
  }


  duplicates; //jeweils nur aktueller Wochentag. pro row neues Objekt.
  duplicateVert;

  generateDuplicates(plan: Array < Array < Array < [Lehrer, Fach] >>> ) {
    let vertical = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

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

  ueberschrift() {
    let x = this.wochentag.slice(1, this.wochentag.length);
    let z = this.wochentag.slice(0, 1);
    let ueberschrift = z.toUpperCase() + x;
    return ueberschrift;
  }

  //CLICK
  wochenTag(tag: string) { //Buttonclick
    //console.log(this.lehrerservice.stundenRaster.getValue());
    this.tagvorher = this.wochentag;
    this.wochentag = tag;
     this.loginService.load(this.wochentag); //aktuelles stundenraster wird überschrieben, pushen macht immer aktuellen tag
    //console.log(this.lehrerservice.stundenRaster.getValue());
    this.generateDuplicates(this.stundenRaster);
  }

  save() {
    this.loginService.saveAll();
  }

  //Gesamtplan:
  lehrerErmitteln(c) {
    c++;
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

  deleteAll(r, c) {
    this.stundenRaster[r][c] = [];
  }

  mittagsPause(r, c, e) {}

  //Epcohe und Schiene neu reinschreiben je nach Datum

  lehrerWahl(r: number, c: number, lehrerFach: [Lehrer, Fach], event) { //angeklicktes Fach wird reingeschrieben
    if (this.stundenRaster[r][c].includes(lehrerFach)) { // wenn wen man die selbe Lehrer-Fach-Kombination wählt, wird sie gelöscht.
      let index = this.stundenRaster[r][c].indexOf(lehrerFach);
      this.stundenRaster[r][c].splice(index, 1);
    } else if (event.shiftKey) { //mit Shift: Hinzufügen       
      this.stundenRaster[r][c].push(lehrerFach);
    } else {
      this.stundenRaster[r][c] = [lehrerFach]; // standard: Ersetzen des Lehrers durch neuen Lehrer.
    }
    //this.generateDuplicates(this.stundenRaster ) ;
  }

  farbwaehler(row, cell, lehrer, r, c) { //Einzelklick auf große Zelle, öffnet Menü, färbt kleine Elemente
    let previousHit: boolean;
    cell.forEach(([cellLehrer, fach]) => {
      if (cellLehrer.kuerzel === lehrer.kuerzel) {
        previousHit = true;
      }
    });
    if (previousHit === true) {
      return "gruen";
    }
    return this.doppelt(row, lehrer, r, c, 1);
  }

  doppelt(row, lehrer, z, c, dupli) { //hauptZellen-Methode, daueraktiv, doppelte rot
    var duplicates = dupli;
    row.forEach((cell, c) => {
      if (this.duplicates[z][c] === undefined) { //nur wenn keine nebeneinander-duplicates existieren
        cell.forEach(lehrerFach => {
          if ((lehrerFach !== null) && (lehrerFach[0].kuerzel === lehrer.kuerzel)) {
            ++duplicates;
          }
        });
      } //
    });

    if (duplicates > 1) {
      return "rot";
    }
    if (((z === 1) || (z == 2)) && (c > 7) && (c < 12)) {
      return "gruen";
    }
    if ((z === 0) && (c > 7) && (c < 12)) {
      return "gold";
    }
    if ((z === 0) && (c > 7) && (c < 12)) {
      return "gold";
    }

    //Bei schiene muss mo/di/mi/do/fr unterschieden werden:
    switch (this.wochentag) {
      case "montag":

        if (((z === this.schieneLage.zeilenStarts[0]) || (z === this.schieneLage.zeilenStarts[0] + 1)) && (c >= this.schieneLage.cellsMoMi[0]) && (c <= this.schieneLage.cellsMoMi[1])) {
          return "violet";
        }
        break;

      case "dienstag":
        if (((z === this.schieneLage.zeilenStarts[1]) || (z === this.schieneLage.zeilenStarts[1] + 1)) && (c >= this.schieneLage.cellsMoMi[0]) && (c <= this.schieneLage.cellsMoMi[1])) {
          return "violet";
        }
        break;
      case "mittwoch":
        if (((z === this.schieneLage.zeilenStarts[2]) || (z === this.schieneLage.zeilenStarts[2] + 1)) && (c >= this.schieneLage.cellsMoMi[0]) && (c <= this.schieneLage.cellsMoMi[1])) {
          return "violet";
        }
        break;
      case "donnerstag":
        if (((z === this.schieneLage.zeilenStarts[3]) || (z === this.schieneLage.zeilenStarts[3] + 1)) && (c >= this.schieneLage.cellsDo[0]) && (c <= this.schieneLage.cellsDo[1])) {
          return "violet";
        }
        break;
    }
    return "hellblau";
  }

  constructor(private planmaker: PlanmakerService, private lehrerservice: LehrerService, private loginService: LoginService) {
    //alle pläne werden geladen, montag wird stundenRaster im planmaker:
    //this.loginService.planPushen(this.wochentag); //Montag ist standard. im planmaker wird montag als Stundenraster gesetzt, im lehrerservice das Stundenraster behavioural
    //Stundenraster schreiben.
    lehrerservice.stundenRaster$.subscribe((stundenRaster) => this.stundenRaster = stundenRaster);
    //Epochen einfügen:
    //erst: indexe herausfinden , wo aktuellen Epochen stehen im epochenplan
    this.aktuelleEpochenIndexe = this.planmaker.epochenAktuell();

    //duplicates ermitteln:
    this.duplicates = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    this.duplicateVert = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
   
    
   
    let xu=this.planmaker.datum.getDay();
    switch(xu){
      case 0:
        this.wochentag='montag'; //eigentlich sonntag, aber sonntag ist keine schule...
        break;
      case 1:
        this.wochentag='montag';
        break;
      case 2:
        this.wochentag="dienstag";
        break;
      case 3:
        this.wochentag="mittwoch";
        break;
      case 4:
        this.wochentag="donnerstag";
        break;
      case 5:
        this.wochentag="freitag";
        break;
      case 6:
        this.wochentag="montag"; //Samstag is keine schule, also ist montag
        break;
    }
    this.tagvorher=this.wochentag; // AM WE ist das Montag, sonst aktueller Tag, siehe xu-Variable
    loginService.planPushen(this.wochentag); //HIER WIRD TATsächlich was geändert auf aktuellen tag, überschrift stimmt nicht
       
    console.log(this.wochentag);
  
    //
    this.lehrerKuerzel = lehrerservice.lehrer.map((r) => r.kuerzel);
    let klassenZuordnung = {};

    //Klassenzuordnungen der Lehrer auf Klassen undFächer:
    lehrerservice.lehrer.forEach((r) => {
      r.zuweisung.forEach((s) => {
        if (klassenZuordnung[s[0]] === undefined) {
          klassenZuordnung[s[0]] = new Array();
        }
        klassenZuordnung[s[0]].push([r, s[1]]);
      });
    });
    this.klassenZuordnung = klassenZuordnung;
    //  console.log(this.klassenZuordnung[9]);

    this.lehrer = lehrerservice.lehrer;
    this.klassen = lehrerservice.klassen;
    this.datumstring = planmaker.datumstring;
    console.log(lehrerservice.lehrer[0]);
    console.log(this.stundenRaster); //ist hier leer
  
   
    //this.generateDuplicates(this.stundenRaster);
   
  }


  ngOnInit(): void {
    
        

  }
}
