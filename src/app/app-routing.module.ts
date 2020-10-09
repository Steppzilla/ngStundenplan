import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LehrerlisteComponent } from './components/gesamtplan/gesamtplan.component';
import { RaumplanPageComponent } from './pages/raumplan-page/raumplan-page.component';


const routes: Routes = [
 // {path: '', redirectTo: 'lehrer', pathMatch:'full'},

  {path: 'lehrer', component: LehrerlisteComponent},
  {path: 'raumplan', component: RaumplanPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


