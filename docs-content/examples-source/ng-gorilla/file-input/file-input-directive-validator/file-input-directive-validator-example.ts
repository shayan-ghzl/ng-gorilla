import {Component, ViewEncapsulation} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {GrlFileInputModule} from 'ng-gorilla/file-input';

/**
 * @title File Input with a directive validator
 */
@Component({
  selector: 'file-input-directive-validator-example',
  styleUrls: ['file-input-directive-validator-example.css'],
  templateUrl: 'file-input-directive-validator-example.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, GrlFileInputModule, MatButtonModule],
  encapsulation: ViewEncapsulation.None,
})
export class FileInputDirectiveValidatorExample {
  fileFormControl = new FormControl([], [Validators.required]);
}
