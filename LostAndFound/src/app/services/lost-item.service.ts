import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LostItem } from '../models/lost-item.model';

@Injectable({
  providedIn: 'root'
})
export class LostItemService {
  private apiUrl = 'http://localhost:8000/api/lost-items/';

  constructor(private http: HttpClient) {}

  getLostItems(): Observable<LostItem[]> {
    return this.http.get<LostItem[]>(this.apiUrl);
  }

  getLostItemById(id: number): Observable<LostItem> {
    return this.http.get<LostItem>(`${this.apiUrl}${id}/`);
  }

  createLostItem(item: FormData): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  deleteLostItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  getRecentLostItems(): Observable<LostItem[]> {
    return this.http.get<LostItem[]>(`${this.apiUrl}recent/`);
  }
}
