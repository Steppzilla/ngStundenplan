import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  AngularFireAuth
} from '@angular/fire/auth';
import {
  AngularFirestore,
  validateEventsArray
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

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  store: AngularFirestore; //db
  items: Observable < any[] > ; //original: Shirts observable any//collection
  stundenStrings: Array < Plan >= new Array(); //Hier sind die StundenRaster-Strings gespeichert unter plan{.tag und .wochentag}


  save(tagvorher) {
    let tage = this.store.collection < Plan > ('tage');
    // this.tage=tage;
    let x = btoa(JSON.stringify(this.lehrerservice.stundenRaster.getValue()));
    tage.doc('/' + tagvorher).update({
      tag: x
    }).then(() => {
      //  console.log('done' + '. tag:'+ tag + 'string: ' +x );
    }).catch(function (error) {
      console.error(error);
    });
  }

  load(day) {
    //console.log("LOAD");
    this.lehrerservice.stundenRaster.next(this.planmakerService[day]);
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

  planPushen() {
    let z: Array < Array < Array < [Lehrer, Fach] >>> ;
    this.store.collection < Plan > ('tage').valueChanges().subscribe((val: Array < Plan > ) => {
      val.forEach(plan => {
        var tag = plan.wochentag;
        var planJSO = JSON.parse(atob(plan.tag));
        //   console.log("HIER");
        // console.log(planJSO);
        this.planmakerService[tag] = planJSO;
       /// this.planmakerService.aktuell.next(planJSO);  ///will wochenplan haben dafür brauchich den

      });
      this.lehrerservice.stundenRaster.next(this.planmakerService.montag);
     // console.log("HIER");
     // console.log(this.planmakerService.montag);
      this.planmakerService.planKlasse(1);
      this.planmakerService.planLehrer(this.lehrerservice.lehrer[12]);
    });
  }

  constructor(private planmakerService: PlanmakerService,
    private lehrerservice: LehrerService,
    db: AngularFirestore, public auth: AngularFireAuth) {
    this.items = db.collection('items').valueChanges(); //items ist firestore-collection name
    this.store = db; //hier speichere ich die ganze angularfirestore dings  
  }
}
