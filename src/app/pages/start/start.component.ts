import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {



  redirect(zahl){
    if(zahl==1){
      this.router.navigate(['lehrer']);
    }
    else if(zahl==2){
      this.router.navigate(['raumplan']);
    }
  }
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
