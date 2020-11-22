import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechnerComponent } from './rechner.component';

describe('RechnerComponent', () => {
  let component: RechnerComponent;
  let fixture: ComponentFixture<RechnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
