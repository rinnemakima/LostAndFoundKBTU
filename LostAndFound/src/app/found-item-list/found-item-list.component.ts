import { Component, Input } from '@angular/core';
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
export class FoundItemListComponent {
  @Input() items: FoundItem[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      this.http.get<FoundItem[]>('').subscribe({
        next: data => {
          this.items = data;
        },
        error: err => {
          console.error('Failed to load lost items:', err);
        }
      });
    }
}
