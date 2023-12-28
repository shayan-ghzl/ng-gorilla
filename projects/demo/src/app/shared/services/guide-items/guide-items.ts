import { Injectable } from '@angular/core';

export interface GuideItem {
  id: string;
  name: string;
  document: string;
  overview: string;
}

const GUIDES = [
  {
    id: 'getting-started',
    name: 'Getting started',
    document: 'https://raw.githubusercontent.com/shayan-ghzl/ng-gorilla/gh-pages/docs-content/guides/getting-started.html',
    overview: 'Add Ng Gorilla to your project!'
  }
];
// document: '/docs-content/guides/getting-started.html',

@Injectable({providedIn: 'root'})
export class GuideItems {

  getAllItems(): GuideItem[] {
    return GUIDES;
  }

  getItemById(id: string): GuideItem | undefined {
    return GUIDES.find(i => i.id === id);
  }
}
