import { TestBed } from '@angular/core/testing';

import { ColorsrvService } from './colorsrv.service';

describe('ColorsrvService', () => {
  let service: ColorsrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorsrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
