import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TableOfContentsComponent } from '../../shared/components/table-of-contents/table-of-contents.component';
import { DocViewerComponent } from '../../shared/modules/viewer/components/doc-viewer/doc-viewer.component';
import { GuideItem, GuideItems } from '../../shared/services/guide-items/guide-items';
import { ComponentPageTitle } from '../../shared/services/page-title/page-title';

@Component({
  selector: 'app-guide-viewer',
  standalone: true,
  imports: [
    DocViewerComponent,
    TableOfContentsComponent,
    FooterComponent,
  ],
  templateUrl: './guide-viewer.component.html',
  styleUrl: './guide-viewer.component.scss'
})
export class GuideViewerComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;
  guide: GuideItem | undefined;

  constructor(_route: ActivatedRoute,
              private _componentPageTitle: ComponentPageTitle,
              private router: Router,
              public guideItems: GuideItems) {
    _route.params.subscribe(p => {
      const guideItem = guideItems.getItemById(p['id']);
      if (guideItem) {
        this.guide = guideItem;
      }

      if (!this.guide) {
        this.router.navigate(['/404']);
      }
    });
  }

  ngOnInit(): void {
    if (this.guide !== undefined) {
      this._componentPageTitle.title = this.guide.name;
    }
  }
}
