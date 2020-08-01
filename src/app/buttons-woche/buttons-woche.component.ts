import {
  Component,
  OnInit
} from '@angular/core';
import {
  LoginService
} from '../services/login.service';

@Component({
  selector: 'app-buttons-woche',
  templateUrl: './buttons-woche.component.html',
  styleUrls: ['./buttons-woche.component.scss']
})
export class ButtonsWocheComponent implements OnInit {
  wochentag = "montag";
  tagvorher = "montag";

  wochenTag(tag) { //Buttonclick
    this.tagvorher = this.wochentag;
    this.wochentag = tag;

    this.loginService.login();
    // this.storageService.save(this.tagvorher);
    //this.storageService.load(this.wochentag);
    //this.loginService.save(this.tagvorher);
    this.loginService.load(this.wochentag);
    //Logout
    this.loginService.logout();
  }

  constructor(
    //private storageService:StorageService,
    private loginService: LoginService) {
    this.loginService.planPushen();
    this.wochenTag('montag');
  }

  ngOnInit(): void {}
}
