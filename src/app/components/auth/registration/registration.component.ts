import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserRegistration } from '../../../core/models/user-registration.model';
import { passwordConfirmationValidator } from '../../../shared/custom-validators/password-confirmation.validator';
import { Regexp } from '../../../core/constants/regexp';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { RecaptchaModule, RecaptchaFormsModule  } from 'ng-recaptcha';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  form: FormGroup;
  responseErrorMessage: string = '';
  isRepeatPasswordHidden = true;
  isPasswordHidden = true;
  isCaptchaResolved = false;
  isLoading = false;

  constructor() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(Regexp.PasswordStrength)]],
      passwordConfirm: ['', Validators.required]
    }, { validator: passwordConfirmationValidator('password', 'passwordConfirm') })
  }

  checkCaptcha(captchaResponse : string | null) {
    this.isCaptchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false;
    console.log("isCaptchaResolved: ", this.isCaptchaResolved);
  }

  onRegister() {
    const userData: UserRegistration = this.form.value as UserRegistration;
    this.isLoading = true;

    this.authService.register(userData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.responseErrorMessage = error.error;
      }
    });
  }
}
