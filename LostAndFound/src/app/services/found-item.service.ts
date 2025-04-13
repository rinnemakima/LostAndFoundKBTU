import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoundItem } from '../models/found-item.model';

@Injectable({
  providedIn: 'root'
})
export class FoundItemService {
  private apiUrl = 'http://localhost:8000/api/found-items/';

  constructor(private http: HttpClient) {}

  getFoundItems(): Observable<FoundItem[]> {
    return this.http.get<FoundItem[]>(this.apiUrl);
  }

  getFoundItemById(id: number): Observable<FoundItem> {
    return this.http.get<FoundItem>(`${this.apiUrl}${id}/`);
  }

  createFoundItem(item: FormData): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  deleteFoundItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
