import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notenrechner',
  templateUrl: './notenrechner.component.html',
  styleUrls: ['./notenrechner.component.scss']
})
export class NotenrechnerComponent implements OnInit {

  eingabe;







  onKey(event: any) { // without type info
    this.eingabe = event.target.value;
  }







  constructor() { }

  ngOnInit(): void {
  }

}
