import { AbstractControl } from '@angular/forms';

export function ValidationCheckboxRequired(control: AbstractControl): { [key: string]: any } | null {
        let positionSearch = control.value.indexOf(true);
        return (positionSearch >= 0) ? null : { arrayRequired: true }
}