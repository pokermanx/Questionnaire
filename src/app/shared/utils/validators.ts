import { AbstractControl, FormControl, Validators } from '@angular/forms';

const noWhiteSpace = (control: FormControl) => {
    let isWhitespace = typeof control.value === 'string' ? (control.value || '').trim().length === 0 : false;
    let isValid = !isWhitespace;
    return isValid ? null : { required: true };
};

export const requiredNoWhiteSpace = [
    Validators.required,
    noWhiteSpace
];

export const checkMadeChoice = () => {
    return (AC: AbstractControl) => {
        return Object.values(AC.value).some(x => x)
            ? null
            : { required: true };
    };
}