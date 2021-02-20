import { TestBed } from '@angular/core/testing';

import { RegisterGovBodyService } from './register-gov-body.service';

describe('RegisterGovBodyService', () => {
  let service: RegisterGovBodyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterGovBodyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
