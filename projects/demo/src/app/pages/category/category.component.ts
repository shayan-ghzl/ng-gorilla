import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DocumentationItems, SECTIONS } from '../../shared/services/documentation-items/documentation-items';
import { ComponentPageTitle } from '../../shared/services/page-title/page-title';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  // parameter section is only available in the scope of SidenavComponent
  // parameter scoped to this route
  // @Input({ required: true }) section: string;

  section: string;

  _categoryListSummary: string | undefined;

  constructor(
    public docItems: DocumentationItems,
    public _componentPageTitle: ComponentPageTitle,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const params = this._route.snapshot.pathFromRoot.map(route => route.params);
    const mergedParams = params.reduce((result, currentObject) => {
      // Merge the properties of the current object into the result object
      Object.assign(result, currentObject);
      return result;
    }, {});
    this.section = mergedParams['section'];

    const section = SECTIONS[this.section];
    
    this._componentPageTitle.title = section.name;
    this._categoryListSummary = section.summary;
  }

}
