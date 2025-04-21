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
  @Input() recentOnly = false;
  constructor(private http: HttpClient) {}
  
  
  ngOnInit(): void {
    this.http.get<LostItem[]>('http://127.0.0.1:8000/api/lost-items/').subscribe({
      next: data => {
        const today = new Date();
        const filtered = data.filter(item => {
          const itemDate = new Date(item.date);
          const diff = (today.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24);
          return this.recentOnly ? diff <= 7 : true;
        });
        this.items = filtered;
      },
      error: err => console.error('Failed to load lost items:', err)
    });
  }
}
