import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input } from '@angular/core';
import { GrlFileInput } from './file-input';

@Directive({
  selector: 'button[grlFileInputButtonFor]',
  exportAs: 'grlFileInputButton, grlFileInputButtonFor',
  host: {
    '(click)': '_click()',
    '[attr.disabled]': 'disabled || null',
  },
  standalone: true,
})
export class GrlFileInputButton {

  @Input('grlFileInputButtonFor') grlFileInput: GrlFileInput;

  @Input() grlFileInputAction: 'clear' | 'open' = 'open';

  @Input()
  get disabled(): boolean {
    return this._disabled || (this.grlFileInput && this.grlFileInput.disabled);
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  _click() {
    if (this.disabled) {
      return;
    }
    if (this.grlFileInputAction === 'open') {
      this.grlFileInput.open();
    } else if (this.grlFileInputAction === 'clear') {
      this.grlFileInput.clear();
    }
  }
}
