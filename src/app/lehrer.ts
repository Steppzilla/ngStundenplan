import{Kompetenz} from "./kompetenz";
import { Lehrjahr } from './lehrjahr.enum';
import { Fach } from './fach.enum';


export interface Lehrer {
    id: number;
    name: string;
    kuerzel:string;
    anrede: string;
    faecher: Fach[];
    zuweisung: Array<[Lehrjahr,Fach]>;
    //kompetenz: Array <{fach:Fach, klassenstufe:Lehrjahr} >;
  }