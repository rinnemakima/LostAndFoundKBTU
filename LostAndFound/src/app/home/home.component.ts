import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LostItemListComponent } from '../lost-item-list/lost-item-list.component';
import { FoundItemListComponent } from '../found-item-list/found-item-list.component';
import { MatDialog } from '@angular/material/dialog';
import { LostItemFormComponent } from '../lost-item-form/lost-item-form.component';
import { CommonModule } from '@angular/common';
import { FoundItemFormComponent } from '../found-item-form/found-item-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService],
  imports: [LostItemListComponent, FoundItemListComponent, CommonModule]
})
export class HomeComponent {

  constructor(public userService: UserService, private router: Router, private dialog: MatDialog) {}

  openLostItemDialog(): void {
    this.dialog.open(LostItemFormComponent, {
      width: '400px',
      data: { userEmail: this.userService.getCurrentUserEmail() } 
    });
  }

  openFoundItemDialog(): void {
    this.dialog.open(FoundItemFormComponent, {
      width: '400px',
      data: { userEmail: this.userService.getCurrentUserEmail() } 
    });
  }

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
