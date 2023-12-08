import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { DocViewerComponent } from '../doc-viewer/doc-viewer.component';

@Component({
  selector: 'app-code-snippet',
  standalone: true,
  imports: [
    DocViewerComponent
  ],
  templateUrl: './code-snippet.component.html',
  styleUrl: './code-snippet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeSnippetComponent {
  @Input() source: string | undefined;
  @ViewChild('viewer') viewer!: DocViewerComponent;
}
