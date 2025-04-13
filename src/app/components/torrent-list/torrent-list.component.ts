import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Torrent } from '../../models/torrent.model';
import { Category } from '../../models/category';
import { FileSizePipe } from '../../pipes/filesize.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { TooltipDirective } from '../../directives/tooltip.directive';

@Component({
  selector: 'app-torrent-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    FileSizePipe,
    HighlightDirective,
    TooltipDirective
  ],
  templateUrl: './torrent-list.component.html',
  styleUrl: './torrent-list.component.scss'
})
export class TorrentListComponent implements OnInit {
  torrents: Torrent[] = [];
  filteredTorrents: Torrent[] = [];
  categories: Category[] = [];
  
  searchTerm: string = '';
  selectedCategory: string = '';
  
  // Pagination
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  constructor() { }

  ngOnInit(): void {
    this.categories = this.getCategories();
    this.torrents = this.getMockTorrents();
    this.filteredTorrents = [...this.torrents];
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  applyFilters(): void {
    this.filteredTorrents = this.torrents.filter(torrent => {
      const matchesSearch = this.searchTerm ? 
        torrent.title.toLowerCase().includes(this.searchTerm.toLowerCase()) : 
        true;
      
      const matchesCategory = this.selectedCategory ? 
        torrent.category === this.selectedCategory : 
        true;
      
      return matchesSearch && matchesCategory;
    });
    
    this.pageIndex = 0; // Reset to first page when filtering
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.filteredTorrents = [...this.torrents];
    this.pageIndex = 0;
  }

  getCategories(): Category[] {
    return [
      { id: 1, name: 'Movies' },
      { id: 2, name: 'TV Shows' },
      { id: 3, name: 'Music' },
      { id: 4, name: 'Software' },
      { id: 5, name: 'Games' }
    ];
  }

  getMockTorrents(): Torrent[] {
    return [
      {
        id: 1,
        title: 'The Shawshank Redemption (1994) 1080p BluRay',
        size: 8500, // In MB
        category: 'Movies',
        seeders: 1024,
        leechers: 32,
        uploadedAt: new Date('2024-04-01'),
        uploader: 'MovieFan123'
      },
      {
        id: 2,
        title: 'Breaking Bad Complete Series S01-S05 720p',
        size: 45000, // In MB
        category: 'TV Shows',
        seeders: 850,
        leechers: 76,
        uploadedAt: new Date('2024-03-25'),
        uploader: 'TVLover'
      },
      {
        id: 3,
        title: 'Adobe Photoshop 2025 Full Version',
        size: 2300, // In MB
        category: 'Software',
        seeders: 537,
        leechers: 128,
        uploadedAt: new Date('2024-04-05'),
        uploader: 'SoftwareGuru'
      },
      {
        id: 4,
        title: 'Top Albums Collection 2024 FLAC',
        size: 5600, // In MB
        category: 'Music',
        seeders: 312,
        leechers: 45,
        uploadedAt: new Date('2024-04-02'),
        uploader: 'MusicLover'
      },
      {
        id: 5,
        title: 'Elden Ring Deluxe Edition',
        size: 68000, // In MB
        category: 'Games',
        seeders: 1432,
        leechers: 256,
        uploadedAt: new Date('2024-03-15'),
        uploader: 'GameMaster'
      },
      {
        id: 6,
        title: 'The Dark Knight Trilogy 4K HDR',
        size: 75000, // In MB
        category: 'Movies',
        seeders: 943,
        leechers: 87,
        uploadedAt: new Date('2024-03-28'),
        uploader: 'FilmBuff'
      },
      {
        id: 7,
        title: 'Windows 11 Pro 22H2',
        size: 5200, // In MB
        category: 'Software',
        seeders: 1876,
        leechers: 432,
        uploadedAt: new Date('2024-04-10'),
        uploader: 'OSExpert'
      }
    ];
  }

  getPaginatedTorrents(): Torrent[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.filteredTorrents.slice(startIndex, startIndex + this.pageSize);
  }
}