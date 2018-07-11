import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverFinanceStatementComponent } from './driver-finance-statement.component';

describe('DriverFinanceStatementComponent', () => {
  let component: DriverFinanceStatementComponent;
  let fixture: ComponentFixture<DriverFinanceStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverFinanceStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverFinanceStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
