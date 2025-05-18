import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'torrent-list',
        loadComponent: () => import('./components/torrent-list/torrent-list.component').then(m => m.TorrentListComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
        
        
    },
    {
        path: 'signup',
        loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent),
    
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
        
    },
];