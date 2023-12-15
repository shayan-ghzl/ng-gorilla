import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, HostBinding, Input, OnChanges, OnDestroy, Optional, Self, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroupDirective, NgControl, NgForm, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { CanDisable, ErrorStateMatcher, HasTabIndex, mixinDisabled, mixinErrorState, mixinTabIndex } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { FileInput } from './models';


let nextUniqueId = 0;

// Boilerplate for applying mixins to MtxSelect.
/** @docs-private */
const MixinErrorStateBase =
  mixinTabIndex(
    mixinDisabled(
      mixinErrorState(
        class {
          /**
           * Emits whenever the component state changes and should cause the parent
           * form-field to update. Implemented as part of `MatFormFieldControl`.
           * @docs-private
           */
          readonly stateChanges = new Subject<void>();

          constructor(
            public _elementRef: ElementRef,
            public _defaultErrorStateMatcher: ErrorStateMatcher,
            public _parentForm: NgForm,
            public _parentFormGroup: FormGroupDirective,
            /**
             * Form control bound to the component.
             * Implemented as part of `MatFormFieldControl`.
             * @docs-private
             */
            public ngControl: NgControl
          ) { }
        }
      )
    )
  );


@Component({
  selector: 'mat-file-input',
  templateUrl: './ng-material-file-input.html',
  styles: [`
    mat-file-input{
      --mat-file-input-placeholder-text-color: red;
      display: block;
      min-height: 40px;

      input[type="file"] {
          position: absolute;
          inset: 0;
          z-index: -10;
          width: 0;
          height: 0;
          opacity: 0;
          display: none;
      }
    }

    .mat-mdc-file-input-value {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }

    .mat-mdc-file-input-min-line:empty::before {
        content: ' ';
        white-space: pre;
        width: 1px;
        display: inline-block;
        visibility: hidden;
    }

    .mat-mdc-file-input-placeholder {
        transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);
        color: var(--mat-file-input-placeholder-text-color)
    }

    ._mat-animation-noopable .mat-mdc-file-input-placeholder {
        transition: none
    }

    .mat-form-field-hide-placeholder .mat-mdc-file-input-placeholder {
        color: rgba(0, 0, 0, 0);
        -webkit-text-fill-color: rgba(0, 0, 0, 0);
        transition: none;
        display: block
    }
  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
  ],
  providers: [
    { provide: MatFormFieldControl, useExisting: InlineUploaderComponent }
  ],
  inputs: ['disabled', 'tabIndex'],
  host: {
    '[class.inline-upliader-disabled]': 'disabled',
    '[class.inline-upliader-invalid]': 'errorState',
    '[class.inline-upliader-required]': 'required',
    '[class.inline-upliader-empty]': 'empty',
    '[class.inline-upliader-multiple]': 'multiple',
    '[attr.role]': 'role',
    '(focus)': '_focus()',
    '(blur)': '_blur()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-required]': 'required.toString()',
    '[attr.aria-invalid]': 'errorState',
    '[attr.tabindex]': 'tabIndex',
    '[attr.id]': 'id'
  },
})
export class InlineUploaderComponent extends MixinErrorStateBase implements MatFormFieldControl<any>, ControlValueAccessor, OnDestroy, CanDisable, HasTabIndex, OnChanges, DoCheck {

  @ViewChild('fileInput') input: ElementRef<HTMLInputElement>;

  @Input() multiple: true | null = null;

  @Input() accept: string[] = ['image/*'];

  @Input() sizeLimitation = 1;

  @Input() value: FileInput[] = [];

  @Input() override errorStateMatcher: ErrorStateMatcher;

  remove(file: FileInput) {
    if (!this.disabled) {
      const index = this.value.indexOf(file);
      if (index >= 0) {
        this.value.splice(index, 1);
        this.input.nativeElement.value = '';
        this._onChange(this.value);
        this.stateChanges.next();
      }
    }
  }

  onUpload(fileList: FileList) {
    if (!this.disabled) {
      this.value = [];
      for (let i = 0; i < fileList.length; i++) {
        const filesizeMb = +((fileList[i].size / (1024 * 1024)).toFixed(4));
        if (typeof fileList[i].name != 'undefined' && filesizeMb < this.sizeLimitation && (this.accept.includes('image/*') || this.accept.includes(fileList[i].type) && !(this.value.map(x => x.name).includes(fileList[i].name)))) {
          this.value.push(new FileInput(fileList[i]));
        }
      }
      this._onChange(this.value);
      this.stateChanges.next();
    }
  }

  open() {
    this.input.nativeElement.click();
  }

  clear() {
    this.value = [];
    this.input.nativeElement.value = '';
    this._onChange(this.value);
    this.stateChanges.next();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['disabled'] || changes['userAriaDescribedBy']) {
      this.stateChanges.next();
    }
  }

  _previousControl: AbstractControl | null | undefined;

  ngDoCheck() {
    const ngControl = this.ngControl;
    if (ngControl) {
      if (this._previousControl !== ngControl.control) {
        if (this._previousControl !== undefined && ngControl.disabled !== null && ngControl.disabled !== this.disabled) {
          this.disabled = ngControl.disabled;
        }
        this._previousControl = ngControl.control;
      }
      this.updateErrorState();
    }
  }

  @Input()
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
    this.stateChanges.next();
  }
  private _id = `inline-uploader-${nextUniqueId++}`;

  @Input() placeholder: string;

  private _focused = false;
  get focused(): boolean {
    return this._focused;
  }
  set focused(v: boolean) {
    this._focused = v;
    this.stateChanges.next();
  }

  get empty(): boolean {
    return this.value.length ? false : true;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  get required(): boolean {
    return this._required ?? this.ngControl?.control?.hasValidator(Validators.required) ?? false;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required: boolean | undefined;

  controlType = 'mat-select';

  private _autofilled = false;
  public get autofilled(): boolean {
    return this._autofilled;
  }
  public set autofilled(v: boolean) {
    this._autofilled = v;
    this.stateChanges.next();
  }

  @Input('aria-describedby') userAriaDescribedBy: string;

  @HostBinding('attr.aria-describedby') _ariaDescribedby: string | null = null;

  setDescribedByIds(ids: string[]): void {
    this._ariaDescribedby = ids.length ? ids.join(' ') : null;
  }

  onContainerClick(event: MouseEvent) {
    if (!this.disabled) {
      this._elementRef.nativeElement.focus();
    }
  }

  _focus() {
    if (!this.disabled) {
      this.focused = true;
    }
  }

  _blur() {
    this.focused = false;
    this._onTouched();
  }

  private _role: string | null = null;
  @Input()
  get role(): string | null {
    if (this._role) {
      return this._role;
    }

    return this.empty ? null : this._defaultRole;
  }
  set role(value: string | null) {
    this._role = value;
  }

  protected _defaultRole = 'presentation';

  constructor(
    _elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
    @Optional() @Self() ngControl: NgControl,
  ) {
    super(_elementRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  /**
   * Function when touched. Set as part of ControlValueAccessor implementation.
   * @docs-private
  */
  _onTouched = () => { };

  /**
   * Function when changed. Set as part of ControlValueAccessor implementation.
   * @docs-private
  */
  _onChange: (value: FileInput[]) => void = () => { };

  /**
   * Implemented as part of ControlValueAccessor.
   * @docs-private
  */
  writeValue(value: FileInput[]): void {
    if (value) {
      this.value = value;
      this._changeDetectorRef.markForCheck();
      this.stateChanges.next();
    }
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * @docs-private
  */
  registerOnChange(fn: (value: FileInput[]) => void): void {
    this._onChange = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * @docs-private
  */
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * @docs-private
  */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
    this.stateChanges.next();
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }
}

import { NgModule } from '@angular/core';
import { InlineUploaderButton } from './upload-button';

@NgModule({
  imports: [InlineUploaderComponent, InlineUploaderButton],
  exports: [InlineUploaderComponent, InlineUploaderButton],
})
export class NgMaterialFileInputModule { }