import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LehrerlisteComponent } from './components/gesamtplan/gesamtplan.component';
import { LehrerComponent } from './components/lehrer/lehrer.component';
import { WochenplanComponent } from './components/wochenplan/wochenplan.component';
import { EpochenSchedulerComponent } from './components/epochen-scheduler/epochen-scheduler.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule, MomentDateAdapter } from "@angular/material-moment-adapter";

//Firebase: (import browsermodule, ngmodule, appcomponent) und:


import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';


import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
//import { AuthGuard, AuthService, NotesService, UserService } from './services';
//import{AuthGuardServiceService} from '../authg'

import { LoginService } from './services/login.service';
import { RaumplanComponent } from './components/raumplan/raumplan.component';
import { RaumplanPageComponent } from './pages/raumplan-page/raumplan-page.component';
import { StartComponent } from './pages/start/start.component';
import { PlaeneComponent } from './pages/plaene/plaene.component';
import { RechnerComponent } from './pages/rechner/rechner.component';
import { NotenrechnerComponent } from './components/notenrechner/notenrechner.component';

@NgModule({
  declarations: [
    AppComponent,
    LehrerlisteComponent,
    LehrerComponent,
    WochenplanComponent,
    EpochenSchedulerComponent,
    RaumplanComponent,
    RaumplanPageComponent,
    StartComponent,
    PlaeneComponent,
    RechnerComponent,
    NotenrechnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, //firestore
    AngularFireStorageModule, //storage
    AngularFireAuthModule, //auth
  ],
  providers: [LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
