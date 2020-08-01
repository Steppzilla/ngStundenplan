import { TestBed } from '@angular/core/testing';

import { PlanmakerService } from './planmaker.service';

describe('PlanmakerService', () => {
  let service: PlanmakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanmakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
