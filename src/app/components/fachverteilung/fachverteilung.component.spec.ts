import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FachverteilungComponent } from './fachverteilung.component';

describe('FachverteilungComponent', () => {
  let component: FachverteilungComponent;
  let fixture: ComponentFixture<FachverteilungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FachverteilungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FachverteilungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
