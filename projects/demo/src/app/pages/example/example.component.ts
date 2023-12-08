import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/modules/viewer/components/example-viewer/example-viewer.component';
import { ViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ExampleViewerComponent,
    AsyncPipe,
  ],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExampleComponent {
  constructor(
    public componentViewer: ViewerComponent,
  ) {
  }
}