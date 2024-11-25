import { TestBed } from '@angular/core/testing';

import { ConnectDataService } from './connect-data.service';

describe('ConnectDataService', () => {
  let service: ConnectDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
