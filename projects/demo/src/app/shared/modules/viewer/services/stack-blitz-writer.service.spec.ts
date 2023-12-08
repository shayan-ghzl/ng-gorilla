import { TestBed } from '@angular/core/testing';

import { StackBlitzWriterService } from './stack-blitz-writer.service';

describe('StackBlitzWriterService', () => {
  let service: StackBlitzWriterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StackBlitzWriterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
