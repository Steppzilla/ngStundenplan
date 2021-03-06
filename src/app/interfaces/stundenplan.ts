import { Lehrer } from './lehrer';
import { Fach } from './fach.enum';

export class Stundenplan {


    
    stundenPlan:Array<Array<Array<[Lehrer,Fach,string]>>>;
    klasse:number;  //Lehrer aktiv
    lehrer:Lehrer; //Klassen aktiv
    epochenPlan: Array<Array<Array<[Lehrer,Fach,string]>>>;
    rhythmusPlan:  Array<Array<Array<[Lehrer,Fach,string]>>>;
    schienenPlan: Array<Array<Array<[Lehrer,Fach,string]>>>;
    datumString: Array<Array<String>>;
    


    getTitel(){
        if(this.klasse!==undefined){
            return " Klasse " + this.klasse ;
        }else{
            return " " + this.lehrer.anrede + " " + this.lehrer.name;
        }

    }




}
