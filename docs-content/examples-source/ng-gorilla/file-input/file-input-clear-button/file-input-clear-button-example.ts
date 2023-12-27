import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FileValidator, GrlFileInputModule } from 'ng-gorilla/file-input';

/**
 * @title File Input with a clear button
 */
@Component({
  selector: 'file-input-clear-button-example',
  styleUrls: ['file-input-clear-button-example.css'],
  templateUrl: 'file-input-clear-button-example.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, GrlFileInputModule, MatButtonModule],
  encapsulation: ViewEncapsulation.None
})
export class FileInputClearButtonExample {

  fileFormControl = new FormControl([], [Validators.required, FileValidator.maxContentSize(1048576)]);

}
