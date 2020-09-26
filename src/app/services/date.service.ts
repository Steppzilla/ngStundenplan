import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  heute = new Date(); //aktuelles Datum und aktuelle Zeit

  
  constructor() { }
}
