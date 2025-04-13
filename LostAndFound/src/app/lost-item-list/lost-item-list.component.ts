import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LostItem } from '../models/lost-item.model';

@Component({
  selector: 'app-lost-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lost-item-list.component.html',
  styleUrls: ['./lost-item-list.component.css']
})
export class LostItemListComponent {
  @Input() items: LostItem[] = [];
}
