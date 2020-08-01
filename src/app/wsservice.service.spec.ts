import { TestBed } from '@angular/core/testing';

import { WsserviceService } from './wsservice.service';

describe('WsserviceService', () => {
  let service: WsserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
