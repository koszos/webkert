import { TestBed } from '@angular/core/testing';

import { TorrentService } from './torrent.service';

describe('TorrentServiceTsService', () => {
  let service: TorrentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TorrentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
