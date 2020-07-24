import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WochenplanComponent } from './wochenplan.component';

describe('WochenplanComponent', () => {
  let component: WochenplanComponent;
  let fixture: ComponentFixture<WochenplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WochenplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WochenplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
