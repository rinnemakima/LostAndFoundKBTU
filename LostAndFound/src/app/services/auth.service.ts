import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/token';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(
      'http://localhost:8000/api/token/login/',
      { username, password }
    ).pipe(
      tap({
        next: (res) => console.log('Login success:', res),
        error: (err) => console.error('Login error:', err)
      })
    );
  }
  

  logout() {
    this.http.post(`${this.apiUrl}/logout/`, {}).subscribe();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
