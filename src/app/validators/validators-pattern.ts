import { AbstractControl } from '@angular/forms';

export class ValidatorsPattern {

    constructor() {
    }

    static alphaSpacePattern(control: AbstractControl): { [key: string]: any } | null {
        const ALPHA_SPACE = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;
        return ALPHA_SPACE.test(control.value) || control.value === ''  ? null : { alphaSpace: true };
    }

    static usernameFormatPattern(control: AbstractControl): { [key: string]: any } | null {
        const USERNAME_FORMAT = /^[A-Z]{7,12}[0-9]{3}$/;
        return USERNAME_FORMAT.test(control.value) || control.value === '' ? null : { usernameFormat: true };
    }

    static alphaNumericSpacePattern(control: AbstractControl): { [key: string]: any } | null {
        const ALPHA_NUMERIC_SPACE = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ()0-9 ]+$/;
        return ALPHA_NUMERIC_SPACE.test(control.value) || control.value === ''  ? null : { alphaNumericSpace: true };
    }
}