import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { DocumentationItems } from '../../services/documentation-items/documentation-items';

@Component({
  selector: 'app-nav',
  standalone: true,
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({ height: '0px', display: 'none' })),
      state('expanded', style({ height: '*', display: 'block' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ],
  imports: [
    NgFor,
    MatListModule,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './nav.component.html'
})
export class NavComponent {
  @Input() section: string;

  currentItemId: string | undefined;
  constructor(public docItems: DocumentationItems) { }
}
