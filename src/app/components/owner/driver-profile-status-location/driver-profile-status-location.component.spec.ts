import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverProfileStatusLocationComponent } from './driver-profile-status-location.component';

describe('DriverProficeStatusLocationComponent', () => {
  let component: DriverProfileStatusLocationComponent;
  let fixture: ComponentFixture<DriverProfileStatusLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverProfileStatusLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverProfileStatusLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
