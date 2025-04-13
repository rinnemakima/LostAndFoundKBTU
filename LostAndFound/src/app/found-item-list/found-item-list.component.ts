import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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
}
