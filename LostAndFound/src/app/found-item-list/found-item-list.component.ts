import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FoundItem } from '../models/found-item.model';

@Component({
  selector: 'app-found-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './found-item-list.component.html',
  styleUrls: ['./found-item-list.component.css']
})
export class FoundItemListComponent implements OnInit {
  items: FoundItem[] = [];
  @Input() recentOnly = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<FoundItem[]>('http://127.0.0.1:8000/api/found-items/').subscribe({
      next: data => {
        const today = new Date();
        const filtered = data.filter(item => {
          const itemDate = new Date(item.date);
          const diff = (today.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24);
          return this.recentOnly ? diff <= 7 : true;
        });
        this.items = filtered;
      },
      error: err => {
        console.error('Failed to load found items:', err);
      }
    });
  }
}
