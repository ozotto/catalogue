import { EvArtgeneveRoutingModule } from './ev-artgeneve-routing.module';

describe('EvArtgeneveRoutingModule', () => {
  let evArtgeneveRoutingModule: EvArtgeneveRoutingModule;

  beforeEach(() => {
    evArtgeneveRoutingModule = new EvArtgeneveRoutingModule();
  });

  it('should create an instance', () => {
    expect(evArtgeneveRoutingModule).toBeTruthy();
  });
});
