import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // Ha be van jelentkezve, de a login oldalon van, irányítsuk át
        if (window.location.pathname === '/login') {
          this.router.navigate(['/home']);
        }
      } else {
        // Ha nincs bejelentkezve, de nem a login oldalon van
        if (window.location.pathname !== '/login') {
          this.router.navigate(['/login']);
        }
      }
    });
  }
}