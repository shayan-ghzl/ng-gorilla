import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMaterialFileInputComponent } from './ng-material-file-input.component';

describe('NgMaterialFileInputComponent', () => {
  let component: NgMaterialFileInputComponent;
  let fixture: ComponentFixture<NgMaterialFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgMaterialFileInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgMaterialFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
