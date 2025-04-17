import { Component, OnInit } from '@angular/core';
import { LostItemService } from '../services/lost-item.service';
import { FoundItemService } from '../services/found-item.service';
import { LostItemListComponent } from '../lost-item-list/lost-item-list.component';
import { FoundItemListComponent } from '../found-item-list/found-item-list.component';
import { CommonModule } from '@angular/common';
import { LostItem } from '../models/lost-item.model';
import { FoundItem } from '../models/found-item.model';

@Component({
  selector: 'app-item-manager',
  standalone: true,
  imports: [
    CommonModule,
    LostItemListComponent,
    FoundItemListComponent,
  ],
  templateUrl: './items-manager.component.html',
  styleUrls: ['./items-manager.component.css']
})
export class ItemsManagerComponent implements OnInit {
  lostItems: LostItem[] = [];
  foundItems: FoundItem[] = [];

  showForm = false;
  loading = false;
  errorMessage = '';

  constructor(
    private lostItemService: LostItemService,
    private foundItemService: FoundItemService
  ) {}

  ngOnInit() {
    this.lostItemService.getLostItems().subscribe(data => this.lostItems = data);
    this.foundItemService.getFoundItems().subscribe(data => this.foundItems = data);
  }

  loadItems() {
    this.loading = true;
    this.errorMessage = '';

    this.lostItemService.getLostItems().subscribe({
      next: (items) => {
        this.lostItems = items;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load lost items.';
        this.loading = false;
      }
    });

    this.foundItemService.getFoundItems().subscribe({
      next: (items) => (this.foundItems = items),
      error: (err) => (this.errorMessage = 'Failed to load found items.')
    });
  }

  handleFormSubmit() {
    this.showForm = false;
    this.loadItems();
  }
}
