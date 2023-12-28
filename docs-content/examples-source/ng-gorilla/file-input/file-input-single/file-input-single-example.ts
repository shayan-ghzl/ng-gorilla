import {Component, ViewEncapsulation} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FileValidator, GrlFileInputModule} from 'ng-gorilla/file-input';

/**
 * @title File Input with just a single file upload capability
 */
@Component({
  selector: 'file-input-single-example',
  styleUrls: ['file-input-single-example.css'],
  templateUrl: 'file-input-single-example.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, GrlFileInputModule, MatButtonModule],
  encapsulation: ViewEncapsulation.None,
})
export class FileInputSingleExample {
  fileFormControl = new FormControl(
    [],
    [Validators.required, FileValidator.maxContentSize(1048576)],
  );
}
