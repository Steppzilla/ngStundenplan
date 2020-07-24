import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsWocheComponent } from './buttons-woche.component';

describe('ButtonsWocheComponent', () => {
  let component: ButtonsWocheComponent;
  let fixture: ComponentFixture<ButtonsWocheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsWocheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsWocheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
