import { TestBed } from '@angular/core/testing';

import { MatchItemService } from './match-item.service';

describe('MatchItemService', () => {
  let service: MatchItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
