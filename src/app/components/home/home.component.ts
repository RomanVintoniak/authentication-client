import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  localStorageService = inject(LocalStorageService);
  router = inject(Router);

  userId: string | null = null;

  ngOnInit() {
    this.localStorageService.userIdBehaviorSubject.subscribe((userId) => (this.userId = userId))
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onRegister() {
    this.router.navigate(['/registration']);
  }

  onProfile() {
    if (this.userId) {
      this.router.navigate(['/users', this.userId]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
