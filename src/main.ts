import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "webkert-35490", appId: "1:941430148880:web:4dbd4887439a29da2c5f95", storageBucket: "webkert-35490.firebasestorage.app", apiKey: "AIzaSyAHqDTD05TZc9yTYt8O8DzTC8UTDpvtHRc", authDomain: "webkert-35490.firebaseapp.com", messagingSenderId: "941430148880" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
}).catch(err => console.error(err));