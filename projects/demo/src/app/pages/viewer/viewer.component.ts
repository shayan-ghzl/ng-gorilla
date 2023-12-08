import { NgFor } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ComponentPageTitle } from '../../shared/services/page-title/page-title';

@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [
    NgFor,
    RouterOutlet,
    MatTabsModule,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ViewerComponent {
  sections: Set<string> = new Set(['overview', 'examples']);

  constructor(
    public _componentPageTitle: ComponentPageTitle
  ) { }
}
