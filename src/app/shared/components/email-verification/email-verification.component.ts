import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.scss'
})
export class EmailVerificationComponent implements OnInit {
  route = inject(ActivatedRoute);
  authService = inject(AuthService);

  token: string | null = '';
  isEmailVerified = false;
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
    });

    if (this.token) {
      this.authService.verifyEmail(this.token).subscribe({
        next: () => {
          this.isEmailVerified = true;
          this.isLoading = false;
        },
        error: () => {
          this.isEmailVerified = false;
          this.isLoading = false;
        }
      });
    }
  }
}
