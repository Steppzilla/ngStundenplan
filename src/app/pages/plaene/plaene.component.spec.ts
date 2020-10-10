import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaeneComponent } from './plaene.component';

describe('PlaeneComponent', () => {
  let component: PlaeneComponent;
  let fixture: ComponentFixture<PlaeneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaeneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
