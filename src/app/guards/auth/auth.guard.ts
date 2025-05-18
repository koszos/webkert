import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean> {
    const user = this.auth.currentUser;
    if (user) {
      return of(true);
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}