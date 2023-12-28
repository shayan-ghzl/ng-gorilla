import {Component, ViewEncapsulation} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {GrlFileInputModule} from 'ng-gorilla/file-input';

/**
 * @title Basic File Input
 */
@Component({
  selector: 'file-input-overview-example',
  styleUrls: ['file-input-overview-example.css'],
  templateUrl: 'file-input-overview-example.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, GrlFileInputModule, MatButtonModule],
  encapsulation: ViewEncapsulation.None,
})
export class FileInputOverviewExample {
  fileFormControl = new FormControl([], [Validators.required]);
}
