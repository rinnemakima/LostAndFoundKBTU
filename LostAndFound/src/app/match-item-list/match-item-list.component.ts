import { Component, OnInit } from '@angular/core';
import { MatchItemService } from '../services/match-item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-item-list.component.html',
  styleUrls: ['./match-item-list.component.css']
})
export class MatchItemListComponent implements OnInit {
  matches: any[] = [];

  constructor(private matchItemService: MatchItemService) {}

  ngOnInit(): void {
    this.fetchMatches();
  }

  fetchMatches(): void {
    this.matchItemService.getMatches().subscribe({
      next: (data) => this.matches = data,
      error: (err) => console.error('Error loading matches', err)
    });
  }
}
