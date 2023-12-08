import { TestBed } from '@angular/core/testing';

import { DocFetcherService } from './doc-fetcher.service';

describe('DocFetcherService', () => {
  let service: DocFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
