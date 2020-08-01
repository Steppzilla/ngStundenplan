import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GesamtplanComponent } from './gesamtplan.component';

describe('GesamtplanComponent', () => {
  let component: GesamtplanComponent;
  let fixture: ComponentFixture<GesamtplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GesamtplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GesamtplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
