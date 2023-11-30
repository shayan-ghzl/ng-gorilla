import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input } from '@angular/core';
import { InlineUploaderComponent } from './ng-material-file-input';

@Directive({
  selector: 'button[InlineUploaderButton]',
  exportAs: 'InlineUploaderButton',
  host: {
    '(click)': '_click()',
    '(blur)': '_blur()',
    '(focus)': '_focus()',
    '[attr.disabled]': 'disabled || null',
  },
  standalone: true,
})
export class InlineUploaderButton {

  @Input('InlineUploaderButton') inlineUploader: InlineUploaderComponent;

  @Input() inlineUploaderAction: 'clear' | 'open' = 'open';

  @Input()
  get disabled(): boolean {
    return this._disabled || (this.inlineUploader && this.inlineUploader.disabled);
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  _click() {
    if (this.disabled) {
      return;
    }
    if (this.inlineUploaderAction === 'open') {
      this.inlineUploader.open();
    } else if (this.inlineUploaderAction === 'clear') {
      this.inlineUploader.clear();
    }
  }

  _blur() {
    // this.inlineUploader.focused = false;
  }

  _focus() {
    // this.inlineUploader.focused = true;
  }

}
