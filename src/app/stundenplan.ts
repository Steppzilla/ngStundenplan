import { Lehrer } from './lehrer';
import { Fach } from './fach.enum';

export class Stundenplan {


    
    stundenPlan:Array<Array<Array<[Lehrer,Fach,String]>>>;
    klasse:number;  //Lehrer aktiv
    lehrer:Lehrer; //Klassen aktiv


    getTitel(){
        if(this.klasse!==undefined){
            return " Klasse " + this.klasse ;
        }else{
            return " " + this.lehrer.name;
        }

    }




}
