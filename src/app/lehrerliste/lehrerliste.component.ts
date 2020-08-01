import {
  Component,
  OnInit
} from '@angular/core';
import {
  LehrerService
} from '../services/lehrer.service';
import {
  Lehrjahr
} from '../interfaces/lehrjahr.enum';
import {
  Lehrer
} from '../interfaces/lehrer';
import {
  Fach
} from '../interfaces/fach.enum';
import{LoginService} from '../services/login.service';


@Component({
  selector: 'app-lehrerliste',
  templateUrl: './lehrerliste.component.html',
  styleUrls: ['./lehrerliste.component.scss']
})

export class LehrerlisteComponent implements OnInit {
  lehrer; //Für buttons
  klassen; //für buttons
  lehrerKuerzel;
  klassenZuordnung;
  stundenRaster:Array < Array < Array < [Lehrer, Fach] >>>;




 // wochenTag(tag){  //Buttonclick
 //   this.tagvorher=this.wochentag;
 //   this.wochentag=tag;
 //   this.storageService.save(this.tagvorher);
 //   this.storageService.load(this.wochentag);


       //nachm load neu färben:
 //  console.log(this.storageService.gefaerbteCells);

  //}

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

  deleteAll(r,c){
    this.stundenRaster[r][c] = [];
  }

  mittagsPause(r,c,e){
    //console.log(r + " (row) " + c +" (cell) " + e + "(event)")
  }

  lehrerWahl(r: number, c: number, lehrerFach: [Lehrer, Fach], event) { //angeklicktes Fach wird reingeschrieben
   // console.log(this.stundenRaster[r][c]);
    if (this.stundenRaster[r][c].includes(lehrerFach)) {      // wenn wen man die selbe Lehrer-Fach-Kombination wählt, wird sie gelöscht.
      let index = this.stundenRaster[r][c].indexOf(lehrerFach);
      this.stundenRaster[r][c].splice(index, 1);
    }
    else if (event.shiftKey) {                                  //mit Shift: Hinzufügen       
      this.stundenRaster[r][c].push(lehrerFach);
    } 
    else {
      this.stundenRaster[r][c] = [lehrerFach];   // standard: Ersetzen des Lehrers durch neuen Lehrer.
    }
  }

  farbwaehler(row, cell, lehrer) { //Einzelklick auf große Zelle, öffnet Menü, färbt kleine Elemente
    let previousHit: boolean;
    cell.forEach(([cellLehrer, fach]) => {
      if (cellLehrer.id === lehrer.id) {
        previousHit = true;
      }

    });
    if (previousHit === true) {
      return "gruen";
    }
    return this.doppelt(row, lehrer);
  }
  
  doppelt(row, lehrer) { //hauptZellen-Methode, daueraktiv, doppelte rot
   
   // console.log(row);
   // console.log([...row]);
    var duplicates = 0;
    row.forEach(element => {
      element.forEach(lehrerFach => {
       // console.log(`${lehrerFach[0].kuerzel } ${lehrer.kuerzel}` );

        if ((lehrerFach !== null) && (lehrerFach[0].id === lehrer.id)
          //&&(lehrerFach[1]!==Fach.mittag)
          ) {
          ++duplicates;
        }
      });
    });
   // console.log(duplicates);
    return duplicates > 1 ? "rot" : "hellblau"; 
  }

  //für Buttons;


  constructor( private lehrerservice: LehrerService,private loginService: LoginService
    //,    private storageService:StorageService//,private buttonComponent:ButtonComponent
    //,   private   planMaker:PlanMaker
  ) {
    //this.storageService.load("Montag");//Montag wird geladen

    
    lehrerservice.stundenRaster$.subscribe((stundenRaster)=>this.stundenRaster=stundenRaster);
    //this.stundenRaster = lehrerservice.stundenRaster.getValue();
    this.lehrerKuerzel = lehrerservice.lehrer.map((r) => r.kuerzel);
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


    this.lehrer=lehrerservice.lehrer;
    this.klassen=lehrerservice.klassen;
    this.loginService.load('montag');
  
  }

  ngOnInit(): void {

    

  }
}
