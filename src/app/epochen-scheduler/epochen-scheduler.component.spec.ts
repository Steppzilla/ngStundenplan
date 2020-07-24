import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpochenSchedulerComponent } from './epochen-scheduler.component';

describe('EpochenSchedulerComponent', () => {
  let component: EpochenSchedulerComponent;
  let fixture: ComponentFixture<EpochenSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpochenSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpochenSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
