import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LehrerlisteComponent } from './lehrerliste/lehrerliste.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LehrerComponent } from './lehrer/lehrer.component';
import { ButtonComponent } from './button/button.component';
import { WochenplanComponent } from './wochenplan/wochenplan.component';
import { ButtonsWocheComponent } from './buttons-woche/buttons-woche.component';
import { EpochenSchedulerComponent } from './epochen-scheduler/epochen-scheduler.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule, MomentDateAdapter } from "@angular/material-moment-adapter";

//Firebase: (import browsermodule, ngmodule, appcomponent) und:

//import { AngularFirestoreModule } from 'angularfire2/firestore';
//import { AngularFireModule } from 'angularfire2';
//import { environment } from '../environments/environment';
//import {AngularFireAuthModule} from '@angular/fire/auth';




@NgModule({
  declarations: [
    AppComponent,
    LehrerlisteComponent,
    LehrerComponent,
    ButtonComponent,
    WochenplanComponent,
    ButtonsWocheComponent,
    EpochenSchedulerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
  //  AngularFireModule.initializeApp(environment.firebase),
   // AngularFirestoreModule, //storage
  //  AngularFirestoreModule, //firestore
  ///  AngularFireAuthModule, //auth
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
