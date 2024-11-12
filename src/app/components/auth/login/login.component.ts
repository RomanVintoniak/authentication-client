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
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { LogInResponse } from '../../../core/models/auth/log-in-response.model';

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
  localStorageService = inject(LocalStorageService);
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
      next: (data) => {
        this.saveDataToLocalStorage(data);
        this.isLoading = false;
        this.router.navigate(['/users', data.userId]);
      },
      error: (error) => {
        this.isLoading = false;
        this.responseErrorMessage = error.error;
      }
    });
  }

  private saveDataToLocalStorage(data: LogInResponse) {
    this.localStorageService.setToken(data.token);
    this.localStorageService.setUserId(data.userId);
  }
}
