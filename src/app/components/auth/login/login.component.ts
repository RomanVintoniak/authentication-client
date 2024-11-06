import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Regexp } from '../../../core/constants/regexp';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  form: FormGroup;
  responseErrorMessage: string = '';
  isPasswordHidden = true;
  isLoading = false;

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(Regexp.PasswordStrength)]]
    });
  }

  onLogin() {
    this.isLoading = true;
    this.authService.login(this.form.value).subscribe({
      next: (userId) => {
        localStorage.setItem('userId', userId);
        this.isLoading = false;
        this.router.navigate(['/users', userId]);
      },
      error: (error) => {
        this.isLoading = false;
        this.responseErrorMessage = error.error;
      }
    });
  }
}
