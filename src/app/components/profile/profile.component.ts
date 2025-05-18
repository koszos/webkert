import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Auth, User as FirebaseUser } from '@angular/fire/auth';

interface AppUser {
  username: string;
  joinedAt: Date;
  role: 'user' | 'admin';
  email: string;
  uid: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    DatePipe
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: AppUser = {
    username: 'Betöltés...',
    joinedAt: new Date(),
    role: 'user',
    email: 'betöltés...',
    uid: ''
  };

  constructor(private auth: Auth) {}

  ngOnInit() {
    const user = this.auth.currentUser;
    
    if (user) {
      this.currentUser = {
        username: user.displayName || 'Felhasználó',
        joinedAt: new Date(user.metadata.creationTime || Date.now()),
        role: user.email?.endsWith('@admin.com') ? 'admin' : 'user',
        email: user.email || 'nincs email',
        uid: user.uid
      };
    } else {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    }
  }
}