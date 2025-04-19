import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  private currentUserSubject = new BehaviorSubject<string | null>(localStorage.getItem('currentUserEmail'));
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}


  getCurrentUserEmail(): string | null {
    return this.currentUserSubject.value;
  }

  setCurrentUserEmail(email: string): void {
    localStorage.setItem('currentUserEmail', email);
    this.currentUserSubject.next(email);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  storeTokens(access: string, refresh: string): void {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('currentUserEmail');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }


  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, data);
  }

  loginUser(userData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/login/`, userData);
  }

  logoutUser(data: { refresh: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/logout/`, data);
  }

  async refreshAccessToken(): Promise<string | null> {
    const refresh = this.getRefreshToken();
    if (!refresh) return null;

    try {
      const response = await fetch(`${this.apiUrl}/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh })
      });

      if (!response.ok) throw new Error('Token refresh failed');

      const data = await response.json();
      const newAccess = data.access;

      if (newAccess) {
        localStorage.setItem('access_token', newAccess);
        return newAccess;
      }

      return null;
    } catch (err) {
      console.error('Token refresh error:', err);
      this.clearTokens();
      return null;
    }
  }
}
