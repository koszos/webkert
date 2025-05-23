import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentDetailsComponent } from './torrent-details.component';

describe('TorrentDetailsComponent', () => {
  let component: TorrentDetailsComponent;
  let fixture: ComponentFixture<TorrentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TorrentDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorrentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
