import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, validateEventsArray } from '@angular/fire/firestore';
import { Item } from './interfaces/item';
import{Plan} from './interfaces/plan';
import { LehrerService } from './lehrer.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  store:AngularFirestore;   //db
  items:Observable<any[]>; //original: Shirts observable any//collection
   stundenStrings:Array<Plan>=[];  //Hier sind die StundenRaster-Strings gespeichert unter .tag

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
    let str=this.stundenStrings;
    str.forEach((plan:Plan) => {
        //console.log(plan.wochentag + "  :  " + day);
      if(plan.wochentag.trim()===day.trim()){
        let y=atob(plan.tag); //erste Entschlüsselung
        let stundenRaster=JSON.parse(y); //2. Entschlüsselung
        console.log(stundenRaster);
        this.lehrerservice.stundenRaster.next(stundenRaster);
      }      
    });
  }
    
   planPushen(tag){

    this.store.collection<Array<Plan>>('tage').doc('/' + tag).valueChanges().subscribe((val:Plan)=>{
      this.stundenStrings.push({wochentag:val.wochentag, tag:val.tag});
      });
     }

  constructor(private lehrerservice:LehrerService, db: AngularFirestore, public auth: AngularFireAuth) { 

        let email="bob@trottel.de";
       let passwort="jojojo";
      this.auth.signInWithEmailAndPassword(email, passwort); //original: Anonymously
     // admin.initializeApp();
       this.items=db.collection('items').valueChanges(); //items ist firestore-collection name
       this.store=db; //hier speichere ich die ganze angularfirestore dings
       this.planPushen('montag');
       this.planPushen('dienstag');
       this.planPushen('mittwoch');
       this.planPushen('donnerstag');
       this.planPushen('freitag');

  
        
  }
}
