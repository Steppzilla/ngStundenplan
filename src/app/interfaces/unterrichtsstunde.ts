
import { Fach } from './fach.enum';
import {Lehrer} from './lehrer';
import { Lehrjahr } from './lehrjahr.enum';
import {Raum} from './raum.enum';
import { Zuweisung } from './zuweisung';

export interface Unterrichtsstunde {

    lehrer: Lehrer[];
    faecher: Fach[];
    raum: Raum ;
    klasse: Lehrjahr;
    zuweisung: Zuweisung[];
}
