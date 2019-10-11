import { TestBed } from '@angular/core/testing';

import { MainServicesService } from './main-services.service';

describe('MainServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainServicesService = TestBed.get(MainServicesService);
    expect(service).toBeTruthy();
  });
});
