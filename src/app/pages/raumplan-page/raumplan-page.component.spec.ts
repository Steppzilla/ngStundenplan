import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaumplanPageComponent } from './raumplan-page.component';

describe('RaumplanPageComponent', () => {
  let component: RaumplanPageComponent;
  let fixture: ComponentFixture<RaumplanPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaumplanPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaumplanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
