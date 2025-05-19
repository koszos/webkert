import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TorrentService, Torrent } from '../../services/torrent.service';
import { UserService } from '../../services/user.service.service';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    MatDialogModule,
    MatSnackBarModule,
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
  isUpdating = false;
  isDeleting = false;
  uploadSuccess = false;
  updateSuccess = false;
  errorMessage = '';
  currentUser: any;
  torrentForm!: FormGroup;
  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public torrentService: TorrentService,
    private userService: UserService,
    private auth: Auth,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.initializeForms();
  }

  private initializeForms() {
    this.torrentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      size: [0, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      file: [null as File | null, Validators.required]
    });

    this.profileForm = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(3)]],
      photoURL: ['']
    });
  }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      if (user) {
        if (user.displayName) {
          this.userTorrents$ = this.torrentService.getUserTorrents(user.displayName);
        }
        
        this.profileForm.patchValue({
          displayName: user.displayName || '',
          photoURL: user.photoURL || ''
        });
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

  async updateProfile() {
    if (this.profileForm.invalid || this.isUpdating || !this.currentUser) return;
    
    this.isUpdating = true;
    this.errorMessage = '';
    
    try {
      const { displayName, photoURL } = this.profileForm.value;
      await this.userService.updateUserProfile(displayName, photoURL);
      
      this.updateSuccess = true;
      this.snackBar.open('Profil sikeresen frissítve!', 'Bezár', {
        duration: 3000
      });
    
      this.userTorrents$ = this.torrentService.getUserTorrents(displayName);
    } catch (error) {
      console.error('borzalmas hiba!:', error);
      this.errorMessage = 'valami baaaaaj van';
      this.snackBar.open('NEM SIKERult', 'Bezár', {
        duration: 3000
      });
    } finally {
      this.isUpdating = false;
    }
  }
  async deleteAccount() {
    if (this.isDeleting || !this.currentUser) return;
    
    this.isDeleting = true;
    
    try {
      await this.userService.deleteUserAccount();
      this.snackBar.open('VISZLÁT', 'Bezár', {
        duration: 5000
      });
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Hiba történt a fiók törlésekor:', error);
      this.snackBar.open('Hiba történt a fiók törlésekor', 'Bezár', {
        duration: 3000
      });
    } finally {
      this.isDeleting = false;
    }
  }
}