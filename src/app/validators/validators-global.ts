import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
export class ValidatorsGlobal {
    static valueMin(parameter: number) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            return control.value > parameter || control.value === '' ? null : { valueMin: true };
        }
    }
}