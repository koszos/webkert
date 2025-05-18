import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  showMessage = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.signupForm.invalid) {
      this.errorMessage = 'awdawda LEGYSZI NORMALISAN!!!';
      return;
    }

    try {
      const { email, password, username } = this.signupForm.value;
      
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      
      //ez megy az kollekcionkkkkba
      await addDoc(collection(this.firestore, 'users'), {
        uid: userCredential.user.uid,
        username: username,
        email: email,
        joinedAt: new Date(),
        role: 'user'

      });

      this.successMessage = 'Siker!';
      this.errorMessage = '';
      
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);
      
    } catch (error) {
      console.error('ehhh:', error);
      this.errorMessage = this.getErrorMessage(error);
      this.successMessage = '';
    }
  }

  private getErrorMessage(error: any): string {
    if (error.code === 'auth/email-already-in-use') {
      return 'Ez az email cím már regisztrálva van';
    } else if (error.code === 'auth/weak-password') {
      return 'gyenge a jel$$zo';
    } else {
      return 'BAJBAJBAJn';
    }
  }
}