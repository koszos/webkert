import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'C00lW4R3ZZZ420';
  isLoggedIn = false;

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      this.isLoggedIn = !!user;
      
      if (user) {
        if (window.location.pathname === '/login') {
          this.router.navigate(['/home']);
        }
      } else {
        if (window.location.pathname !== '/login') {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }
}