import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  localStorageService = inject(LocalStorageService);
  userService = inject(UserService);
  router = inject(Router);

  user!: User;
  userId: string | null = null;

  ngOnInit() {
    this.localStorageService.userIdBehaviorSubject.subscribe((userId) => (this.userId = userId));

    if (this.userId) {
      this.userService.get(this.userId).subscribe(user => {
        this.user = user;
      });
    };
  }

  logout() {
    this.localStorageService.clear();
    this.router.navigate(['']);
  }
}
