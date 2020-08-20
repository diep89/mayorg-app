import { TestBed } from '@angular/core/testing';

import { RankingService } from './ranking.service';

describe('RankingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RankingService = TestBed.get(RankingService);
    expect(service).toBeTruthy();
  });
});
