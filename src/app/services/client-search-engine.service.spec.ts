import { TestBed } from '@angular/core/testing';

import { ClientSearchEngineService } from './client-search-engine.service';

describe('ClientSearchEngineService', () => {
  let service: ClientSearchEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientSearchEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
