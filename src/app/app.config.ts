import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { initializeApp } from 'firebase/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthGuard } from './guards/auth/auth.guard';

const firebaseConfig = {
  apiKey: "AIzaSyAHqDTD05TZc9yTYt8O8DzTC8UTDpvtHRc",
  authDomain: "webkert-35490.firebaseapp.com",
  projectId: "webkert-35490",
  storageBucket: "webkert-35490.firebasestorage.app",
  messagingSenderId: "941430148880",
  appId: "1:941430148880:web:4dbd4887439a29da2c5f95"
};
//yea dude, just dox urself

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth(app)),
    provideFirestore(() => getFirestore(app)),
    {provide: 'AuthGuard', useValue: AuthGuard},
    ]

};