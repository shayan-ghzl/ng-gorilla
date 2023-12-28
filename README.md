Ng Gorilla
=======

## Getting Started

```shell
npm install ng-gorilla
```

This module requires @angular/material package to be installed

## Usage

Let's display a file input component in your app and verify that everything works.

You need to import the `GrlFileInputModule` that you want to display by adding the following lines to
your `app.component.ts` file.

```ts
import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {GrlFileInputModule} from 'ng-gorilla/file-input';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, GrlFileInputModule, MatButtonModule]
})
export class AppComponent {
  fileFormControl = new FormControl([], [Validators.required]);
}

```

Add the `<grl-file-input>` tag to the `app.component.html` like so:

```html
<form class="example-form">
  <mat-form-field class="example-file-input" appearance="outline">
      <mat-label>Documents</mat-label>
      <grl-file-input #fileInput 
        [multiple]="true"
        [maxContentSize]="1048576"
        [formControl]="fileFormControl"
        placeholder="Upload you docs here"></grl-file-input>
      <button type="button" matSuffix mat-flat-button color="primary" [grlFileInputButtonFor]="fileInput">Upload</button>
      <mat-hint>You can upload multiple images</mat-hint>
      @if (fileFormControl.hasError('maxContentSize')) {
        <mat-error>The file size should not be more than {{1048576 | byteFormat}}</mat-error>
      }
      @if (fileFormControl.hasError('required')) {
       <mat-error>This field is <strong>required</strong></mat-error>
      }
  </mat-form-field>
</form>
```

Run your local dev server:

```bash
ng serve
```

Then point your browser to [http://localhost:4200](http://localhost:4200)

You should see the Ng Gorilla file input component on the page.