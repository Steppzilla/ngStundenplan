import {
  Injectable
} from '@angular/core';
import {
  Lehrer
} from './lehrer';
import {
  Fach
} from './fach.enum';
import {
  Lehrjahr
} from './lehrjahr.enum';
import {
  Kompetenz
} from './kompetenz';
import {
  ButtonComponent
} from './button/button.component';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';
import { Plan } from './interfaces/plan';

@Injectable({
  providedIn: 'root'
})
export class LehrerService {
  stundenanzahl = 10;
  klassen = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  stundenRaster=new BehaviorSubject <Array < Array < Array < [Lehrer, Fach] >>>>(null);
  stundenRaster$=this.stundenRaster.asObservable();
  alleStundenRaster:Array<Array<Array<Array<[Lehrer,Fach]>>>>=[];
  //

    //stundenRaster:  = new Array(this.stundenanzahl).fill(null).map((r) => r = new Array(this.klassenanzahl).fill(null).map((s) => s = []));
  wochentage=5;
  
  lehrer: Lehrer[] = [
   
    {
      id: 32,
      name: 'Ba',
      kuerzel: 'Ba',
      anrede: "Herr",
      faecher: [Fach.mathematik, Fach.physik],
      zuweisung: [
        [Lehrjahr.neun, Fach.mathematik],
        [Lehrjahr.neun, Fach.physik],
        [Lehrjahr.elf, Fach.mathematik],
      ]
    },
    {
      id: 35,
      name: 'Clement',
      kuerzel: 'Cle',
      anrede: "Frau",
      faecher: [Fach.klassenbetreuer, Fach.handarbeit],
      zuweisung: [
        [Lehrjahr.sechs, Fach.handarbeit],
        [Lehrjahr.sieben, Fach.handarbeit],
        [Lehrjahr.acht, Fach.handarbeit],
      ]
    },
    {
      id: 1,
      name: 'Crone',
      kuerzel: 'Cr',
      anrede: "Frau",
      faecher: [Fach.chemie],
      zuweisung: [
        [Lehrjahr.neun, Fach.chemie]
      ]
    },
    {
      id: 2,
      name: 'Claußen',
      kuerzel: 'Cla',
      anrede: "Frau",
      faecher: [],
      zuweisung: [
        [Lehrjahr.dreizehn, Fach.mathematik],
        [Lehrjahr.zehn, Fach.kunst],
        [Lehrjahr.elf, Fach.kunst],
        [Lehrjahr.zwoelf, Fach.kunst],
      ]
    },
    {
      id: 34,
      name: 'Corsten',
      kuerzel: 'Co',
      anrede: "Frau",
      faecher: [],
      zuweisung: [
        [Lehrjahr.zwei, Fach.hauptunterricht],
        [Lehrjahr.zwei, Fach.uebstunde],
        [Lehrjahr.zwei, Fach.musik]
      ]
    },
    // { id: 3, name: 'Dittmann', kuerzel: 'Dit', anrede: "Frau", facher:  },
    {
      id: 4,
      name: 'Ehrhardt',
      kuerzel: 'Eh',
      anrede: "Frau",
      faecher: [Fach.englisch],
      zuweisung: [
        [Lehrjahr.sieben, Fach.englisch],
        [Lehrjahr.neun, Fach.englisch],
        [Lehrjahr.elf, Fach.englisch],
        [Lehrjahr.zwoelf, Fach.englisch],
        [Lehrjahr.dreizehn, Fach.englisch],
        
      ]
    },
    {
      id: 5,
      name: 'Frank',
      kuerzel: 'Fr',
      anrede: "Frau",
      faecher: [Fach.franzoesisch],
      zuweisung: [
        [Lehrjahr.eins, Fach.franzoesisch],
        [Lehrjahr.vier, Fach.franzoesisch],
        [Lehrjahr.acht, Fach.franzoesisch],
        [Lehrjahr.elf, Fach.franzoesisch],
        [Lehrjahr.zwoelf, Fach.franzoesisch],
        [Lehrjahr.zwoelf, Fach.klassenbetreuer],
      ]
    },
    // { id: 6, name: 'Fucke', kuerzel: 'Fu'  , anrede: "Frau" , faecher: [Fach.]},
    {
      id: 7,
      name: 'Funke',
      kuerzel: 'Fun',
      anrede: "Frau",
      faecher: [Fach.gartenbau],
      zuweisung: [
       // [Lehrjahr.acht, Fach.gartenbau],
        [Lehrjahr.neun, Fach.gartenbau],
        [Lehrjahr.sechs, Fach.gartenbau],
        [Lehrjahr.sieben, Fach.gartenbau],
        [Lehrjahr.acht, Fach.gartenbau],
      ]
    },
    {
      id: 8,
      name: 'Gretsch',
      kuerzel: 'Gre',
      anrede: "Frau",
      faecher: [Fach.geographie],
      zuweisung: [
        [Lehrjahr.dreizehn, Fach.geographie],
        [Lehrjahr.dreizehn, Fach.kunst]
      ]
    },
    {
      id: 9,
      name: 'Güldenpenning',
      kuerzel: 'Gü',
      anrede: "Frau",
      faecher: [Fach.hauptunterricht],
      zuweisung: [
        [Lehrjahr.eins, Fach.handarbeit],
        [Lehrjahr.drei, Fach.religion],
        [Lehrjahr.fuenf, Fach.religion],
        [Lehrjahr.fuenf, Fach.handarbeit],
        [Lehrjahr.sechs, Fach.hauptunterricht],
        [Lehrjahr.sechs, Fach.religion],
        [Lehrjahr.sechs, Fach.uebstunde],
      ]
    },
    {
      id: 10,
      name: 'Haarmeier',
      kuerzel: 'Hm',
      anrede: "Herr",
      faecher: [Fach.schmieden],
      zuweisung: [
        [Lehrjahr.neun, Fach.schmieden]
      ]
    },
    {
      id: 11,
      name: 'Häggmark',
      kuerzel: 'Hä',
      anrede: "Herr",
      faecher: [Fach.eurythmie],
      zuweisung: [
        [Lehrjahr.drei, Fach.eurythmie],
        [Lehrjahr.sieben, Fach.eurythmie],
        [Lehrjahr.zehn, Fach.eurythmie],
        [Lehrjahr.elf, Fach.eurythmie],
      ]
    },
    {
      id: 12,
      name: 'Hertinger',
      kuerzel: 'He',
      anrede: "Frau",
      faecher: [Fach.ethik, Fach.hauptunterricht],
      zuweisung: [
        [Lehrjahr.eins, Fach.religion],
        [Lehrjahr.zwei, Fach.religion],
        [Lehrjahr.vier, Fach.religion],
        [Lehrjahr.sieben, Fach.uebstunde],
        [Lehrjahr.acht, Fach.religion],
        [Lehrjahr.neun, Fach.ethik],
        [Lehrjahr.zehn, Fach.ethik],
        [Lehrjahr.elf, Fach.ethik],
        [Lehrjahr.zwoelf, Fach.ethik],
        [Lehrjahr.sieben, Fach.hauptunterricht],
      ]
    },
    {
      id: 13,
      name: 'Kießig',
      kuerzel: 'Ki',
      anrede: "Frau",
      faecher: [Fach.hauptunterricht],
      zuweisung: [
        [Lehrjahr.eins, Fach.hauptunterricht],
        [Lehrjahr.zwei, Fach.handarbeit],
        [Lehrjahr.zwei, Fach.englisch],
        [Lehrjahr.drei, Fach.handarbeit],
        [Lehrjahr.drei, Fach.englisch],
        [Lehrjahr.fuenf, Fach.hauptunterricht],
        [Lehrjahr.fuenf, Fach.uebstunde],
      ]
    },
    {
      id: 36,
      name: 'Ke',
      kuerzel: 'Ke',
      anrede: "Frau",
      faecher: [Fach.hauptunterricht],
      zuweisung: [
        [Lehrjahr.eins, Fach.hauptunterricht],
        [Lehrjahr.eins, Fach.englisch],
        [Lehrjahr.eins, Fach.uebstunde],
        [Lehrjahr.eins, Fach.eurythmie],
        [Lehrjahr.vier, Fach.englisch],
      ]
    },
    {
      id: 14,
      name: 'Loth',
      kuerzel: 'Lo',
      anrede: "Frau",
      faecher: [Fach.plastizieren],
      zuweisung: [
        [Lehrjahr.neun, Fach.plastizieren],
        [Lehrjahr.neun, Fach.deutsch],
        [Lehrjahr.neun, Fach.klassenbetreuer],
        [Lehrjahr.elf, Fach.plastizieren],
        [Lehrjahr.zwoelf, Fach.plastizieren],
        [Lehrjahr.zehn, Fach.plastizierenR]
      ]
    },
    // { id: 15, name: 'Luley', kuerzel: 'Lu', anrede: "Frau"  , faecher: [Fac]},
    {
      id: 38,
      name: 'Neher',
      kuerzel: 'Ne',
      anrede: "Herr",
      faecher: [Fach.eurythmie],
      zuweisung: [
        [Lehrjahr.zwei, Fach.eurythmie],
        [Lehrjahr.sechs, Fach.eurythmie],
        [Lehrjahr.acht, Fach.eurythmie],
        [Lehrjahr.neun, Fach.eurythmie],
        [Lehrjahr.zwoelf, Fach.eurythmie],
        [Lehrjahr.zwoelf, Fach.klassenbetreuer],
      ]
    },
    {
      id: 40,
      name: 'Nüßgen-Langbehn',
      kuerzel: 'Lb',
      anrede: "Frau",
      faecher: [Fach.biologie, Fach.weben],
      zuweisung: [
        [Lehrjahr.vier, Fach.handarbeit],
        [Lehrjahr.neun, Fach.weben],
        [Lehrjahr.dreizehn, Fach.biologie],
        [Lehrjahr.zwoelf, Fach.biologie],
        [Lehrjahr.elf, Fach.weben],
        [Lehrjahr.zwoelf, Fach.weben],
      ]
    },
    {
      id: 16,
      name: 'Pagallies-Meincke',
      kuerzel: 'PM',
      anrede: "Frau",
      faecher: [Fach.sport],
      zuweisung: [
        [Lehrjahr.drei, Fach.sport],
        [Lehrjahr.vier, Fach.sport],
        [Lehrjahr.fuenf, Fach.sport],
        [Lehrjahr.sechs, Fach.sport],
        [Lehrjahr.sieben, Fach.sport],
        [Lehrjahr.acht, Fach.sport],
        [Lehrjahr.neun, Fach.sport],
        [Lehrjahr.zehn, Fach.sport],
        [Lehrjahr.elf, Fach.sport],
        [Lehrjahr.elf, Fach.klassenbetreuer],
        [Lehrjahr.zwoelf, Fach.sport]
      ]
    },
    {
      id: 17,
      name: 'Pahnke',
      kuerzel: 'Pa',
      anrede: "Herr",
      faecher: [Fach.musik],
      zuweisung: [
        [Lehrjahr.eins, Fach.musik],
        [Lehrjahr.drei, Fach.musik],
        [Lehrjahr.neun, Fach.musik],
        [Lehrjahr.elf, Fach.musik],
        [Lehrjahr.dreizehn, Fach.musik],
        
      ]
    },
    //{ id: 18, name: 'Piaskowski', kuerzel: 'FPi', anrede: "Frau", faecher: [Fach]  },
    {
      id: 19,
      name: 'Reichl',
      kuerzel: 'Rei',
      anrede: "Herr",
      faecher: [Fach.franzoesisch],
      zuweisung: []
    },
    {
      id: 20,
      name: 'Rosemann-Poch',
      kuerzel: 'RoP',
      anrede: "Herr",
      faecher: [Fach.werken],
      zuweisung: [
        [Lehrjahr.sechs, Fach.werken],
        [Lehrjahr.neun, Fach.werken],
        [Lehrjahr.sieben, Fach.werken],
        [Lehrjahr.acht, Fach.werken],
        [Lehrjahr.neun, Fach.klassenbetreuer],
      ]
    },
    {
      id: 21,
      name: 'Santa',
      kuerzel: 'San',
      anrede: "Frau",
      faecher: [Fach.franzoesisch, Fach.musik],
      zuweisung: [
        [Lehrjahr.neun, Fach.franzoesisch],
        [Lehrjahr.zwei, Fach.franzoesisch],
        [Lehrjahr.sechs, Fach.musik],
        [Lehrjahr.dreizehn, Fach.franzoesisch]
      ]
    },
    {
      id: 22,
      name: 'Scheunemann',
      kuerzel: 'Sc',
      anrede: "Herr",
      faecher: [Fach.musik],
      zuweisung: [
        [Lehrjahr.sieben, Fach.musik],
        [Lehrjahr.zehn, Fach.musik],
        [Lehrjahr.acht, Fach.musik],
        [Lehrjahr.zwoelf, Fach.wirtschaftspolitik],
        [Lehrjahr.zwoelf, Fach.musik]
      ]
    },
    {
      id: 23,
      name: 'Schmidt',
      kuerzel: 'Sm',
      anrede: "Frau",
      faecher: [Fach.hauptunterricht],
      zuweisung: [
        [Lehrjahr.vier, Fach.hauptunterricht],
        [Lehrjahr.vier, Fach.uebstunde],
        [Lehrjahr.vier, Fach.musik],
      ]
    },
    {
      id: 24,
      name: 'Sodemann',
      kuerzel: 'Sod',
      anrede: "Frau",
      faecher: [Fach.deutsch],
      zuweisung: [
        [Lehrjahr.neun, Fach.deutschR],
        [Lehrjahr.zehn, Fach.deutsch],
        [Lehrjahr.zehn, Fach.klassenbetreuer],
        [Lehrjahr.dreizehn, Fach.deutsch],
        [Lehrjahr.dreizehn, Fach.geschichte]
      ]
    },
    {
      id: 25,
      name: 'Sommer',
      kuerzel: 'So',
      anrede: "Frau",
      faecher: [Fach.englisch],
      zuweisung: [
       // [Lehrjahr.sechs, Fach.englisch],
        [Lehrjahr.fuenf, Fach.englisch],
        [Lehrjahr.sechs, Fach.englisch],
     //   [Lehrjahr.sieben, Fach.englisch],
        [Lehrjahr.acht, Fach.englisch],
        [Lehrjahr.zehn, Fach.englisch],
      ]
    },
    {
      id: 26,
      name: 'Sternberg',
      kuerzel: 'Ste',
      anrede: "Herr",
      faecher: [Fach.deutsch],
      zuweisung: [
        [Lehrjahr.neun, Fach.deutsch],
        [Lehrjahr.elf, Fach.geschichte],
        [Lehrjahr.elf, Fach.deutsch],
        [Lehrjahr.elf, Fach.klassenbetreuer],
        [Lehrjahr.zwoelf, Fach.deutsch],
        [Lehrjahr.dreizehn, Fach.deutsch],
        
      ]
    },
    {
      id: 27,
      name: 'Stuchlik',
      kuerzel: 'Stk',
      anrede: "Herr",
      faecher: [Fach.musik],
      zuweisung: [
        [Lehrjahr.fuenf, Fach.musik],
        [Lehrjahr.acht, Fach.hauptunterricht],
        [Lehrjahr.acht, Fach.uebstunde],
        [Lehrjahr.zehn, Fach.computer],
      ]
    },
    {
      id: 28,
      name: 'Waligorski-Sell',
      kuerzel: 'Wa',
      anrede: "Frau",
      faecher: [Fach.hauptunterricht],
      zuweisung: [
        [Lehrjahr.drei, Fach.hauptunterricht],
        [Lehrjahr.drei, Fach.uebstunde],
        [Lehrjahr.eins, Fach.spielturnen],
        [Lehrjahr.zwei, Fach.spielturnen],
        [Lehrjahr.fuenf, Fach.griechisch],
        [Lehrjahr.sechs, Fach.latein],
        [Lehrjahr.sieben, Fach.religion],
      ]
    },
    {
      id: 29,
      name: 'Wohlers',
      kuerzel: 'Wo',
      anrede: "Frau",
      faecher: [Fach.mathematik, Fach.musik],
      zuweisung: [
        [Lehrjahr.zehn, Fach.mathematik],
        [Lehrjahr.zwoelf, Fach.mathematik],
      ]
    },
    {
      id: 30,
      name: 'Zenker',
      kuerzel: 'Ze',
      anrede: "Frau",
      faecher: [Fach.franzoesisch],
      zuweisung: [
        [Lehrjahr.drei, Fach.franzoesisch],
        [Lehrjahr.fuenf, Fach.franzoesisch],
        [Lehrjahr.sechs, Fach.franzoesisch],
        [Lehrjahr.sieben, Fach.franzoesisch],
        [Lehrjahr.zehn, Fach.franzoesisch],
      ]
    },
    {
      id: 31,
      name: 'Zwierlein',
      kuerzel: 'Zw',
      anrede: "Frau",
      faecher: [Fach.religion],
      zuweisung: [
        [Lehrjahr.eins, Fach.religion],
        [Lehrjahr.zwei, Fach.religion],
        [Lehrjahr.drei, Fach.religion],
        [Lehrjahr.vier, Fach.religion],
        [Lehrjahr.fuenf, Fach.religion],
        [Lehrjahr.sechs, Fach.religion],
        [Lehrjahr.sieben, Fach.religion],
        [Lehrjahr.acht, Fach.religion],
      ]
    },
  ];


  französisch = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
  hauptUnterrischt = [];

  zuweisungKlasseFach = new Array();

  createEmptyStundenraster(){
    return new Array(this.stundenanzahl).fill(null).map(
      (r) =>     r = new Array(this.klassen.length).fill(null).map(
        (s) => s = []));
  }

  constructor() {
    this.stundenRaster.next(this.createEmptyStundenraster());
    //this.alleStundenRaster = new Array(this.wochentage).fill(null).map(
   //   (f)=> f=  new Array (this.stundenanzahl).fill(null).map((r) => r = new Array(this.klassen.length).fill(null).map((s) => s = []))
   // );

    //stundenRaster:  = new Array(this.stundenanzahl).fill(null).map((r) => r = new Array(this.klassenanzahl).fill(null).map((s) => s = []));

  }
}
