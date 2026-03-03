import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User, UserProfile } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: UserProfile | null = null;
  allUsers: User[] = [];
  isLoading = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if user is logged in
    this.currentUser = this.authService.getCurrentUser();

    if (!this.currentUser) {
      // Redirect to login if not authenticated
      this.router.navigate(['/login']);
      return;
    }

    // Load all users for display (admin view)
    this.allUsers = this.authService.getAllUsers();
    this.isLoading = false;
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  editProfile(): void {
    alert('Edit profile feature coming soon!');
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone!')) {
      alert('Delete account feature coming soon!');
    }
  }
}
