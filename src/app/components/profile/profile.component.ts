import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { User } from '../../models/user';
import { Torrent } from '../../models/torrent.model';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    TooltipDirective,
    HighlightDirective
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  currentUser: User = {
    id: 1,
    username: 'TorrentUser123',
    email: 'user@example.com',
    role: 'user',
    joinedAt: new Date('2023-10-15')
  };

  userTorrents: Torrent[] = [];

  constructor() { }

  ngOnInit(): void {
    this.userTorrents = this.getMockUserTorrents();
  }

  onUpdateStats(event: {uploads: number, downloads: number}): void {
    console.log('Stats updated:', event);
    //todo
  }

  getMockUserTorrents(): Torrent[] {
    return [
      {
        id: 8,
        title: 'The Matrix Trilogy 4K HDR',
        size: 65000,
        category: 'Movies',
        seeders: 756,
        leechers: 92,
        uploadedAt: new Date('2024-02-15'),
        uploader: 'TorrentUser123'
      },
      {
        id: 9,
        title: 'Microsoft Office 2025 Professional',
        size: 4300,
        category: 'Software',
        seeders: 452,
        leechers: 187,
        uploadedAt: new Date('2024-03-22'),
        uploader: 'TorrentUser123'
      }
    ];
  }
}