import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackBlitzButtonComponent } from './stack-blitz-button.component';

describe('StackBlitzButtonComponent', () => {
  let component: StackBlitzButtonComponent;
  let fixture: ComponentFixture<StackBlitzButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackBlitzButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StackBlitzButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
