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
    x= btoa(JSON.stringify(this.planmakerService.schiene9));
    epochen.doc('/' + 'epochenplan9').update({schiene: x}).then(()=>{
      console.log('done' + '. tag: ' + 'schiene9');
    }).catch(function(error){console.error(error);});
     //Epochenplan  Klassen 10:
     x= btoa(JSON.stringify(this.planmakerService.epochenplan10));
     epochen.doc('/' + 'epochenplan10').update({epochen: x}).then(()=>{
       console.log('done' + '. tag: ' + 'epoche10');
     }).catch(function(error){console.error(error);});
     //duplicates
     x= btoa(JSON.stringify(this.planmakerService.schiene10));
     epochen.doc('/' + 'epochenplan10').update({schiene: x}).then(()=>{
       console.log('done' + '. tag: ' + 'schiene10');
     }).catch(function(error){console.error(error);});
      //Epochenplan  Klassen 11:
    x= btoa(JSON.stringify(this.planmakerService.epochenplan11));
    epochen.doc('/' + 'epochenplan11').update({epochen: x}).then(()=>{
      console.log('done' + '. tag: ' + 'epoche11');
    }).catch(function(error){console.error(error);});
    //duplicates
    x= btoa(JSON.stringify(this.planmakerService.schiene11));
    epochen.doc('/' + 'epochenplan11').update({schiene: x}).then(()=>{
      console.log('done' + '. tag: ' + 'schiene11');
    }).catch(function(error){console.error(error);});
     //Epochenplan  Klassen 12:
     x= btoa(JSON.stringify(this.planmakerService.epochenplan12));
     epochen.doc('/' + 'epochenplan12').update({epochen: x}).then(()=>{
       console.log('done' + '. tag: ' + 'epoche12');
     }).catch(function(error){console.error(error);});
     //duplicates
     x= btoa(JSON.stringify(this.planmakerService.schiene12));
     epochen.doc('/' + 'epochenplan12').update({schiene: x}).then(()=>{
       console.log('done' + '. tag: ' + 'schiene12');
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


  //Stundenraster montag dienstag etc aus planmaker wird gesetzt: //und im Lehrerservice aktuelles Raster/behavioural
  planPushen(tag) {
  //  this.login();

   // let z: Array < Array < Array < [Lehrer, Fach] >>> ;

   //Epochenpläne + Schiene
   this.store.collection('epochen').valueChanges().subscribe((val:Array<any>)=>{
    val.forEach(epochenplan=>{
      var klasse= epochenplan.klasse;
      var epochenJSO=JSON.parse(atob(epochenplan.epochen)) ; 
      var schieneJSO=JSON.parse(atob(epochenplan.schiene));
//console.log(epochenplan.epochen);
//console.log(epochenplan.klasse);
//console.log(epochenplan.duplicates);
     // var duplicatesJSO= JSON.parse(atob(epochenplan.duplicates));

      this.planmakerService['epochenplan' + klasse]=epochenJSO;
      this.planmakerService["schiene" + klasse] = schieneJSO;
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
 // console.log("HIER");
      console.log("Montag:");
        console.log(this.planmakerService.montag);
        console.log("epoche:");
        console.log(this.planmakerService.epochenplan9);
          //Epochen aktualisieren in den plänen:
          this.lehrerservice.stundenRaster.next(this.planmakerService[tag]); 
   
    let zeile=this.planmakerService.epochenAktuell()[0];
    let celle=this.planmakerService.epochenAktuell()[1];
    console.log("Zeile/Zelle : " + zeile + " / " + celle);
console.log(this.planmakerService.epochenplan9[zeile][celle]);
     //Epoche 9. Klasse:
    // console.log(this.planmakerService.epochenplan9);
     this.planmakerService.montag[1][8]=this.planmakerService.epochenplan9[zeile][celle];
     this.planmakerService.montag[2][8]=this.planmakerService.epochenplan9[zeile][celle];
     this.planmakerService.dienstag[1][8]=this.planmakerService.epochenplan9[zeile][celle];
     this.planmakerService.dienstag[2][8]=this.planmakerService.epochenplan9[zeile][celle];
     this.planmakerService.mittwoch[1][8]=this.planmakerService.epochenplan9[zeile][celle];
     this.planmakerService.mittwoch[2][8]=this.planmakerService.epochenplan9[zeile][celle];
     this.planmakerService.donnerstag[1][8]=this.planmakerService.epochenplan9[zeile][celle];
     this.planmakerService.donnerstag[2][8]=this.planmakerService.epochenplan9[zeile][celle];
     this.planmakerService.freitag[1][8]=this.planmakerService.epochenplan9[zeile][celle];
     this.planmakerService.freitag[2][8]=this.planmakerService.epochenplan9[zeile][celle];
          //Epoche 10. Klasse:
    // console.log(this.planmakerService.epochenplan9);
    this.planmakerService.montag[1][9]=this.planmakerService.epochenplan10[zeile][celle];
    this.planmakerService.montag[2][9]=this.planmakerService.epochenplan10[zeile][celle];
    this.planmakerService.dienstag[1][9]=this.planmakerService.epochenplan10[zeile][celle];
    this.planmakerService.dienstag[2][9]=this.planmakerService.epochenplan10[zeile][celle];
    this.planmakerService.mittwoch[1][9]=this.planmakerService.epochenplan10[zeile][celle];
    this.planmakerService.mittwoch[2][9]=this.planmakerService.epochenplan10[zeile][celle];
    this.planmakerService.donnerstag[1][9]=this.planmakerService.epochenplan10[zeile][celle];
    this.planmakerService.donnerstag[2][9]=this.planmakerService.epochenplan10[zeile][celle];
    this.planmakerService.freitag[1][9]=this.planmakerService.epochenplan10[zeile][celle];
    this.planmakerService.freitag[2][9]=this.planmakerService.epochenplan10[zeile][celle];
         //Epoche 11. Klasse:
    // console.log(this.planmakerService.epochenplan9);
    this.planmakerService.montag[1][10]=this.planmakerService.epochenplan11[zeile][celle];
    this.planmakerService.montag[2][10]=this.planmakerService.epochenplan11[zeile][celle];
    this.planmakerService.dienstag[1][10]=this.planmakerService.epochenplan11[zeile][celle];
    this.planmakerService.dienstag[2][10]=this.planmakerService.epochenplan11[zeile][celle];
    this.planmakerService.mittwoch[1][10]=this.planmakerService.epochenplan11[zeile][celle];
    this.planmakerService.mittwoch[2][10]=this.planmakerService.epochenplan11[zeile][celle];
    this.planmakerService.donnerstag[1][10]=this.planmakerService.epochenplan11[zeile][celle];
    this.planmakerService.donnerstag[2][10]=this.planmakerService.epochenplan11[zeile][celle];
    this.planmakerService.freitag[1][10]=this.planmakerService.epochenplan11[zeile][celle];
    this.planmakerService.freitag[2][10]=this.planmakerService.epochenplan11[zeile][celle];
         //Epoche 12. Klasse:
    // console.log(this.planmakerService.epochenplan9);
    this.planmakerService.montag[1][11]=this.planmakerService.epochenplan12[zeile][celle];
    this.planmakerService.montag[2][11]=this.planmakerService.epochenplan12[zeile][celle];
    this.planmakerService.dienstag[1][11]=this.planmakerService.epochenplan12[zeile][celle];
    this.planmakerService.dienstag[2][11]=this.planmakerService.epochenplan12[zeile][celle];
    this.planmakerService.mittwoch[1][11]=this.planmakerService.epochenplan12[zeile][celle];
    this.planmakerService.mittwoch[2][11]=this.planmakerService.epochenplan12[zeile][celle];
    this.planmakerService.donnerstag[1][11]=this.planmakerService.epochenplan12[zeile][celle];
    this.planmakerService.donnerstag[2][11]=this.planmakerService.epochenplan12[zeile][celle];
    this.planmakerService.freitag[1][11]=this.planmakerService.epochenplan12[zeile][celle];
    this.planmakerService.freitag[2][11]=this.planmakerService.epochenplan12[zeile][celle];
     // this.planmakerService.planKlasse(1);
    //  this.planmakerService.planLehrer(this.lehrerservice.lehrer[13]);

    
    });






  // this.logout();
  }

  constructor(private planmakerService: PlanmakerService,
    private lehrerservice: LehrerService,
    db: AngularFirestore, public auth: AngularFireAuth) {
    this.items = db.collection('items').valueChanges(); //items ist firestore-collection name
    this.store = db; //hier speichere ich die ganze angularfirestore dings  
  }
}
