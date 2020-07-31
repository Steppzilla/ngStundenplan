import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, validateEventsArray } from '@angular/fire/firestore';
import { Item } from './interfaces/item';
import{Plan} from './interfaces/plan';
import { LehrerService } from './lehrer.service';
import { admin } from 'firebase-admin/lib/database';
import {environment} from '../environments/environment' ;
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  store:AngularFirestore;   //db
  items:Observable<any[]>; //original: Shirts observable any//collection
 // ref;  //admin-db?
  gefaerbteCells;
 // dinge:Observable<any[]>; //für Strings
  tage:Array<Plan>;  //Hier sind die StundenRaster-Strings gespeichert unter .tag

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
    let str=this.items;
    console.log(day);
   // console.log(str);  //hier isses Observable
    this.tage.forEach((d)=>{    
      console.log(d + " : " + day);   //d ist ein Objekt jeweils??
      if(d.wochentag===day){
        console.log("tag ist +" + day);
      }
    });     
  }
       

  constructor(private lehrerservice:LehrerService, db: AngularFirestore, public auth: AngularFireAuth) { 

    //  this.auth.signInWithEmailAndPassword(email, passwort); //original: Anonymously
     // admin.initializeApp();
       this.items=db.collection('items').valueChanges(); //items ist firestore-collection name
       this.store=db; //hier speichere ich die ganze angularfirestore dings
       db.collection<Array<Plan>>('tage').doc('/dienstag').valueChanges().subscribe((val:Plan)=>{
        // this.tage=val;
         console.log(val.tag);
        });

  }
}
