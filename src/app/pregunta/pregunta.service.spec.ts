import { TestBed } from '@angular/core/testing';

import { PreguntaService } from './pregunta.service';

describe('PreguntaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreguntaService = TestBed.get(PreguntaService);
    expect(service).toBeTruthy();
  });
});
