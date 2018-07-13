import { TestBed, inject } from '@angular/core/testing';

import { Artwork } from './artwork.service';

describe('ArtworkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Artwork]
    });
  });

  it('should be created', inject([Artwork], (service: Artwork) => {
    expect(service).toBeTruthy();
  }));
});
