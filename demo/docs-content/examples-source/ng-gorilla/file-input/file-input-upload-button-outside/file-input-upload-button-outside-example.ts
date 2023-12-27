import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FileValidator, GrlFileInputModule } from 'ng-gorilla/file-input';

/**
 * @title File Input with upload button outside of it
 */
@Component({
  selector: 'file-input-upload-button-outside-example',
  styleUrls: ['file-input-upload-button-outside-example.css'],
  templateUrl: 'file-input-upload-button-outside-example.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, GrlFileInputModule, MatButtonModule],
})
export class FileInputUploadButtonOutsideExample {

  fileFormControl = new FormControl([], [Validators.required, FileValidator.maxContentSize(1048576)]);

}
