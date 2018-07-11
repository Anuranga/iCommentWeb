import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripBreakdownComponent } from './trip-breakdown.component';

describe('TripBreakdownComponent', () => {
  let component: TripBreakdownComponent;
  let fixture: ComponentFixture<TripBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
