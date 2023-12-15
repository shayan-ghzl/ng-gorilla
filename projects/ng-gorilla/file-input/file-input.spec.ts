import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrlFileInput } from './file-input';

describe('GrlFileInput', () => {
  let component: GrlFileInput;
  let fixture: ComponentFixture<GrlFileInput>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GrlFileInput]
    });
    fixture = TestBed.createComponent(GrlFileInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
