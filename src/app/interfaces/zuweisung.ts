import { Stunde } from "./stunde";
import { Wochentag } from "./wochentag.enum";

export interface Zuweisung {
    wochentag: Wochentag;
    stunde: Stunde ;
}
