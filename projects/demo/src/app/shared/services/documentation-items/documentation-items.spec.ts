import {TestBed, inject, waitForAsync} from '@angular/core/testing';
import {DocumentationItems} from './documentation-items';

const COMPONENTS = 'components';

describe('DocViewer', () => {
  let docsItems: DocumentationItems;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({}).compileComponents();
  }));

  beforeEach(inject([DocumentationItems], (di: DocumentationItems) => {
    docsItems = di;
  }));

  it('should get a list of all doc items', () => {
    expect(docsItems.getItems(COMPONENTS)).toBeDefined();
    expect(docsItems.getItems(COMPONENTS).length).toBeGreaterThan(0);
    for (const item of docsItems.getItems(COMPONENTS)) {
      expect(item.id).toBeDefined();
      expect(item.name).toBeDefined();
    }
  });

  it('should be sorted alphabetically (components)', () => {
    const components = docsItems.getItems(COMPONENTS).map(c => c.name);
    const sortedComponents = components.concat().sort();
    expect(components).toEqual(sortedComponents);
  });
});
