import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TorrentService, Torrent } from '../../services/torrent.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
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
  torrentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public torrentService: TorrentService,
    private auth: Auth
  ) {
    this.initializeForm();
  }

  private initializeForm() {
    this.torrentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      size: [0, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      file: [null as File | null, Validators.required]
    });
  }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      if (user?.displayName) {
        this.userTorrents$ = this.torrentService.getUserTorrents(user.displayName);
      }
    });
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
      this.userTorrents$ = this.torrentService.getUserTorrents(this.currentUser.displayName);
    } catch (error) {
      console.error('Hiba történt:', error);
      this.errorMessage = 'Hiba történt a feltöltés során';
    } finally {
      this.isUploading = false;
    }
  }
}