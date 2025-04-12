import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LostItem } from '../models/lost-item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
@Injectable({ providedIn: 'root' })
export class ItemComponent {
  private apiUrl = 'http://localhost:5000/api/items';

  constructor(private http: HttpClient) {}

  getLostItems(): Observable<LostItem[]> {
    return this.http.get<LostItem[]>(`${this.apiUrl}/lost`);
  }

  reportLostItem(item: Partial<LostItem>): Observable<LostItem> {
    return this.http.post<LostItem>(`${this.apiUrl}/lost`, item);
  }

  deleteLostItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/lost/${id}`);
  }
}