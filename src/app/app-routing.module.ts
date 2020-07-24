import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LehrerlisteComponent } from './lehrerliste/lehrerliste.component';


const routes: Routes = [
  {path: '', redirectTo: 'lehrer', pathMatch:'full'},
  {path: 'lehrer', component: LehrerlisteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


