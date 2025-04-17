import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  registerNewUser(userData: { username: string; email: string; phone_number: string; password: string; }): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/users/', userData);
  }

  loginUser(userData: { username: string; password: string }): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/token/login/', userData);
  }

  
  
}
