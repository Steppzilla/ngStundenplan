import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aufgabe1',
  templateUrl: './aufgabe1.component.html',
  styleUrls: ['./aufgabe1.component.scss']
})
export class Aufgabe1Component implements OnInit {
  show=false;
  schritt0=false;
  schritt1=false;
  schritt2=false;
  schritt3=false;
  schritt4=false;

  loesunganzeigen(){
    this.show=true;
  }
  schritt(zahl){
    if(zahl==0){
      this.schritt0=true;

    }else if(zahl==1){
      this.schritt1=true;
      
    }
    else if(zahl==2){
      this.schritt2=true;
      
    }
    else if(zahl==3){
      this.schritt3=true;
      
    }
    else if(zahl==4){
      this.schritt4=true;
      
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
