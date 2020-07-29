import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
//import { AngularFirestore } from 'angularfire2/firestore';




@Component({
  selector: 'app-epochen-scheduler',
  templateUrl: './epochen-scheduler.component.html',
  styleUrls: ['./epochen-scheduler.component.scss']
})
export class EpochenSchedulerComponent  {

    items: Observable<any[]>;
 // constructor(private db: AngularFirestore) {
  //  const things= db.collection('items').valueChanges();
   // things.subscribe(console.log);
 // }

 

}
