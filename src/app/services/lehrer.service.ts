import {
  Injectable
} from '@angular/core';
import {
  Lehrer
} from '../interfaces/lehrer';
import {
  Fach
} from '../interfaces/fach.enum';
import {
  Lehrjahr
} from '../interfaces/lehrjahr.enum';
import {
  BehaviorSubject
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LehrerService {
  stundenanzahl = 10;
  klassen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  stundenRaster = new BehaviorSubject < Array < Array < Array < [Lehrer, Fach] >>> > (null);
  stundenRaster$ = this.stundenRaster.asObservable();
 // alleStundenRaster: Array < Array < Array < Array < [Lehrer, Fach] >>> >= []; im planmaker
  //

  //stundenRaster:  = new Array(this.stundenanzahl).fill(null).map((r) => r = new Array(this.klassenanzahl).fill(null).map((s) => s = []));
  wochentage = 5;

  lehrer: Lehrer[] = [

    {
      id: 0,
      name: ' ',
      kuerzel: ' ',
      anrede: " ",
      faecher: [],
      zuweisung: [
      ]
    },

    {
      id: 1,
      name: 'Bayas',
      kuerzel: 'By',
      anrede: "Herr",
      faecher: [Fach.mathematik, Fach.physik],
      zuweisung: [
        [Lehrjahr.neun, Fach.mathematik],
        [Lehrjahr.neun, Fach.physik],
        [Lehrjahr.zehn, Fach.physik],
        [Lehrjahr.elf, Fach.physik],
        [Lehrjahr.zwoelf, Fach.physik],
        [Lehrjahr.elf, Fach.mathematik],
      ]
    },
    {
      id: 2,
      name: 'Clement',
      kuerzel: 'Cle',
      anrede: "Frau",
      faecher: [Fach.klassenbetreuer, Fach.handarbeit],
      zuweisung: [
        [Lehrjahr.sechs, Fach.handarbeit],
        [Lehrjahr.sieben, Fach.handarbeit],
        [Lehrjahr.acht, Fach.handarbeit],
        [Lehrjahr.zehn, Fach.biologie],
        [Lehrjahr.elf, Fach.biologie],
      ]
    },
    {
      id: 3,
      name: 'Crone',
      kuerzel: 'Cr',
      anrede: "Frau",
      faecher: [Fach.chemie],
      zuweisung: [
        [Lehrjahr.neun, Fach.chemie],
        [Lehrjahr.zehn, Fach.chemie],
        [Lehrjahr.elf, Fach.chemie],
        [Lehrjahr.zwoelf, Fach.chemie]

      ]
    },
    {
      id: 4,
      name: 'Claußen',
      kuerzel: 'Cla',
      anrede: "Frau",
      faecher: [],
      zuweisung: [
        [Lehrjahr.dreizehn, Fach.mathematik],
        [Lehrjahr.zwoelf, Fach.mathematik],
        [Lehrjahr.zehn, Fach.kunst],
        [Lehrjahr.elf, Fach.kunst],
        [Lehrjahr.zwoelf, Fach.kunst],
        [Lehrjahr.neun, Fach.kunst],
        [Lehrjahr.zehn, Fach.kunst],
      ]
    },
    {
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
      name: 'Funke',
      kuerzel: 'Fun',
      anrede: "Frau",
      faecher: [Fach.gartenbau],
      zuweisung: [
        // [Lehrjahr.acht, Fach.gartenbau],
        [Lehrjahr.neun, Fach.gartenbau],
        [Lehrjahr.neun, Fach.landbau],
        [Lehrjahr.sechs, Fach.gartenbau],
        [Lehrjahr.sieben, Fach.gartenbau],
        [Lehrjahr.acht, Fach.gartenbau],
      ]
    },
    {
      id: 9,
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
      id: 10,
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
      id: 11,
      name: 'Haarmeier',
      kuerzel: 'Hm',
      anrede: "Herr",
      faecher: [Fach.schmieden],
      zuweisung: [
        [Lehrjahr.neun, Fach.schmieden],
        [Lehrjahr.zehn, Fach.schmieden]
      ]
    },
    {
      id: 12,
      name: 'Häggmark',
      kuerzel: 'Hä',
      anrede: "Herr",
      faecher: [Fach.eurythmie],
      zuweisung: [
        [Lehrjahr.eins, Fach.eurythmie],
        [Lehrjahr.drei, Fach.eurythmie],
        [Lehrjahr.sieben, Fach.eurythmie],
        [Lehrjahr.zehn, Fach.eurythmie],
        [Lehrjahr.elf, Fach.eurythmie],
      ]
    },
    {
      id: 13,
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
      id: 14,
      name: 'Kießig',
      kuerzel: 'Ki',
      anrede: "Frau",
      faecher: [Fach.hauptunterricht],
      zuweisung: [
        //[Lehrjahr.eins, Fach.hauptunterricht],
        [Lehrjahr.zwei, Fach.handarbeit],
        [Lehrjahr.zwei, Fach.englisch],
        [Lehrjahr.drei, Fach.handarbeit],
        [Lehrjahr.drei, Fach.englisch],
        [Lehrjahr.fuenf, Fach.hauptunterricht],
        [Lehrjahr.fuenf, Fach.uebstunde],
      ]
    },
    {
      id: 15,
      name: 'Keyifci',
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
      id: 16,
      name: 'Loth',
      kuerzel: 'Lo',
      anrede: "Frau",
      faecher: [Fach.plastizieren],
      zuweisung: [
        [Lehrjahr.neun, Fach.plastizieren],
        [Lehrjahr.neun, Fach.deutsch],
        [Lehrjahr.neun, Fach.geschichte],
        [Lehrjahr.neun, Fach.klassenbetreuer],
        [Lehrjahr.elf, Fach.plastizieren],
        [Lehrjahr.zwoelf, Fach.plastizieren],
        [Lehrjahr.zwoelf, Fach.kunstgeschichte],
        [Lehrjahr.zwoelf, Fach.kunstfahrt], //weil kunstgeschichte
        [Lehrjahr.zehn, Fach.plastizierenR]
      ]
    },
    // { id: 15, name: 'Luley', kuerzel: 'Lu', anrede: "Frau"  , faecher: [Fac]},
    {
      id: 17,
      name: 'Neher',
      kuerzel: 'Ne',
      anrede: "Herr",
      faecher: [Fach.eurythmie],
      zuweisung: [
        [Lehrjahr.zwei, Fach.eurythmie],
        [Lehrjahr.sechs, Fach.eurythmie],
        [Lehrjahr.sieben, Fach.eurythmie],
        [Lehrjahr.acht, Fach.eurythmie],
        [Lehrjahr.neun, Fach.eurythmie],
        [Lehrjahr.zwoelf, Fach.eurythmie],
        [Lehrjahr.zwoelf, Fach.klassenbetreuer],
        [Lehrjahr.zwoelf, Fach.klassenspiel], //weil klassenbetreuer
      ]
    },
    {
      id: 18,
      name: 'Nüßgen-Langbehn',
      kuerzel: 'Lb',
      anrede: "Frau",
      faecher: [Fach.biologie, Fach.weben],
      zuweisung: [
        [Lehrjahr.vier, Fach.handarbeit],
        [Lehrjahr.neun, Fach.weben],

        [Lehrjahr.neun, Fach.biologie],
        [Lehrjahr.zehn, Fach.weben],
        [Lehrjahr.dreizehn, Fach.biologie],
        [Lehrjahr.zwoelf, Fach.biologie],
        [Lehrjahr.elf, Fach.weben],
        [Lehrjahr.zwoelf, Fach.weben],
      ]
    },
    {
      id: 19,
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
        [Lehrjahr.elf, Fach.sozialpraktikum], //weil klassenbetreuer
        [Lehrjahr.elf, Fach.klassenspielvorbereitung],//weil klassenlehrer
        [Lehrjahr.zwoelf, Fach.sport]
      ]
    },
    {
      id: 20,
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
        [Lehrjahr.zwoelf, Fach.musik],

      ]
    },
    //{ id: 18, name: 'Piaskowski', kuerzel: 'FPi', anrede: "Frau", faecher: [Fach]  },
    {
      id: 21,
      name: 'Reichl',
      kuerzel: 'Rei',
      anrede: "Herr",
      faecher: [Fach.franzoesisch],
      zuweisung: []
    },
    {
      id: 22,
      name: 'Rosemann-Poch',
      kuerzel: 'RoP',
      anrede: "Herr",
      faecher: [Fach.werken],
      zuweisung: [
        [Lehrjahr.sechs, Fach.werken],
        [Lehrjahr.neun, Fach.werken],
        [Lehrjahr.zehn, Fach.feldmessen],
        [Lehrjahr.sieben, Fach.werken],
        [Lehrjahr.acht, Fach.werken],
        [Lehrjahr.neun, Fach.klassenbetreuer],
      ]
    },
    {
      id: 23,
      name: 'Santa',
      kuerzel: 'San',
      anrede: "Frau",
      faecher: [Fach.franzoesisch, Fach.musik],
      zuweisung: [
        [Lehrjahr.neun, Fach.franzoesisch],
        [Lehrjahr.zwei, Fach.franzoesisch],
        [Lehrjahr.sechs, Fach.musik],
        [Lehrjahr.dreizehn, Fach.franzoesisch],
        [Lehrjahr.neun, Fach.musik],
        [Lehrjahr.zehn, Fach.musik],
        [Lehrjahr.elf, Fach.musik],
        [Lehrjahr.zwoelf, Fach.musik],
      ]
    },
    {
      id: 24,
      name: 'Scheunemann',
      kuerzel: 'Sc',
      anrede: "Herr",
      faecher: [Fach.musik],
      zuweisung: [
        [Lehrjahr.sieben, Fach.musik],
        [Lehrjahr.zehn, Fach.musik],
        [Lehrjahr.acht, Fach.musik],
        [Lehrjahr.elf, Fach.wirtschaftspolitik],
        [Lehrjahr.zwoelf, Fach.wirtschaftspolitik],
        [Lehrjahr.zwoelf, Fach.musik]
      ]
    },
    {
      id: 25,
      name: 'Schmidt',
      kuerzel: 'Sm',
      anrede: "Frau",
      faecher: [Fach.hauptunterricht],
      zuweisung: [
        [Lehrjahr.vier, Fach.hauptunterricht],
        [Lehrjahr.vier, Fach.uebstunde],
        [Lehrjahr.vier, Fach.musik],
        [Lehrjahr.zehn, Fach.geographie],
        [Lehrjahr.elf, Fach.geographie],
        [Lehrjahr.zwoelf, Fach.geographie],
      ]
    },
    {
      id: 26,
      name: 'Sodemann',
      kuerzel: 'Sod',
      anrede: "Frau",
      faecher: [Fach.deutsch],
      zuweisung: [
        [Lehrjahr.neun, Fach.deutschR],
        [Lehrjahr.neun, Fach.kunstgeschichte],
        [Lehrjahr.zehn, Fach.deutsch],
        [Lehrjahr.zehn, Fach.poetik], //weil deutsch
        [Lehrjahr.zehn, Fach.geschichte],
        [Lehrjahr.zehn, Fach.klassenbetreuer],
        [Lehrjahr.zehn, Fach.feldmessen],
        [Lehrjahr.dreizehn, Fach.deutsch],
        [Lehrjahr.dreizehn, Fach.geschichte],
//als Mitverantwortliche für die mündliche Prüfungswoche stellvertretend:
        [Lehrjahr.neun, Fach.pruefung],
        [Lehrjahr.zehn, Fach.pruefung],
        [Lehrjahr.elf, Fach.pruefung],
        [Lehrjahr.zwoelf, Fach.pruefung],
        //projektwoche:
        [Lehrjahr.neun, Fach.projektwoche],
        [Lehrjahr.zehn, Fach.projektwoche],
        [Lehrjahr.elf, Fach.projektwoche],
        [Lehrjahr.zwoelf, Fach.projektwoche],
        [Lehrjahr.elf, Fach.poetik],
      ]
    },
    {
      id: 27,
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
      id: 28,
      name: 'Sternberg',
      kuerzel: 'Ste',
      anrede: "Herr",
      faecher: [Fach.deutsch],
      zuweisung: [
        [Lehrjahr.neun, Fach.deutsch],
        [Lehrjahr.neun, Fach.geschichte],
      //  [Lehrjahr.zehn, Fach.geschichte],
        [Lehrjahr.elf, Fach.geschichte],
        [Lehrjahr.elf, Fach.deutsch],
        [Lehrjahr.elf, Fach.klassenbetreuer],
        [Lehrjahr.elf, Fach.sozialpraktikum],//weil klassenlehrer
        [Lehrjahr.elf, Fach.klassenspielvorbereitung],//weil klassenlehrer
        [Lehrjahr.zwoelf, Fach.deutsch],
        [Lehrjahr.zwoelf, Fach.geschichte],
        [Lehrjahr.dreizehn, Fach.deutsch],

      ]
    },
    {
      id: 29,
      name: 'Stuchlik',
      kuerzel: 'Stk',
      anrede: "Herr",
      faecher: [Fach.musik],
      zuweisung: [
        [Lehrjahr.fuenf, Fach.musik],
        [Lehrjahr.acht, Fach.musik],
        [Lehrjahr.acht, Fach.hauptunterricht],
        [Lehrjahr.acht, Fach.uebstunde],
        [Lehrjahr.zehn, Fach.computer],
      ]
    },
    {
      id: 30,
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
      id: 31,
      name: 'Wohlers',
      kuerzel: 'Wo',
      anrede: "Frau",
      faecher: [Fach.mathematik, Fach.musik],
      zuweisung: [
        [Lehrjahr.zehn, Fach.mathematik],
        [Lehrjahr.zehn, Fach.computer],
        [Lehrjahr.zwoelf, Fach.mathematik],
        [Lehrjahr.vier, Fach.musik],
        [Lehrjahr.dreizehn, Fach.mathematik],
      ]
    },
    {
      id: 32,
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
      id: 33,
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
    {
      id: 34,
      name: 'Jöhnk',
      kuerzel: 'Jö',
      anrede: "Frau",
      faecher: [Fach.handarbeit],
      zuweisung: [
        [Lehrjahr.eins, Fach.handarbeit],
        [Lehrjahr.zwei, Fach.handarbeit],
        [Lehrjahr.fuenf, Fach.handarbeit],

      ]
    },
    {
      id: 35,
      name: 'Schilling (Prakt.)',
      kuerzel: 'Si',
      anrede: "Frau",
      faecher: [Fach.handarbeit],
      zuweisung: [
        [Lehrjahr.vier, Fach.handarbeit],
        [Lehrjahr.neun, Fach.geographie]
      ]
    },
    {
      id: 36,
      name: 'Piaskowski',
      kuerzel: 'Pi',
      anrede: "Herr",
      faecher: [Fach.sport],
      zuweisung: [
        [Lehrjahr.dreizehn, Fach.sport],
        [Lehrjahr.neun, Fach.sport],
        [Lehrjahr.zehn, Fach.sport],
      ]
    },

  ];



  createEmptyStundenraster() {
    return new Array(this.stundenanzahl).fill(null).map(
      (r) => r = new Array(this.klassen.length).fill(null).map(
        (s) => s = []));
  }

  constructor() {
    this.stundenRaster.next(this.createEmptyStundenraster());
  }
}
