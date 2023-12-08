import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PortalModule } from '@angular/cdk/portal';
import { DocViewerComponent } from './components/doc-viewer/doc-viewer.component';
import { ExampleViewerComponent } from './components/example-viewer/example-viewer.component';
import { HeaderLinkComponent } from './components/header-link/header-link.component';
import { CodeSnippetComponent } from './components/code-snippet/code-snippet.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTabsModule,
    PortalModule,
    DocViewerComponent,
    ExampleViewerComponent,
    HeaderLinkComponent,
    CodeSnippetComponent
  ],
  exports: [DocViewerComponent, ExampleViewerComponent, HeaderLinkComponent]
})
export class ViewerModule { }





