import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaumplanComponent } from './raumplan.component';

describe('RaumplanComponent', () => {
  let component: RaumplanComponent;
  let fixture: ComponentFixture<RaumplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaumplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaumplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
