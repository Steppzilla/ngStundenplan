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
  PlanmakerService
} from './planmaker.service';
import {
  Stundenplan
} from '../interfaces/stundenplan';

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

  zeitgleicheWochen = {
    montag: [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ],
    dienstag: [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ],
    mittwoch: [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ],
    donnerstag: [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ],
    freitag: [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ]
  };
  //zeitgleicheWochen$=this.zeitgleicheWochen.asObservable;
  zeitgleicheRhythmus;
  //zeitgleicheRhythmus$=this.zeitgleicheRhythmus.asObservable;
  zeitgleicheSchiene;
  //zeitgleicheSchiene$=this.zeitgleicheSchiene.asObservable;
  zeitgleicheEpochen;
  // zeitgleicheEpochen$=this.zeitgleicheEpochen.asObservable;
  raumPlanComputer = new Stundenplan;

  saveAll() {
    this.login();
    let tage = this.store.collection < Plan > ('tage');
    let epochen = this.store.collection < Array < any >> ('epochen');
    let raum = this.store.collection < Array < any >> ('raum');
    let x;
    //Montag,Di, Mi, Do, Fr:
    ["montag", "dienstag", "mittwoch", "donnerstag", "freitag"].forEach(d => {
      x = btoa(JSON.stringify(this.planmakerService[d]));
      tage.doc('/' + d).update({
        tag: x
      }).then(() => {        console.log('done' + '. tag: ' + d);      }).catch(function (error) {        console.error(error);
      });
    });

    //Epochenplan  Klassen 9,10,11,12:
    [9, 10, 11, 12].forEach(klasse => {
      x = btoa(JSON.stringify(this.planmakerService["epochenplan" + klasse]));
      epochen.doc('/' + 'epochenplan' + klasse).update({
        epochen: x
      }).then(() => {        console.log('done' + '. tag: ' + 'epoche' + klasse);      }).catch(function (error) {        console.error(error);
      });
      //schiene
      x = btoa(JSON.stringify(this.planmakerService["schiene" + klasse]));
      epochen.doc('/' + 'epochenplan' + klasse).update({
        schiene: x
      }).then(() => {        console.log('done' + '. tag: ' + 'schiene' + klasse);      }).catch(function (error) {        console.error(error);
      });
      //rhythmus
      x = btoa(JSON.stringify(this.planmakerService["rhythmus" + klasse]));
      epochen.doc('/' + 'epochenplan' + klasse).update({
        rhythmus: x
      }).then(() => {        console.log('done' + '. tag: ' + 'rhythmus' + klasse);      }).catch(function (error) {        console.error(error);
      });
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
      this.lehrerservice.stundenRaster.next(this.planmakerService[tag]); ///STUNDENRASTER WIRD GESETZT

      let zeile = this.planmakerService.epochenAktuell()[0];
      let celle = this.planmakerService.epochenAktuell()[1];

      //Epoche 9. Klasse:

      [8, 9, 10, 11].forEach(n => {
        ["montag", "dienstag", "mittwoch", "donnerstag", "freitag"].forEach(d => {
          this.planmakerService[d][1][n] = this.planmakerService["epochenplan" + (n + 1)][zeile][celle];
          this.planmakerService[d][2][n] = this.planmakerService["epochenplan" + (n + 1)][zeile][celle];
        });
      });


      //Schiene 9. Klasse:
      [8, 9, 10, 11].forEach(n => {
        ["montag", "dienstag", "mittwoch", "donnerstag"].forEach(d => { //freitags keine schiene
          let schienenStart = 0;
          switch (d) {
            case "montag":
              schienenStart = 7;
              break;
            case "dienstag":
              schienenStart = 5;
              break;
            case "mittwoch":
              schienenStart = 9;
              break;
            case "donnerstag":
              schienenStart = 8;
              break;
          }
          this.planmakerService[d][schienenStart - 1][n] = this.planmakerService["schiene" + (n + 1)][zeile][celle];
          this.planmakerService[d][schienenStart][n] = this.planmakerService["schiene" + (n + 1)][zeile][celle];
        });
      });

      //RHYTHMISCH aktuelle "epoche" in den plan rein:
      //rhythm. 9.,10,11,12 Klasse:
      [8, 9, 10, 11].forEach(n => {
        ["montag", "dienstag", "mittwoch", "donnerstag", "freitag"].forEach(d => {
          let rhythmStart = 1;
          this.planmakerService[d][rhythmStart - 1][n] = this.planmakerService["rhythmus" + (n + 1)][zeile][celle];
        });
      });

      //FÜR DEN RAUMPLAN :
      this.zeitgleicheWochen = {
        montag: [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ],
        dienstag: [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ],
        mittwoch: [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ],
        donnerstag: [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ],
        freitag: [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      };

      ["montag", "dienstag", "mittwoch", "donnerstag", "freitag"].forEach(d => {
        this.planmakerService[d].forEach((row, r) => {
          row.forEach((element, e) => {
            if (e > 3) { //ab 5. Klasse erst Computerraum
              element.forEach(lehrerFach => {
                this.zeitgleicheWochen[d][r].push([
                  [lehrerFach], e
                ]);
              });
            }
          });
        });
      });

      //EPOCHEN//SCHIENE//RYHTMUS:

      this.zeitgleicheEpochen = this.planmakerService.datumstring.map(zeile => zeile.map(cell => []));
      this.zeitgleicheRhythmus = this.planmakerService.datumstring.map(zeile => zeile.map(cell => []));
      this.zeitgleicheSchiene = this.planmakerService.datumstring.map(zeile => zeile.map(cell => []));

      [this.zeitgleicheEpochen, this.zeitgleicheSchiene, this.zeitgleicheRhythmus].forEach(n => {
        let plan;
        if (n == this.zeitgleicheEpochen) {
          plan = "epochenplan";
        } else if (n == this.zeitgleicheSchiene) {
          plan = "schiene";
        } else if (n == this.zeitgleicheRhythmus) {
          plan = "rhythmus";
        }

        n.forEach((zeitblock, z) => {
          zeitblock.forEach((woche, w) => {
            n[z][w] = [this.planmakerService[plan + 9][z][w], this.planmakerService[plan + 10][z][w], this.planmakerService[plan + 11][z][w], this.planmakerService[plan + 12][z][w]];
          });
        });
      });

      console.log(this.planmakerService[tag]);
      this.planmakerService.generateDuplicates(this.planmakerService[tag]); //Duplicates erstellen.
      this.planmakerService.generateDuplicatesESR("Rhythmus", this.planmakerService.epochenplan9);
      this.planmakerService.generateDuplicatesESR("Epoche", this.planmakerService.epochenplan9);
      this.planmakerService.generateDuplicatesESR("Schiene", this.planmakerService.epochenplan9);
    }); //Store collection ende
    this.store.collection('raum').valueChanges().subscribe((val: Array < any > ) => {
      val.forEach(plan => {
        var raum = plan.raum;
        var raumJSO = JSON.parse(atob(plan.raumplan));
        this.raumPlanComputer = raumJSO;
      });
    })
    // this.logout();
  }
  constructor(private planmakerService: PlanmakerService,
    private lehrerservice: LehrerService,
    db: AngularFirestore, public auth: AngularFireAuth) {
    this.items = db.collection('items').valueChanges(); //items ist firestore-collection name
    this.store = db; //hier speichere ich die ganze angularfirestore dings  
    this.raumPlanComputer.stundenPlan = new Array(lehrerservice.stundenanzahl).fill(null).map((r) => new Array(lehrerservice.wochentage).fill(null).map((s) => s = []));
    this.raumPlanComputer.rhythmusPlan = this.planmakerService.datumstring.map(zeile => zeile.map(cell => []));
    this.raumPlanComputer.epochenPlan = this.planmakerService.datumstring.map(zeile => zeile.map(cell => []));
    this.raumPlanComputer.schienenPlan = this.planmakerService.datumstring.map(zeile => zeile.map(cell => []));
    this.raumPlanComputer.datumString = this.planmakerService.datumstring;
    //this.planPushen("montag"); //Montag ist standard. im planmaker wird montag als Stundenraster gesetzt, im lehrerservice das Stundenraster behavioural
  }
}
