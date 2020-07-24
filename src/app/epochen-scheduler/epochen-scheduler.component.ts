import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-epochen-scheduler',
  templateUrl: './epochen-scheduler.component.html',
  styleUrls: ['./epochen-scheduler.component.scss']
})
export class EpochenSchedulerComponent implements OnInit {

  calendarLabel: string="hi";

  constructor() { }

  ngOnInit(): void {
  }

}
