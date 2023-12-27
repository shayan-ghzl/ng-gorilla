import { Directive, Input, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { FileInput } from './file-input';

export class FileValidator {
    static maxContentSize(bytes: number): ValidatorFn {
        return maxContentSizeValidator(bytes);
    }
}

const MAX_CONTENT_SIZE_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MaxContentSizeValidator),
    multi: true
};

@Directive({
    selector: '[maxContentSize][formControlName],[maxContentSize][formControl],[maxContentSize][ngModel]',
    providers: [MAX_CONTENT_SIZE_VALIDATOR],
    host: { '[attr.maxContentSize]': '_enabled ? maxContentSize : null' },
    standalone: true
})
export class MaxContentSizeValidator implements Validator, OnChanges {

    private _validator: ValidatorFn = nullValidator;
    private _onChange!: () => void;

    /**
     * A flag that tracks whether this validator is enabled.
     *
     * Marking it `internal` (vs `protected`), so that this flag can be used in host bindings of
     * directive classes that extend this base class.
     * @internal
     */
    _enabled?: boolean;

    ngOnChanges(changes: SimpleChanges): void {
        if (this.inputName in changes) {
            const input = this.normalizeInput(changes[this.inputName].currentValue);
            this._enabled = this.enabled(input);
            this._validator = this._enabled ? this.createValidator(input) : nullValidator;
            if (this._onChange) {
                this._onChange();
            }
        }
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this._validator(control);
    }

    registerOnValidatorChange(fn: () => void): void {
        this._onChange = fn;
    }

    /**
     * @description
     * Determines whether this validator should be active or not based on an input.
     * Base class implementation checks whether an input is defined (if the value is different from
     * `null` and `undefined`). Validator classes that extend this base class can override this
     * function with the logic specific to a particular validator directive.
     */
    enabled(input: unknown): boolean {
        return input != null /* both `null` and `undefined` */;
    }

    /**
     * @description
     * Tracks changes to the maximum content size bound to this directive.
     */
    @Input() maxContentSize!: string | number | null;

    inputName = 'maxContentSize';

    normalizeInput = (input: string | number): number => toInteger(input);

    createValidator = (maxContentSize: number): ValidatorFn => maxContentSizeValidator(maxContentSize);
}

/**
 * Method that updates string to integer if not already a number
 *
 * @param value The value to convert to integer.
 * @returns value of parameter converted to number or integer.
 */
function toInteger(value: string | number): number {
    return typeof value === 'number' ? value : parseInt(value, 10);
}

/**
* Validator that requires the content size of the control's value to be greater than
* to the provided maximum content size. See `FileValidator.maxContentSize` for additional information.
*/
function maxContentSizeValidator(bytes: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any; } | null => {
        const size = control && control.value ? (control.value as FileInput[]).map(f => f.file.size).reduce((acc, i) => acc + i, 0) : 0;
        const condition = bytes > size;
        return condition ? null : { maxContentSize: { actualSize: size, maxSize: bytes } };
    };
}

/**
 * Function that has `ValidatorFn` shape, but performs no operation.
 */
function nullValidator(control: AbstractControl): ValidationErrors | null {
    return null;
}