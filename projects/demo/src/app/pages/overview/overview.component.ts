import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, Directive, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Observable, Subject, map, skip, takeUntil } from 'rxjs';
import { TableOfContentsComponent } from '../../shared/components/table-of-contents/table-of-contents.component';
import { DocViewerComponent } from '../../shared/modules/viewer/components/doc-viewer/doc-viewer.component';
import { DocItem } from '../../shared/services/documentation-items/documentation-items';
import { ViewerComponent } from '../viewer/viewer.component';

/**
 * Base component class for views displaying docs on a particular component (overview, API,
 * examples). Responsible for resetting the focus target on doc item changes and resetting
 * the table of contents headers.
 */
@Directive()
export class ComponentBaseView implements OnInit, OnDestroy {
  @ViewChild('toc') tableOfContents!: TableOfContentsComponent;
  @ViewChildren(DocViewerComponent) viewers!: QueryList<DocViewerComponent>;

  showToc: Observable<boolean>;
  private _destroyed = new Subject<void>();

  constructor(
    public componentViewer: ViewerComponent,
    breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef) {
    this.showToc = breakpointObserver.observe('(max-width: 1200px)')
      .pipe(
        map(result => {
          this.changeDetectorRef.detectChanges();
          return !result.matches;
        })
      );
  }

  ngOnInit() {
    this.componentViewer.componentDocItem.pipe(takeUntil(this._destroyed)).subscribe(() => {
      if (this.tableOfContents) {
        this.tableOfContents.resetHeaders();
      }
    });

    this.showToc.pipe(
      skip(1),
      takeUntil(this._destroyed)
    ).subscribe(() => {
      if (this.tableOfContents) {
        this.viewers.forEach(viewer => {
          viewer.contentRendered.emit(viewer._elementRef.nativeElement);
        });
      }
    });
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  updateTableOfContents(sectionName: string, docViewerContent: HTMLElement, sectionIndex = 0) {
    if (this.tableOfContents) {
      this.tableOfContents.addHeaders(sectionName, docViewerContent, sectionIndex);
      this.tableOfContents.updateScrollPosition();
    }
  }
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    TableOfContentsComponent,
    AsyncPipe,
    DocViewerComponent,
    NgIf
  ],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OverviewComponent extends ComponentBaseView {
  constructor(
    componentViewer: ViewerComponent,
    breakpointObserver: BreakpointObserver,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(componentViewer, breakpointObserver, changeDetectorRef);
  }

  getOverviewDocumentUrl(doc: DocItem) {
    // Use the explicit overview path if specified. Otherwise, compute an overview path based
    // on the package name and doc item id. Overviews for components are commonly stored in a
    // folder named after the component while the overview file is named similarly. e.g.
    //    `cdk#overlay`     -> `cdk/overlay/overlay.md`
    //    `material#button` -> `material/button/button.md`
    const overviewPath = doc.overviewPath || `ng-gorilla/${doc.id}/${doc.id}.html`;
    return `https://raw.githubusercontent.com/shayan-ghzl/ng-gorilla/gh-pages/docs-content/overviews/${overviewPath}`;
    // return `/docs-content/overviews/${overviewPath}`;
  }

}
