import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ElementRef
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

import { PlanmakerService } from 'src/app/services/planmaker.service';
import * as $ from 'jquery';//'../../../node_modules/jquery/dist/jquery.min.js';


@Component({
  selector: 'app-lehrerliste',
  templateUrl: './gesamtplan.component.html',
  styleUrls: ['./gesamtplan.component.scss']
})

export class LehrerlisteComponent implements OnInit {
  lehrer; //Für buttons
  klassen; //für buttons
  lehrerKuerzel;
  klassenZuordnung;
  stundenRaster: Array < Array < Array < [Lehrer, Fach] >>> ; //aktuelles stundenraster
  schieneLage={zeilenStarts:[6,4,8,7],cellsMoMi:[8,11],
    cellsDo:[8,9]};
 

//Buttons:

wochentag :string= "montag";
tagvorher :string;

@ViewChild('Tabelle') someInput:ElementRef;

printGesamtplaene(){
  

//printAdd
//Tabelle

  
  $('#printcontainer').append("<h2>" + "Montag" +"</h2>");

 //tablelen-Cellen-div inhalte leeren:
var raster= this.lehrerservice.createEmptyStundenraster();
raster.forEach((zeile,z) => {
  zeile.forEach((cell,c) => {
  $('#table').children().first().children().eq(z+1).children().eq(c+1).children().first().children().remove();
});
});

$('#printcontainer').append($(".gesamtStundenplan-Table").eq(0).clone());
this.planmaker.montag.forEach((zeile,z) => {
  zeile.forEach((cell,c) => {
    cell.forEach(lehrerFach => {
      //$('.gesamtStundenplan-Table').eq(1).children().first().children().eq(z+1).children().eq(c+1).children().first().children().remove();
      $('.gesamtStundenplan-Table').eq(1).children().first().children().eq(z+1).children().eq(c+1).children().first().append('<div class="lehrerFachBehaelter">  <p>'+ lehrerFach[1] +'</p> <p >' + lehrerFach[0].kuerzel + '</p></div>' );
    });
  });
});

$('#printcontainer').append("<h2>" + "Dienstag" +"</h2>");
$('#printcontainer').append($(".gesamtStundenplan-Table").eq(0).clone());
this.planmaker.dienstag.forEach((zeile,z) => {
  zeile.forEach((cell,c) => {
    cell.forEach(lehrerFach => {
     // $('.gesamtStundenplan-Table').eq(2).children().first().children().eq(z+1).children().eq(c+1).children().first().children().remove();
      $('.gesamtStundenplan-Table').eq(2).children().first().children().eq(z+1).children().eq(c+1).children().first().append('<div class="lehrerFachBehaelter"> <p>' + lehrerFach[1] +'</p> <p >' + lehrerFach[0].kuerzel + '</p> </div>' );
    });
  });
});

$('#printcontainer').append("<h2>" + "Mittwoch" +"</h2>");
$('#printcontainer').append($(".gesamtStundenplan-Table").eq(0).clone());
this.planmaker.mittwoch.forEach((zeile,z) => {
  zeile.forEach((cell,c) => {
    cell.forEach(lehrerFach => {
    //  $('.gesamtStundenplan-Table').eq(3).children().first().children().eq(z+1).children().eq(c+1).children().first().children().remove();
      $('.gesamtStundenplan-Table').eq(3).children().first().children().eq(z+1).children().eq(c+1).children().first().append('<div class="lehrerFachBehaelter"> <p>' + lehrerFach[1] +'</p> <p >' + lehrerFach[0].kuerzel + '</p> </div>' );
    });
  });
});

$('#printcontainer').append("<h2>" + "Donnerstag" +"</h2>");
$('#printcontainer').append($(".gesamtStundenplan-Table").eq(0).clone());
this.planmaker.donnerstag.forEach((zeile,z) => {
  zeile.forEach((cell,c) => {
    cell.forEach(lehrerFach => {
     // $('.gesamtStundenplan-Table').eq(4).children().first().children().eq(z+1).children().eq(c+1).children().first().children().remove();
      $('.gesamtStundenplan-Table').eq(4).children().first().children().eq(z+1).children().eq(c+1).children().first().append('<div class="lehrerFachBehaelter"> <p>'+ lehrerFach[1] +'</p> <p >' + lehrerFach[0].kuerzel + '</p> </div>' );
    });
  });
});

$('#printcontainer').append("<h2>" + "Freitag" +"</h2>");
$('#printcontainer').append($(".gesamtStundenplan-Table").eq(0).clone());
this.planmaker.freitag.forEach((zeile,z) => {
  zeile.forEach((cell,c) => {
    cell.forEach(lehrerFach => {
     // $('.gesamtStundenplan-Table').eq(5).children().first().children().eq(z+1).children().eq(c+1).children().first().children().remove();
      $('.gesamtStundenplan-Table').eq(5).children().first().children().eq(z+1).children().eq(c+1).children().first().append('<div class="lehrerFachBehaelter"> <p>' + lehrerFach[1] +'</p> <p >' + lehrerFach[0].kuerzel + '</p> </div>' );
    });
  });
});

$('.gesamtStundenplan-Table').css('line-height','8.5pt');
$('.gesamtStundenplan-Table td div').css('overflow','hidden');
//$('.gesamtStundenplan-Table td div').css('width','40px');
$('.gesamtStundenplan-Table td div').css('font-size','8pt');
$('.gesamtStundenplan-Table .lehrerFachBehaelter p').css('margin-top','0pt');
$('.gesamtStundenplan-Table .lehrerFachBehaelter p').css('margin-bottom','0pt'); 
$('.gesamtStundenplan-Table .lehrerFachBehaelter :nth-child(2)').css('color','red'); //rot machen die kurzel
$('h2').css('margin-top','10pt');
$('h2').last().css('margin-top','40pt');
$(".gesamtStundenplan-Table").eq(0).hide();
$("h2").eq(0).hide();
  //$("#stundenPlan-Table")

  window.print();

}

ueberschrift(){
  let x=this.wochentag.slice(1,this.wochentag.length);
  let z=this.wochentag.slice(0,1);
  let ueberschrift=z.toUpperCase() + x;
  return ueberschrift;
}
wochenTag(tag:string) { //Buttonclick
  
  console.log("vorher");
  console.log(this.lehrerservice.stundenRaster.getValue());


  this.tagvorher = this.wochentag;
  this.wochentag = tag;
 

  //this.loginService.login();
  // this.storageService.save(this.tagvorher);
  //this.storageService.load(this.wochentag);
  //this.loginService.save(this.tagvorher);

  //this.loginService.saveIntern(this.tagvorher); //aktuelles stundenraster wird gespeichert in lokal (lehrerservice?)
  console.log("neues:");
  this.loginService.load(this.wochentag);//aktuelles stundenraster wird überschrieben
  console.log(this.lehrerservice.stundenRaster.getValue());
  //pläne der tage sind jeweils im planmakerservice gespeichert 
  //Logout
  //this.loginService.logout();

  //diesen Tag speichern im loginservice:
 // this.loginService.tagAlsString=this.wochentag;

}

save(){
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

  mittagsPause(r, c, e) {

  }

  lehrerWahl(r: number, c: number, lehrerFach: [Lehrer, Fach], event) { //angeklicktes Fach wird reingeschrieben

    if (this.stundenRaster[r][c].includes(lehrerFach)) { // wenn wen man die selbe Lehrer-Fach-Kombination wählt, wird sie gelöscht.
      let index = this.stundenRaster[r][c].indexOf(lehrerFach);
      this.stundenRaster[r][c].splice(index, 1);
    } else if (event.shiftKey) { //mit Shift: Hinzufügen       
      this.stundenRaster[r][c].push(lehrerFach);
    } else {
      this.stundenRaster[r][c] = [lehrerFach]; // standard: Ersetzen des Lehrers durch neuen Lehrer.
    }
    
  }

  farbwaehler(row, cell, lehrer, r, c) { //Einzelklick auf große Zelle, öffnet Menü, färbt kleine Elemente
    let previousHit: boolean;
    cell.forEach(([cellLehrer, fach]) => {
      if (cellLehrer.id === lehrer.id) {
        previousHit = true;
      }

    });
    if (previousHit === true) {
      return "gruen";
    }
    return this.doppelt(row, lehrer, r, c);
  }

  doppelt(row, lehrer, z, c) { //hauptZellen-Methode, daueraktiv, doppelte rot
    var duplicates = 0;
    row.forEach(element => {
      element.forEach(lehrerFach => {
        if ((lehrerFach !== null) && (lehrerFach[0].id === lehrer.id)
        ) {
          ++duplicates;
        }
      });
    });


    if(duplicates>1){
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
    switch(this.wochentag){
      case "montag": 
     
        if(((z=== this.schieneLage.zeilenStarts[0])||(z===this.schieneLage.zeilenStarts[0]+1))&&(c>=this.schieneLage.cellsMoMi[0])&&(c<=this.schieneLage.cellsMoMi[1])){
          return "violet";
        }
        break;
        
      case "dienstag":
        if(((z=== this.schieneLage.zeilenStarts[1])||(z===this.schieneLage.zeilenStarts[1]+1))&&(c>=this.schieneLage.cellsMoMi[0])&&(c<=this.schieneLage.cellsMoMi[1])){
          return "violet";
        }
        break;
      case "mittwoch":
        if(((z=== this.schieneLage.zeilenStarts[2])||(z===this.schieneLage.zeilenStarts[2]+1))&&(c>=this.schieneLage.cellsMoMi[0])&&(c<=this.schieneLage.cellsMoMi[1])){
          return "violet";
        }
        break;
      case "donnerstag":
        if(((z=== this.schieneLage.zeilenStarts[3])||(z===this.schieneLage.zeilenStarts[3]+1))&&(c>=this.schieneLage.cellsDo[0])&&(c<=this.schieneLage.cellsDo[1])){
          return "violet";
        }
        break;
    }
    return "hellblau";
  }

 
  constructor(private planmaker: PlanmakerService, private lehrerservice: LehrerService, private loginService: LoginService
    ) {
    lehrerservice.stundenRaster$.subscribe((stundenRaster) => this.stundenRaster = stundenRaster);
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

    this.lehrer = lehrerservice.lehrer;
    this.klassen = lehrerservice.klassen;
  
   // this.loginService.load('montag');
    this.loginService.planPushen(this.wochentag);
       //private storageService:StorageService,
  }
  

  ngOnInit(): void {
  }
}
