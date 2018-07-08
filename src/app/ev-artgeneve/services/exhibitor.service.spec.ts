import { TestBed, inject } from '@angular/core/testing';

import { ExhibitorService } from './exhibitor.service';

describe('ExhibitorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExhibitorService]
    });
  });

  it('should be created', inject([ExhibitorService], (service: ExhibitorService) => {
    expect(service).toBeTruthy();
  }));
});
