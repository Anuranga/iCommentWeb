import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTaxiForOwnersComponent } from './assign-taxi-for-owners.component';

describe('AssignTaxiForOwnersComponent', () => {
  let component: AssignTaxiForOwnersComponent;
  let fixture: ComponentFixture<AssignTaxiForOwnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTaxiForOwnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTaxiForOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
