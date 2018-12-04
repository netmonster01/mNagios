import { TestBed } from '@angular/core/testing';

import { NagiosService } from './nagios.service';

describe('NagiosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NagiosService = TestBed.get(NagiosService);
    expect(service).toBeTruthy();
  });
});
