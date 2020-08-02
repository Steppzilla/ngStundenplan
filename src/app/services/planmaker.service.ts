import {
  Injectable
} from '@angular/core';
import {
  LehrerService
} from './lehrer.service';
import {
  StorageService
} from './storage.service';
import {
  Lehrer
} from '../interfaces/lehrer';
import {
  Fach
} from '../interfaces/fach.enum';
import {
  BehaviorSubject
} from 'rxjs';
import {
  Stundenplan
} from '../interfaces/stundenplan'


@Injectable({
  providedIn: 'root'
})
export class PlanmakerService {

  aktuell = new BehaviorSubject < Stundenplan > (null);
  aktuell$ = this.aktuell.asObservable();

  //aktuelle Pläne:
  montag; //Stundenraster Montag
  dienstag;
  mittwoch;
  donnerstag;
  freitag;

  planLehrer(dieserlehrer: Lehrer) {
  //  console.log(this.montag);
    let lehrerPlan = new Stundenplan();
    lehrerPlan.lehrer = dieserlehrer;

    lehrerPlan.stundenPlan = new Array(this.lehrerService.stundenanzahl).fill(null).map((r) => new Array(this.lehrerService.wochentage).fill(null).map((s) => s = []));
    this.montag.forEach((row, r) => {
      row.forEach((cell, c) => {
        cell.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            c++;
            lehrerPlan.stundenPlan[r][0].push([lehrer, fach, 'Kl.' + c]);
          }
        });
      });
    });
    this.dienstag.forEach((row, r) => {
      row.forEach((cell, c) => {
        cell.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            c++;
            lehrerPlan.stundenPlan[r][1].push([lehrer, fach, 'Kl.' + c]);
          }
        });
      });
    });
    this.mittwoch.forEach((row, r) => {
      row.forEach((cell, c) => {
        cell.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            c++;
            lehrerPlan.stundenPlan[r][2].push([lehrer, fach, 'Kl.' + c]);
          }
        });
      });
    });
    this.donnerstag.forEach((row, r) => {
      row.forEach((cell, c) => {
        cell.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            c++;
            lehrerPlan.stundenPlan[r][3].push([lehrer, fach, 'Kl.' + c]);
          }
        });
      });
    });
    this.freitag.forEach((row, r) => {
      row.forEach((cell, c) => {
        cell.forEach(([lehrer, fach]: [Lehrer, Fach]) => {
          if (lehrer.kuerzel === dieserlehrer.kuerzel) {
            c++;
            lehrerPlan.stundenPlan[r][4].push([lehrer, fach, 'Kl.' + c]); //4. zeile für freitag
          }
        });
      });
    });

    this.aktuell.next(lehrerPlan);
  }


  planKlasse(klasse: number) {
    let klassenPlan = new Stundenplan();
    klassenPlan.klasse = klasse;
    klassenPlan.stundenPlan = new Array(this.lehrerService.stundenanzahl).fill(null).map((r) => new Array(this.lehrerService.wochentage).fill(null).map((s) => s = []));
    this.montag.forEach((row, r) => {
      row[klasse - 1].forEach(([lehrer, fach]: [Lehrer, Fach]) => {
        klassenPlan.stundenPlan[r][0].push([lehrer, fach, 'Kl.' + klasse]);
      });
    });
    this.dienstag.forEach((row, r) => {
      row[klasse - 1].forEach(([lehrer, fach]: [Lehrer, Fach]) => {
        klassenPlan.stundenPlan[r][1].push([lehrer, fach, 'Kl.' + klasse]);
      });
    });
    this.mittwoch.forEach((row, r) => {
      row[klasse - 1].forEach(([lehrer, fach]: [Lehrer, Fach]) => {
        klassenPlan.stundenPlan[r][2].push([lehrer, fach, 'Kl.' + klasse]);
      });
    });
    this.donnerstag.forEach((row, r) => {
      row[klasse - 1].forEach(([lehrer, fach]: [Lehrer, Fach]) => {
        klassenPlan.stundenPlan[r][3].push([lehrer, fach, 'Kl.' + klasse]);
      });
    });
    this.freitag.forEach((row, r) => {
      row[klasse - 1].forEach(([lehrer, fach]: [Lehrer, Fach]) => {
        klassenPlan.stundenPlan[r][4].push([lehrer, fach, 'Kl.' + klasse]);
      });
    });
    this.aktuell.next(klassenPlan);
  }

  constructor(private lehrerService: LehrerService) {
    // this.aktuell.next(this.montag);
    // this.planLehrer(lehrerService.lehrer[13]);
  }
}
