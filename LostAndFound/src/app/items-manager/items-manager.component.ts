import { Component } from '@angular/core';
import { LostItem } from '../models/lost-item.model'; 
import { OnInit } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({ 
  selector: 'app-items-manager', 
  templateUrl: './items-manager.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule], 
})
export class ItemsManagerComponent implements OnInit {
  lostItems: LostItem[] = [];
  newLostItem: Partial<LostItem> = {};

  constructor(private itemService: ItemComponent) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getLostItems().subscribe(data => this.lostItems = data);
  }

  reportLostItem() {
    this.itemService.reportLostItem(this.newLostItem).subscribe(() => {
      this.newLostItem = {};
      this.loadItems();
    });
  }

  markAsFound(itemId: number) {
    this.itemService.deleteLostItem(itemId).subscribe(() => this.loadItems());
  }
}
