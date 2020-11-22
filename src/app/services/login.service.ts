import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import {
  AngularFireAuth
} from '@angular/fire/auth';
import {
  AngularFirestore
} from '@angular/fire/firestore';

import {
  Plan
} from '../interfaces/plan';
import {
  LehrerService
} from './lehrer.service';
import {
  Lehrer
} from '../interfaces/lehrer';
import {
  Fach
} from '../interfaces/fach.enum';
import {
  PlanmakerService
} from './planmaker.service';
import {
  LehrerlisteComponent
} from '../components/gesamtplan/gesamtplan.component';
import { Stundenplan } from '../interfaces/stundenplan';
import { RaumplanComponent } from '../components/raumplan/raumplan.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  store: AngularFirestore; //db
  items: Observable < any[] > ; //original: Shirts observable any//collection
  stundenStrings: Array < Plan >= new Array(); //Hier sind die StundenRaster-Strings gespeichert unter plan{.tag und .wochentag}
  tagAlsString; //wird im button-woche gepushed;


  //aktuell = new BehaviorSubject < Stundenplan > (null); //von gewähltem lehrer oder klasse der plan
  //aktuell$ = this.aktuell.asObservable();
  
  zeitgleicheWochen= {
    montag: [          [],          [],          [],          [],          [],          [],          [],          [],          [],          []        ],
    dienstag: [          [],          [],          [],          [],          [],          [],          [],          [],          [],          []        ],
    mittwoch: [          [],          [],          [],          [],          [],          [],          [],          [],          [],          []        ],
    donnerstag: [          [],          [],          [],          [],          [],          [],          [],          [],          [],          []        ],
    freitag: [          [],          [],          [],          [],          [],
      [],          [],          [],          [],          []        ]
  };
  //zeitgleicheWochen$=this.zeitgleicheWochen.asObservable;
  zeitgleicheRhythmus;
  //zeitgleicheRhythmus$=this.zeitgleicheRhythmus.asObservable;
  zeitgleicheSchiene ;
  //zeitgleicheSchiene$=this.zeitgleicheSchiene.asObservable;
  zeitgleicheEpochen;
 // zeitgleicheEpochen$=this.zeitgleicheEpochen.asObservable;
 raumPlanComputer=new Stundenplan;

  saveAll() {
    this.login();
    let tage = this.store.collection < Plan > ('tage');
    let epochen = this.store.collection < Array < any >> ('epochen');
    let raum=this.store.collection<Array<any>>('raum');
    //Montag
    let x = btoa(JSON.stringify(this.planmakerService.montag));
    tage.doc('/' + 'montag').update({
      tag: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'montag');
    }).catch(function (error) {
      console.error(error);
    });
    //Dienstag
    x = btoa(JSON.stringify(this.planmakerService.dienstag));
    tage.doc('/' + 'dienstag').update({
      tag: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'dienstag');
    }).catch(function (error) {
      console.error(error);
    });
    //Mittwoch
    x = btoa(JSON.stringify(this.planmakerService.mittwoch));
    tage.doc('/' + 'mittwoch').update({
      tag: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'mittwoch');
    }).catch(function (error) {
      console.error(error);
    });
    //Donnerstag
    x = btoa(JSON.stringify(this.planmakerService.donnerstag));
    tage.doc('/' + 'donnerstag').update({
      tag: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'donnerstag');
    }).catch(function (error) {
      console.error(error);
    });
    //Freitag
    x = btoa(JSON.stringify(this.planmakerService.freitag));
    tage.doc('/' + 'freitag').update({
      tag: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'freitag');
    }).catch(function (error) {
      console.error(error);
    });


    //Epochenplan  Klassen 9:
    x = btoa(JSON.stringify(this.planmakerService.epochenplan9));
    epochen.doc('/' + 'epochenplan9').update({
      epochen: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'epoche9');
    }).catch(function (error) {
      console.error(error);
    });
    //schiene
    x = btoa(JSON.stringify(this.planmakerService.schiene9));
    epochen.doc('/' + 'epochenplan9').update({
      schiene: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'schiene9');
    }).catch(function (error) {
      console.error(error);
    });
    //rhythmus
    x = btoa(JSON.stringify(this.planmakerService.rhythmus9));
    epochen.doc('/' + 'epochenplan9').update({
      rhythmus: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'rhythmus9');
    }).catch(function (error) {
      console.error(error);
    });
    //Epochenplan  Klassen 10:
    x = btoa(JSON.stringify(this.planmakerService.epochenplan10));
    epochen.doc('/' + 'epochenplan10').update({
      epochen: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'epoche10');
    }).catch(function (error) {
      console.error(error);
    });
    //schiene10
    x = btoa(JSON.stringify(this.planmakerService.schiene10));
    epochen.doc('/' + 'epochenplan10').update({
      schiene: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'schiene10');
    }).catch(function (error) {
      console.error(error);
    });
    //rhythmus 10
    x = btoa(JSON.stringify(this.planmakerService.rhythmus10));
    epochen.doc('/' + 'epochenplan10').update({
      rhythmus: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'rhythmus10');
    }).catch(function (error) {
      console.error(error);
    });
    //Epochenplan  Klassen 11:
    x = btoa(JSON.stringify(this.planmakerService.epochenplan11));
    epochen.doc('/' + 'epochenplan11').update({
      epochen: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'epoche11');
    }).catch(function (error) {
      console.error(error);
    });
    //duplicates
    x = btoa(JSON.stringify(this.planmakerService.schiene11));
    epochen.doc('/' + 'epochenplan11').update({
      schiene: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'schiene11');
    }).catch(function (error) {
      console.error(error);
    });
    //rhythmus
    x = btoa(JSON.stringify(this.planmakerService.rhythmus11));
    epochen.doc('/' + 'epochenplan11').update({
      rhythmus: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'rhythmus11');
    }).catch(function (error) {
      console.error(error);
    });
    //Epochenplan  Klassen 12:
    x = btoa(JSON.stringify(this.planmakerService.epochenplan12));
    epochen.doc('/' + 'epochenplan12').update({
      epochen: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'epoche12');
    }).catch(function (error) {
      console.error(error);
    });
    //schiene
    x = btoa(JSON.stringify(this.planmakerService.schiene12));
    epochen.doc('/' + 'epochenplan12').update({
      schiene: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'schiene12');
    }).catch(function (error) {
      console.error(error);
    });
    //rhythmus
    x = btoa(JSON.stringify(this.planmakerService.rhythmus12));
    epochen.doc('/' + 'epochenplan12').update({
      rhythmus: x
    }).then(() => {
      console.log('done' + '. tag: ' + 'rhythmus12');
    }).catch(function (error) {
      console.error(error);
    });


    //COmputerraum-plan:

     x = btoa(JSON.stringify(this.raumPlanComputer));
     raum.doc('/' + 'computer').update({
       raumplan: x
     }).then(() => {
       console.log('done:' + 'Computerraum');
     }).catch(function (error) {
       console.error(error);
     });

    //Logout
    this.logout();
    console.log(this.lehrerservice.stundenRaster.getValue());
  }

  saveIntern(prevDay) {
    this.planmakerService[prevDay] = this.lehrerservice.stundenRaster.getValue();
  }

  load(day) {
    //console.log("LOAD");
    this.lehrerservice.stundenRaster.next(this.planmakerService[day]);
    console.log(this.lehrerservice.stundenRaster.getValue());
  }

  login() {
    let email = "bob@trottel.de";
    let passwort = "jojojo";
    this.auth.signInWithEmailAndPassword(email, passwort).catch(function (e) {
      var errorCode = e.code;
      var errorMessage = e.message;
    }); //original: Anonymously
  }

  logout() {
    this.auth.signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  //Stundenraster montag dienstag etc aus planmaker wird gesetzt: //und im Lehrerservice aktuelles Raster/behavioural
  planPushen(tag) {
    //  this.login();

    // let z: Array < Array < Array < [Lehrer, Fach] >>> ;

    //Epochenpläne + Schiene
    this.store.collection('epochen').valueChanges().subscribe((val: Array < any > ) => {
      val.forEach(epochenplan => {
        var klasse = epochenplan.klasse;
        var epochenJSO = JSON.parse(atob(epochenplan.epochen));
        var schieneJSO = JSON.parse(atob(epochenplan.schiene));
        var rhythmusJSO = JSON.parse(atob(epochenplan.rhythmus));

        // var duplicatesJSO= JSON.parse(atob(epochenplan.duplicates));

        this.planmakerService['epochenplan' + klasse] = epochenJSO;
        this.planmakerService["schiene" + klasse] = schieneJSO;
        this.planmakerService["rhythmus" + klasse] = rhythmusJSO;
        //    this.planmakerService['epochenDuplicates' + klasse]=duplicatesJSO;
      });
    })


    //alle tage speichern im planmakerservice
    this.store.collection < Plan > ('tage').valueChanges().subscribe((val: Array < Plan > ) => {
      val.forEach(plan => {
        var tag = plan.wochentag;
        var planJSO = JSON.parse(atob(plan.tag));

        //   console.log("HIER");
        // console.log(planJSO);
        this.planmakerService[tag] = planJSO;
        /// this.planmakerService.aktuell.next(planJSO);  ///will wochenplan haben dafür brauchich den? nicht? wird dort gewählt

      });
      // console.log("HIER");  PLÄNE SIND HIER GELADEN (MONTAG; DIENSTAG ETC)

      //Epochen aktualisieren in den plänen:
      this.lehrerservice.stundenRaster.next(this.planmakerService[tag]);  ///STUNDENRASTER WIRD GESETZT

      let zeile = this.planmakerService.epochenAktuell()[0];
      let celle = this.planmakerService.epochenAktuell()[1];

      //Epoche 9. Klasse:
 
      [8,9,10,11].forEach(n=>{
        ["montag","dienstag","mittwoch","donnerstag","freitag"].forEach(d=>{
          this.planmakerService[d][1][n] = this.planmakerService["epochenplan"+(n+1)][zeile][celle];
          this.planmakerService[d][2][n] = this.planmakerService["epochenplan"+(n+1)][zeile][celle];
        });
      });
      
     
      //Schiene 9. Klasse:
      [8,9,10,11].forEach(n=>{
        ["montag","dienstag","mittwoch","donnerstag"].forEach(d=>{   //freitags keine schiene
          let schienenStart=0;
          switch(d){
            case "montag": schienenStart=7; 
            break;
            case "dienstag":schienenStart=5;
            break;
            case "mittwoch":schienenStart=9;
            break;
            case "donnerstag":schienenStart=8;
            break;
          }
          this.planmakerService[d][schienenStart - 1][n] = this.planmakerService["schiene"+(n+1)][zeile][celle];
          this.planmakerService[d][schienenStart][n] = this.planmakerService["schiene"+(n+1)][zeile][celle];
        });
      });

      //RHYTHMISCH aktuelle "epoche" in den plan rein:
      //rhythm. 9.,10,11,12 Klasse:
      [8,9,10,11].forEach(n=>{
        ["montag","dienstag","mittwoch","donnerstag","freitag"].forEach(d=>{  
          let rhythmStart = 1;
          this.planmakerService[d][rhythmStart - 1][n] = this.planmakerService["rhythmus"+(n+1)][zeile][celle];
        });
      });
   
 

     




      // this.planmakerService.planKlasse(1);
      //  this.planmakerService.planLehrer(this.lehrerservice.lehrer[13]);

      //FÜR DEN RAUMPLAN :

      this.zeitgleicheWochen= {
        montag: [          [],          [],          [],          [],          [],          [],          [],          [],          [],          []        ],
        dienstag: [          [],          [],          [],          [],          [],          [],          [],          [],          [],          []        ],
        mittwoch: [          [],          [],          [],          [],          [],          [],          [],          [],          [],          []        ],
        donnerstag: [          [],          [],          [],          [],          [],          [],          [],          [],          [],          []        ],
        freitag: [          [],          [],          [],          [],          [],
          [],          [],          [],          [],          []        ]
      };


      this.planmakerService.montag.forEach((row, r) => {
        row.forEach((element, e) => { //Montag erste Stunden 
          if (e > 3) { //ab 5. Klasse
            element.forEach(lehrerFach => {
              this.zeitgleicheWochen.montag[r].push([[lehrerFach], e])
            });
          }
        });
      }); //row ende

      //Dienstag:
      this.planmakerService.dienstag.forEach((row, r) => {
        row.forEach((element, e) => { //Montag erste Stunden 
          if (e > 3) { //ab 5. Klasse
            element.forEach(lehrerFach => {
              this.zeitgleicheWochen.dienstag[r].push([[lehrerFach], e])
            });
          }
        });
      }); //row ende
      //Mittwoch:
      this.planmakerService.mittwoch.forEach((row, r) => {
        row.forEach((element, e) => { //Montag erste Stunden 
          if (e > 3) { //ab 5. Klasse
            element.forEach(lehrerFach => {
              this.zeitgleicheWochen.mittwoch[r].push([[lehrerFach], e])
            });
          }
        });
      }); //row ende
      //Donnerstag:
      this.planmakerService.donnerstag.forEach((row, r) => {
        row.forEach((element, e) => { //Montag erste Stunden 
          if (e > 3) { //ab 5. Klasse
            element.forEach(lehrerFach => {
              this.zeitgleicheWochen.donnerstag[r].push([[lehrerFach], e])
            });
          }
        });
      }); //row ende
      //Freitag:
      this.planmakerService.freitag.forEach((row, r) => {
        row.forEach((element, e) => { //Montag erste Stunden 
          if (e > 3) { //ab 5. Klasse
            element.forEach(lehrerFach => {
              this.zeitgleicheWochen.freitag[r].push([[lehrerFach], e])
            });
          }
        });
      }); //row ende


      //EPOCHEN//SCHIENE//RYHTMUS:

      this.zeitgleicheEpochen = this.planmakerService.datumstring.map(zeile => zeile.map(cell => []));
      this.zeitgleicheRhythmus = this.planmakerService.datumstring.map(zeile => zeile.map(cell => []));
      this.zeitgleicheSchiene = this.planmakerService.datumstring.map(zeile => zeile.map(cell => []));

      this.zeitgleicheEpochen.forEach((zeitblock, z) => {
        zeitblock.forEach((woche, w) => {
          this.zeitgleicheEpochen[z][w]= [this.planmakerService.epochenplan9[z][w] , this.planmakerService.epochenplan10[z][w], this.planmakerService.epochenplan11[z][w], this.planmakerService.epochenplan12[z][w]];
        });
      });

      this.zeitgleicheSchiene.forEach((zeitblock, z) => {
        zeitblock.forEach((woche, w) => {
          this.zeitgleicheSchiene[z][w] = [this.planmakerService.schiene9[z][w], this.planmakerService.schiene10[z][w], this.planmakerService.schiene11[z][w], this.planmakerService.schiene12[z][w]];
        });
      });

      this.zeitgleicheRhythmus.forEach((zeitblock, z) => {
        zeitblock.forEach((woche, w) => {
         this.zeitgleicheRhythmus[z][w]= [this.planmakerService.rhythmus9[z][w] , this.planmakerService.rhythmus10[z][w], this.planmakerService.rhythmus11[z][w], this.planmakerService.rhythmus12[z][w]];
        });
      });
  

      console.log(this.planmakerService[tag]);
      this.planmakerService.generateDuplicates(this.planmakerService[tag]); //Duplicates erstellen.
      this.planmakerService.generateDuplicatesESR("Rhythmus",this.planmakerService.epochenplan9);
      this.planmakerService.generateDuplicatesESR("Epoche",this.planmakerService.epochenplan9);
      this.planmakerService.generateDuplicatesESR("Schiene",this.planmakerService.epochenplan9);

    }); //Store collection ende

    this.store.collection('raum').valueChanges().subscribe((val: Array < any > ) => {
      val.forEach(plan => {
        var raum = plan.raum;
        var raumJSO = JSON.parse(atob(plan.raumplan));

        //console.log(epochenplan.epochen);
        //console.log(epochenplan.klasse);
        //console.log(epochenplan.duplicates);
        // var duplicatesJSO= JSON.parse(atob(epochenplan.duplicates));

        this.raumPlanComputer  = raumJSO;


        //    this.planmakerService['epochenDuplicates' + klasse]=duplicatesJSO;
      });
    })
    // this.logout();
  }

  constructor(private planmakerService: PlanmakerService,
    private lehrerservice: LehrerService,
    db: AngularFirestore, public auth: AngularFireAuth) {
    this.items = db.collection('items').valueChanges(); //items ist firestore-collection name
    this.store = db; //hier speichere ich die ganze angularfirestore dings  
    this.raumPlanComputer.stundenPlan=new Array(lehrerservice.stundenanzahl).fill(null).map((r) => new Array(lehrerservice.wochentage).fill(null).map((s) => s = []));
    this.raumPlanComputer.rhythmusPlan=this.planmakerService.datumstring.map(zeile => zeile.map(cell => []));
    this.raumPlanComputer.epochenPlan=this.planmakerService.datumstring.map(zeile => zeile.map(cell => []));
    this.raumPlanComputer.schienenPlan=this.planmakerService.datumstring.map(zeile => zeile.map(cell => []));
    this.raumPlanComputer.datumString=this.planmakerService.datumstring;
    
    //this.planPushen("montag"); //Montag ist standard. im planmaker wird montag als Stundenraster gesetzt, im lehrerservice das Stundenraster behavioural




  }
}
