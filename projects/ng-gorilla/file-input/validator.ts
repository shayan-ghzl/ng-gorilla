import { AbstractControl, ValidatorFn } from '@angular/forms';
import { FileInput } from './file-input';

export class FileValidator {
    static maxContentSize(bytes: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any; } | null => {
            const size = control && control.value ? (control.value as FileInput[]).map(f => f.file.size).reduce((acc, i) => acc + i, 0) : 0;
            const condition = bytes >= size;
            return condition ? null : { maxContentSize: { actualSize: size, maxSize: bytes } };
        };
    }
}
