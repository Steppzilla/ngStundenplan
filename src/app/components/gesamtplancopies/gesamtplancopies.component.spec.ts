import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GesamtplancopiesComponent } from './gesamtplancopies.component';

describe('GesamtplancopiesComponent', () => {
  let component: GesamtplancopiesComponent;
  let fixture: ComponentFixture<GesamtplancopiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GesamtplancopiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GesamtplancopiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
