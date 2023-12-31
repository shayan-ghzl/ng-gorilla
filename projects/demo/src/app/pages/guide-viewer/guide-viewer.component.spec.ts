import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideViewerComponent } from './guide-viewer.component';

describe('GuideViewerComponent', () => {
  let component: GuideViewerComponent;
  let fixture: ComponentFixture<GuideViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuideViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
