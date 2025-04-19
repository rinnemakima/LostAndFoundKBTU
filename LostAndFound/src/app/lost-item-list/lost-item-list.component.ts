import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LostItem } from '../models/lost-item.model';

@Component({
  selector: 'app-lost-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lost-item-list.component.html',
  styleUrls: ['./lost-item-list.component.css']
})
export class LostItemListComponent implements OnInit {
  items: LostItem[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<LostItem[]>('http://127.0.0.1:8000/api/public-lost-items/').subscribe({
      next: data => {
        this.items = data;
      },
      error: err => {
        console.error('Failed to load lost items:', err);
      }
    });
  }
}
