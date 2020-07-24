import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-buttons-woche',
  templateUrl: './buttons-woche.component.html',
  styleUrls: ['./buttons-woche.component.scss']
})
export class ButtonsWocheComponent implements OnInit {
  wochentag="Montag";
  tagvorher="Montag";

  wochenTag(tag){  //Buttonclick
    this.tagvorher=this.wochentag;
    this.wochentag=tag;
    this.storageService.save(this.tagvorher);
    this.storageService.load(this.wochentag);


       //nachm load neu färben:
   //console.log(this.storageService.gefaerbteCells);

  }



  constructor(private storageService:StorageService) { 
    this.storageService.load(this.tagvorher);//Montag wird geladen
  }
    
  ngOnInit(): void {
  }

}
