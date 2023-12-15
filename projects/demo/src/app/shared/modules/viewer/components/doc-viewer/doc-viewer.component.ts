import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationRef, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Injector, Input, NgZone, OnDestroy, Output, SecurityContext, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription, take } from 'rxjs';
import { DocFetcherService } from '../../services/doc-fetcher.service';
import { ExampleViewerComponent } from '../example-viewer/example-viewer.component';
import { HeaderLinkComponent } from '../header-link/header-link.component';

@Component({
  selector: 'app-doc-viewer',
  standalone: true,
  template: 'Loading document...',
})
export class DocViewerComponent implements OnDestroy {
  private _portalHosts: DomPortalOutlet[] = [];
  private _documentFetchSubscription: Subscription | undefined;

  @Input() name: string | undefined;

  /** The URL of the document to display. */
  @Input()
  set documentUrl(url: string | undefined) {
    if (url !== undefined) {
      this._fetchDocument(url);
    }
  }

  @Output() contentRendered = new EventEmitter<HTMLElement>();

  /** The document text. It should not be HTML encoded. */
  textContent = '';

  private static initExampleViewer(exampleViewerComponent: HeaderLinkComponent | ExampleViewerComponent,
    example: string,
    file: string | null,
    region: string | null) {
    if (exampleViewerComponent instanceof ExampleViewerComponent) {
      if (file) {
        // if the html div has field `file` then it should be in compact view to show the code
        // snippet
        exampleViewerComponent.view = 'snippet';
        exampleViewerComponent.showCompactToggle = true;
        exampleViewerComponent.file = file;
        if (region) {
          // `region` should only exist when `file` exists but not vice versa
          // It is valid for embedded example snippets to show the whole file (esp short files)
          exampleViewerComponent.region = region;
        }
      } else {
        // otherwise it is an embedded demo
        exampleViewerComponent.view = 'demo';
      }
    }
    exampleViewerComponent.example = example;
  }

  constructor(private _appRef: ApplicationRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    public _elementRef: ElementRef,
    private _injector: Injector,
    private _viewContainerRef: ViewContainerRef,
    private _ngZone: NgZone,
    private _domSanitizer: DomSanitizer,
    private _docFetcher: DocFetcherService) {
  }

  /** Fetch a document by URL. */
  private _fetchDocument(url: string) {
    this._documentFetchSubscription?.unsubscribe();
    this._documentFetchSubscription = this._docFetcher.fetchDocument(url).subscribe(
      document => this.updateDocument(document),
      error => this.showError(url, error)
    );
  }

  /**
   * Updates the displayed document.
   * @param rawDocument The raw document content to show.
   */
  private updateDocument(rawDocument: string) {
    // Replace all relative fragment URLs with absolute fragment URLs. e.g. "#my-section" becomes
    // "/components/button/api#my-section". This is necessary because otherwise these fragment
    // links would redirect to "/#my-section".
    rawDocument = rawDocument.replace(/href="#([^"]*)"/g, (_m: string, fragmentUrl: string) => {
      const absoluteUrl = `${location.pathname}#${fragmentUrl}`;
      return `href="${this._domSanitizer.sanitize(SecurityContext.URL, absoluteUrl)}"`;
    });
    this._elementRef.nativeElement.innerHTML = rawDocument;
    this.textContent = this._elementRef.nativeElement.textContent;
    this._loadComponents('material-docs-example', ExampleViewerComponent);
    this._loadComponents('header-link', HeaderLinkComponent);

    // Resolving and creating components dynamically in Angular happens synchronously, but since
    // we want to emit the output if the components are actually rendered completely, we wait
    // until the Angular zone becomes stable.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.contentRendered.next(this._elementRef.nativeElement));
  }

  /** Show an error that occurred when fetching a document. */
  private showError(url: string, error: HttpErrorResponse) {
    console.error(error);
    this._elementRef.nativeElement.innerText =
      `Failed to load document: ${url}. Error: ${error.statusText}`;
  }

  /** Instantiate a ExampleViewer for each example. */
  private _loadComponents(componentName: string, componentClass: any) {
    const exampleElements =
      this._elementRef.nativeElement.querySelectorAll(`[${componentName}]`);

    [...exampleElements].forEach((element: Element) => {
      const example = element.getAttribute(componentName);
      const region = element.getAttribute('region');
      const file = element.getAttribute('file');
      const portalHost = new DomPortalOutlet(
        element, this._componentFactoryResolver, this._appRef, this._injector);
      const examplePortal = new ComponentPortal(componentClass, this._viewContainerRef);
      const exampleViewer = portalHost.attach(examplePortal);
      const exampleViewerComponent = exampleViewer.instance as HeaderLinkComponent | ExampleViewerComponent;
      if (example !== null) {
        DocViewerComponent.initExampleViewer(exampleViewerComponent, example, file, region);
      }
      this._portalHosts.push(portalHost);
    });
  }

  private _clearLiveExamples() {
    this._portalHosts.forEach(h => h.dispose());
    this._portalHosts = [];
  }

  ngOnDestroy() {
    this._clearLiveExamples();
    this._documentFetchSubscription?.unsubscribe();
  }
}
