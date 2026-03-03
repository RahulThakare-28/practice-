import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;

  isSubmitting = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }
  }

  validateForm(): boolean {
    this.errorMessage = '';

    if (!this.email.trim()) {
      this.errorMessage = 'Email is required';
      return false;
    }

    if (!this.password) {
      this.errorMessage = 'Password is required';
      return false;
    }

    return true;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    // Simulate async operation
    setTimeout(() => {
      const result = this.authService.loginUser(this.email, this.password);

      if (result.success) {
        if (this.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        this.router.navigate(['/profile']);
      } else {
        this.errorMessage = result.message;
      }

      this.isSubmitting = false;
    }, 500);
  }

  resetForm(): void {
    this.email = '';
    this.password = '';
    this.rememberMe = false;
  }
}
