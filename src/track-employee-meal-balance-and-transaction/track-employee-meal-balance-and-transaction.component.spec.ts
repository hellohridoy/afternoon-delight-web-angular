import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackEmployeeMealBalanceAndTransactionComponent } from './track-employee-meal-balance-and-transaction.component';

describe('TrackEmployeeMealBalanceAndTransactionComponent', () => {
  let component: TrackEmployeeMealBalanceAndTransactionComponent;
  let fixture: ComponentFixture<TrackEmployeeMealBalanceAndTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackEmployeeMealBalanceAndTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackEmployeeMealBalanceAndTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
