import { NgFor } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ReplaySubject, Subject, combineLatest, map, takeUntil } from 'rxjs';
import { DocItem, DocumentationItems } from '../../shared/services/documentation-items/documentation-items';
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
  componentDocItem = new ReplaySubject<DocItem>(1);
  sections: Set<string> = new Set(['overview']);
  private _destroyed = new Subject<void>();

  constructor(
    private router: Router,
    _route: ActivatedRoute,
    public _componentPageTitle: ComponentPageTitle,
    public docItems: DocumentationItems
  ) {
    const routeAndParentParams = [_route.params];

    if (_route.parent) {
      routeAndParentParams.push(_route.parent.params);
    }
    // Listen to changes on the current route for the doc id (e.g. button/checkbox) and the
    // parent route for the section (material/cdk).
    combineLatest(routeAndParentParams).pipe(
      map((params: Params[]) => ({ id: params[0]['id'], section: params[1]['section'] })),
      map((docIdAndSection: { id: string, section: string; }) =>
      ({
        doc: docItems.getItemById(docIdAndSection.id),
        section: docIdAndSection.section
      })),
      takeUntil(this._destroyed),
    ).subscribe((docItemAndSection: { doc: DocItem | undefined, section: string; }) => {
      if (docItemAndSection.doc !== undefined) {

        this.componentDocItem.next(docItemAndSection.doc);
        this._componentPageTitle.title = `${docItemAndSection.doc.name}`;

        if (docItemAndSection.doc.examples && docItemAndSection.doc.examples.length) {
          this.sections.add('examples');
        } else {
          this.sections.delete('examples');
        }
      } else {
        this.router.navigate(['/' + docItemAndSection.section]);
      }
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
