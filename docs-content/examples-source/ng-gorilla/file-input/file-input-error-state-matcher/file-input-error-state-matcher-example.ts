import {Component, ViewEncapsulation} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FileValidator, GrlFileInputModule} from 'ng-gorilla/file-input';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** @title File Input with a custom ErrorStateMatcher */
@Component({
  selector: 'file-input-error-state-matcher-example',
  templateUrl: './file-input-error-state-matcher-example.html',
  styleUrls: ['./file-input-error-state-matcher-example.css'],
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, GrlFileInputModule, MatButtonModule],
  encapsulation: ViewEncapsulation.None,
})
export class FileInputErrorStateMatcherExample {
  fileFormControl = new FormControl(
    [],
    [Validators.required, FileValidator.maxContentSize(1048576)],
  );

  matcher = new MyErrorStateMatcher();
}
