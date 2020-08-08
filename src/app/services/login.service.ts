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
    let epochen=this.store.collection < Array<any>> ('epochen');
    //Montag
    let x= btoa(JSON.stringify(this.planmakerService.montag));
    tage.doc('/' + 'montag').update({tag: x}).then(()=>{
      console.log('done' + '. tag: ' + 'montag');
    }).catch(function(error){console.error(error);});
    //Dienstag
    x= btoa(JSON.stringify(this.planmakerService.dienstag));
    tage.doc('/' + 'dienstag').update({tag: x}).then(()=>{
      console.log('done' + '. tag: ' + 'dienstag');
    }).catch(function(error){console.error(error);});
//Mittwoch
  x= btoa(JSON.stringify(this.planmakerService.mittwoch));
    tage.doc('/' + 'mittwoch').update({tag: x}).then(()=>{
      console.log('done' + '. tag: ' + 'mittwoch');
    }).catch(function(error){console.error(error);});
//Donnerstag
    x= btoa(JSON.stringify(this.planmakerService.donnerstag));
    tage.doc('/' + 'donnerstag').update({tag: x}).then(()=>{
      console.log('done' + '. tag: ' + 'donnerstag');
    }).catch(function(error){console.error(error);});
//Freitag
    x= btoa(JSON.stringify(this.planmakerService.freitag));
    tage.doc('/' + 'freitag').update({tag: x}).then(()=>{
      console.log('done' + '. tag: ' + 'freitag');
    }).catch(function(error){console.error(error);});


    //Epochenplan  Klassen 9:
    x= btoa(JSON.stringify(this.planmakerService.epochenplan9));
    epochen.doc('/' + 'epochenplan9').update({epochen: x}).then(()=>{
      console.log('done' + '. tag: ' + 'epoche9');
    }).catch(function(error){console.error(error);});
    //duplicates
    x= btoa(JSON.stringify(this.planmakerService.epochenDuplicates9));
    epochen.doc('/' + 'epochenplan9').update({duplicates: x}).then(()=>{
      console.log('done' + '. tag: ' + 'duplicates9');
    }).catch(function(error){console.error(error);});
     //Epochenplan  Klassen 10:
     x= btoa(JSON.stringify(this.planmakerService.epochenplan10));
     epochen.doc('/' + 'epochenplan10').update({epochen: x}).then(()=>{
       console.log('done' + '. tag: ' + 'epoche10');
     }).catch(function(error){console.error(error);});
     //duplicates
     x= btoa(JSON.stringify(this.planmakerService.epochenDuplicates10));
     epochen.doc('/' + 'epochenplan10').update({duplicates: x}).then(()=>{
       console.log('done' + '. tag: ' + 'duplicates10');
     }).catch(function(error){console.error(error);});
      //Epochenplan  Klassen 11:
    x= btoa(JSON.stringify(this.planmakerService.epochenplan11));
    epochen.doc('/' + 'epochenplan11').update({epochen: x}).then(()=>{
      console.log('done' + '. tag: ' + 'epoche11');
    }).catch(function(error){console.error(error);});
    //duplicates
    x= btoa(JSON.stringify(this.planmakerService.epochenDuplicates11));
    epochen.doc('/' + 'epochenplan11').update({duplicates: x}).then(()=>{
      console.log('done' + '. tag: ' + 'duplicates11');
    }).catch(function(error){console.error(error);});
     //Epochenplan  Klassen 12:
     x= btoa(JSON.stringify(this.planmakerService.epochenplan12));
     epochen.doc('/' + 'epochenplan12').update({epochen: x}).then(()=>{
       console.log('done' + '. tag: ' + 'epoche12');
     }).catch(function(error){console.error(error);});
     //duplicates
     x= btoa(JSON.stringify(this.planmakerService.epochenDuplicates12));
     epochen.doc('/' + 'epochenplan12').update({duplicates: x}).then(()=>{
       console.log('done' + '. tag: ' + 'duplicates12');
     }).catch(function(error){console.error(error);});
    //Logout
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
  //  this.login();
    let z: Array < Array < Array < [Lehrer, Fach] >>> ;
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
      this.lehrerservice.stundenRaster.next(this.planmakerService[tag]); 
   
          // console.log("HIER");
     // console.log(this.planmakerService.montag);
      this.planmakerService.planKlasse(1);
      this.planmakerService.planLehrer(this.lehrerservice.lehrer[13]);
    });

    this.store.collection('epochen').valueChanges().subscribe((val:Array<any>)=>{
      val.forEach(epochenplan=>{
        var klasse= epochenplan.klasse;
        var epochenJSO=JSON.parse(atob(epochenplan.epochen)) ; 
//console.log(epochenplan.epochen);
//console.log(epochenplan.klasse);
//console.log(epochenplan.duplicates);
       // var duplicatesJSO= JSON.parse(atob(epochenplan.duplicates));
        this.planmakerService['epochenplan' + klasse]=epochenJSO;
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
  }
}
