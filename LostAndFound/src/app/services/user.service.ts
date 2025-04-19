import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<string | null>(localStorage.getItem('currentUserEmail'));
  public currentUser$ = this.currentUserSubject.asObservable();
  constructor(private http: HttpClient) { }

  getCurrentUserEmail(): string | null {
    return this.currentUserSubject.value;
  }

  registerUser(data: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/register/', data);
  }
  

  loginUser(userData: { username: string; password: string }): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/token/login/', userData);
  }

  logoutUser(data: { refresh: string }): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/token/logout/', data);
  }
  
  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }
  
  
}
