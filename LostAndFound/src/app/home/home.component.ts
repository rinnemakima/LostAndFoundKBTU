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
  providers: [UserService],
  imports: [LostItemListComponent, FoundItemListComponent]
})
export class HomeComponent {

  constructor(private userService: UserService, private router: Router) {}

  logout() {
    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken) {
      this.userService.logoutUser({ refresh: refreshToken }).subscribe({
        next: () => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          this.router.navigate(['/landing']);
        },
        error: err => {
          console.error('Logout error:', err);
         
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      });
    } else {
    
      this.router.navigate(['/login']);
    }
  }
}
