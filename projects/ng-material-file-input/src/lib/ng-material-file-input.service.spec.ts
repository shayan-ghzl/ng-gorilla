import { TestBed } from '@angular/core/testing';

import { NgMaterialFileInputService } from './ng-material-file-input.service';

describe('NgMaterialFileInputService', () => {
  let service: NgMaterialFileInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMaterialFileInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
