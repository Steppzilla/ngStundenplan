import { Component, OnInit } from '@angular/core';
import { LehrerService } from '../../services/lehrer.service';


@Component({
  selector: 'app-lehrer',
  templateUrl: './lehrer.component.html',
  styleUrls: ['./lehrer.component.scss']
})






export class LehrerComponent implements OnInit {
  lehrer;

  constructor(private lehrerservice:LehrerService) {
    this.lehrer=lehrerservice.lehrer;
   }

  ngOnInit(): void {
  }

}
