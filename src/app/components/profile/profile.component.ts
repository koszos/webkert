import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TorrentService, Torrent, Comment } from '../../services/torrent.service';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FileSizePipe } from '../../pipes/filesize.pipe';
import { FormatPeerCountPipe } from '../../pipes/format-peer-count.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    DatePipe,
    FileSizePipe,
    FormatPeerCountPipe,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userTorrents$!: Observable<Torrent[]>;
  isUploading = false;
  uploadSuccess = false;
  errorMessage = '';
  currentUser: any;
  torrentForm = this.createForm();

  constructor(
    private fb: FormBuilder,
    public torrentService: TorrentService,
    private auth: Auth
  ) {}

  private createForm() {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      size: [0, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      file: [null as File | null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser;
    this.loadUserTorrents();
  }

  private loadUserTorrents() {
    if (this.currentUser?.displayName) {
      this.userTorrents$ = this.torrentService.getUserTorrents(this.currentUser.displayName);
    }
  }



  async uploadTorrent() {
    if (this.torrentForm.invalid || this.isUploading || !this.currentUser) return;

    this.isUploading = true;
    this.errorMessage = '';
    
    try {
      const formValue = this.torrentForm.value;
      const newTorrent: Omit<Torrent, 'id'> = {
        title: formValue.title!,
        size: formValue.size || 0,
        category: formValue.category!,
        seeders: 0,
        leechers: 0,
        uploadedAt: new Date(),
        uploader: this.currentUser.displayName || 'Ismeretlen',
        comments: []
      };

      await this.torrentService.addTorrent(newTorrent);
      this.uploadSuccess = true;
      this.torrentForm.reset();
      this.loadUserTorrents();
    } catch (error) {
      console.error('Hiba történt:', error);
      this.errorMessage = 'Hiba történt a feltöltés során';
    } finally {
      this.isUploading = false;
    }
  }
}