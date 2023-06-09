import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingFormComponent } from './tracking-form.component';

describe('TrackingFormComponent', () => {
  let component: TrackingFormComponent;
  let fixture: ComponentFixture<TrackingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TrackingFormComponent]
    });
    fixture = TestBed.createComponent(TrackingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
