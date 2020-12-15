import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LehrerlisteComponent } from './components/gesamtplan/gesamtplan.component';
import { PlaeneComponent } from './pages/plaene/plaene.component';
import { RaumplanPageComponent } from './pages/raumplan-page/raumplan-page.component';
import { StartComponent } from './pages/start/start.component';
import {RechnerComponent} from './pages/rechner/rechner.component';
import { GesamtplanComponent } from './pages/gesamtplan/gesamtplan.component';
import { Aufgabe1Component } from './components/aufgabe1/aufgabe1.component';


const routes: Routes = [
  {path: '', redirectTo: 'aufgabe1', pathMatch:'full'},
// {path: '', component: GesamtplanComponent},
{path: "aufgabe1", component: Aufgabe1Component },
 {path: "plaene", component: PlaeneComponent },
  {path: 'gesamtplan', component: GesamtplanComponent},
  {path: 'raumplan', component: RaumplanPageComponent},
  {path: 'rechner', component: RechnerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


