import { TestBed } from '@angular/core/testing';

import { FreelancerProfileService } from './freelancer-profile.service';

describe('FreelancerProfileService', () => {
  let service: FreelancerProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreelancerProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
