import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, validateEventsArray } from '@angular/fire/firestore';
import { Item } from './interfaces/item';
import{Plan} from './interfaces/plan';
import { LehrerService } from './lehrer.service';
import { Lehrer } from './lehrer';
import { Fach } from './fach.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  store:AngularFirestore;   //db
  items:Observable<any[]>; //original: Shirts observable any//collection
  stundenStrings:Array<Plan>=new Array();  //Hier sind die StundenRaster-Strings gespeichert unter plan{.tag und .wochentag}
   

  add(userNeu: string, tutNeu: string){
   
    let items = this.store.collection<Item>("items"); //hier wird unter der collection  items gespeichert heißt
    items.add({user: userNeu, tut: tutNeu});
  
  }

  save(tagvorher){
    let tage=this.store.collection<Plan>('tage');
   // this.tage=tage;
    let x=btoa(JSON.stringify(this.lehrerservice.stundenRaster.getValue()));
    tage.doc('/'+tagvorher).update({tag:x}).then(()=>{
    //  console.log('done' + '. tag:'+ tag + 'string: ' +x );
    }).catch(function(error){console.error(error);
  });
 
  }

  load(day){   
    console.log("LOAD");
    console.log("stundenStrings:");
    console.log(this.stundenStrings);
    console.log(this.stundenStrings.length);
    let str=this.stundenStrings;
    str.forEach((plan:Plan) => {
        //console.log(plan.wochentag + "  :  " + day);
        console.log(plan.wochentag + " : " +day);
      if(plan.wochentag.trim()===day.trim()){
        let y=atob(plan.tag); //erste Entschlüsselung
        let stundenRaster=JSON.parse(y); //2. Entschlüsselung
        console.log("Im Load/loginservice nur Raster heute:")
        console.log(stundenRaster);
        this.lehrerservice.stundenRaster.next(stundenRaster);
      }      
    });
   
  }
    
  login(){
    let email="bob@trottel.de";
    let passwort="jojojo";
   this.auth.signInWithEmailAndPassword(email, passwort).catch(function(e){
    var errorCode = e.code;
     var errorMessage = e.message;
    }); //original: Anonymously
  }

  logout(){
    this.auth.signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  planPushen(tag){
    let z:Array<Array<Array<[Lehrer,Fach]>>>;
   this.store.collection<Array<Plan>>('tage').doc('/' + tag).valueChanges().subscribe((val:Plan)=>{

    // this.stundenStrings.slice(0,1);
     this.stundenStrings.push(val);
     z= JSON.parse(atob(val.tag)); 
     
    // this.lehrerservice.alleStundenRaster.push(y);
        //console.log("länge Raster im push: " +this.lehrerservice.alleStundenRaster.length);
 
     });
     return z;
   
    }
    

  constructor(
    private lehrerservice:LehrerService, 
    db: AngularFirestore, public auth: AngularFireAuth) { 

       this.items=db.collection('items').valueChanges(); //items ist firestore-collection name
       this.store=db; //hier speichere ich die ganze angularfirestore dings
       
       lehrerservice.alleStundenRaster.push(this.planPushen('montag'));
       lehrerservice.alleStundenRaster.push(this.planPushen('dienstag'));
       lehrerservice.alleStundenRaster.push(this.planPushen('mittwoch'));
       lehrerservice.alleStundenRaster.push(this.planPushen('donnerstag'));
       lehrerservice.alleStundenRaster.push(this.planPushen('freitag'));
       console.log(lehrerservice.alleStundenRaster);


      // var elementAnzahl=5;
      // let planElemente:Plan={tag: "", wochentag: ""};
     // this.stundenStrings=new Array(elementAnzahl).fill(null).map((r) => r = planElemente)
          //storageService.loadAll();
  
  }
}
