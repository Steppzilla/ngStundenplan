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
import { LehrerlisteComponent } from '../components/gesamtplan/gesamtplan.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  store: AngularFirestore; //db
  items: Observable < any[] > ; //original: Shirts observable any//collection
  stundenStrings: Array < Plan >= new Array(); //Hier sind die StundenRaster-Strings gespeichert unter plan{.tag und .wochentag}
tagAlsString; //wird im button-woche gepushed;

  saveAll() {
    this.login();
    let tage = this.store.collection < Plan > ('tage');

    let x= btoa(JSON.stringify(this.planmakerService.montag));
    tage.doc('/' + 'montag').update({tag: x}).then(()=>{
      console.log('done' + '. tag: ' + 'montag');
    }).catch(function(error){console.error(error);});

    x= btoa(JSON.stringify(this.planmakerService.dienstag));
    tage.doc('/' + 'dienstag').update({tag: x}).then(()=>{
      console.log('done' + '. tag: ' + 'dienstag');
    }).catch(function(error){console.error(error);});

  x= btoa(JSON.stringify(this.planmakerService.mittwoch));
    tage.doc('/' + 'mittwoch').update({tag: x}).then(()=>{
      console.log('done' + '. tag: ' + 'mittwoch');
    }).catch(function(error){console.error(error);});

    x= btoa(JSON.stringify(this.planmakerService.donnerstag));
    tage.doc('/' + 'donnerstag').update({tag: x}).then(()=>{
      console.log('done' + '. tag: ' + 'donnerstag');
    }).catch(function(error){console.error(error);});

    x= btoa(JSON.stringify(this.planmakerService.freitag));
    tage.doc('/' + 'freitag').update({tag: x}).then(()=>{
      console.log('done' + '. tag: ' + 'freitag');
    }).catch(function(error){console.error(error);});
    
this.logout();
console.log(this.lehrerservice.stundenRaster.getValue());
  }

  saveIntern(prevDay){
    this.planmakerService[prevDay]= this.lehrerservice.stundenRaster.getValue();
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

  planPushen(tag) {
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
      this.lehrerservice.stundenRaster.next(this.planmakerService[tag]); //dies ruft fehler hervor beim saven->change inhalt, montag ausgabe??
      
      //reparatur des fehlers:

     // console.log("HIER");
     // console.log(this.planmakerService.montag);
      this.planmakerService.planKlasse(1);
      this.planmakerService.planLehrer(this.lehrerservice.lehrer[13]);
    });
  }

  constructor(private planmakerService: PlanmakerService,
    private lehrerservice: LehrerService,
    db: AngularFirestore, public auth: AngularFireAuth) {
    this.items = db.collection('items').valueChanges(); //items ist firestore-collection name
    this.store = db; //hier speichere ich die ganze angularfirestore dings  
  }
}
