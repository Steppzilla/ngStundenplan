import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LehrerlisteComponent } from './lehrerliste.component';

describe('LehrerlisteComponent', () => {
  let component: LehrerlisteComponent;
  let fixture: ComponentFixture<LehrerlisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LehrerlisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LehrerlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
