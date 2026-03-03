import { Injectable } from '@angular/core';

export interface User {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  gender: string;
  address?: string;
  timestamp?: string;
}

export interface UserProfile {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  address?: string;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'users';
  private readonly CURRENT_USER_KEY = 'currentUser';

  constructor() {
    this.initializeStorage();
  }

  private initializeStorage(): void {
    if (!localStorage.getItem(this.USERS_KEY)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify([]));
    }
  }

  /**
   * Register a new user
   */
  registerUser(userData: User): { success: boolean; message: string } {
    try {
      // Check for duplicate email
      const users = this.getAllUsers();
      if (users.some(u => u.email === userData.email)) {
        return { success: false, message: 'Email already registered' };
      }

      // Add new user with ID and timestamp
      const newUser: User = {
        ...userData,
        id: Date.now(),
        timestamp: new Date().toLocaleString()
      };

      users.push(newUser);
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      return { success: false, message: 'Error during registration' };
    }
  }

  /**
   * Login user with email and password
   */
  loginUser(email: string, password: string): { success: boolean; user?: UserProfile; message: string } {
    try {
      const users = this.getAllUsers();
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        // Don't store password in current user
        const { password, ...userWithoutPassword } = user;
        const userProfile: UserProfile = userWithoutPassword;
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userProfile));
        return { success: true, user: userProfile, message: 'Login successful' };
      }

      return { success: false, message: 'Invalid email or password' };
    } catch (error) {
      return { success: false, message: 'Error during login' };
    }
  }

  /**
   * Get current logged-in user
   */
  getCurrentUser(): UserProfile | null {
    try {
      const user = localStorage.getItem(this.CURRENT_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  /**
   * Logout current user
   */
  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  /**
   * Get all registered users (for admin purposes)
   */
  getAllUsers(): User[] {
    try {
      const users = localStorage.getItem(this.USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      return [];
    }
  }

  /**
   * Get user by ID
   */
  getUserById(id: number): User | undefined {
    const users = this.getAllUsers();
    return users.find(u => u.id === id);
  }
}

