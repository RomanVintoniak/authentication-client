import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  userService = inject(UserService);
  router = inject(Router);

  userId: string | null = '';
  user!: User;

  constructor() {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    if (this.userId) {
      this.userService.get(this.userId).subscribe(user => {
        this.user = user;
      });
    };
  }

  logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['']);
  }
}
