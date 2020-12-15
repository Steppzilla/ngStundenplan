import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aufgabe1',
  templateUrl: './aufgabe1.component.html',
  styleUrls: ['./aufgabe1.component.scss']
})
export class Aufgabe1Component implements OnInit {
  show="hide";;
  schritt0="hide";
  schritt1="hide";
  schritt2="hide";
  schritt3="hide";
  schritt4="hide";

  loesunganzeigen(){
    this.show="show";;
  }
  schritt(zahl){
    if(zahl==0){
      this.schritt0="show";

    }else if(zahl==1){
      this.schritt1="show";
      
    }
    else if(zahl==2){
      this.schritt2="show";
      
    }
    else if(zahl==3){
      this.schritt3="show";
      
    }
    else if(zahl==4){
      this.schritt4="show";
      
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
