import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotenrechnerComponent } from './notenrechner.component';

describe('NotenrechnerComponent', () => {
  let component: NotenrechnerComponent;
  let fixture: ComponentFixture<NotenrechnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotenrechnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotenrechnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
