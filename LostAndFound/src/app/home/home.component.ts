import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LostItemListComponent } from '../lost-item-list/lost-item-list.component';
import { FoundItemListComponent } from '../found-item-list/found-item-list.component';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports:[LostItemListComponent, FoundItemListComponent],
  providers:[UserService]
})
export class HomeComponent {

  constructor(private userService: UserService, private router: Router) {}

  
  
}
