import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsGesamtplanComponent } from './buttons-gesamtplan.component';

describe('ButtonsGesamtplanComponent', () => {
  let component: ButtonsGesamtplanComponent;
  let fixture: ComponentFixture<ButtonsGesamtplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsGesamtplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsGesamtplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
