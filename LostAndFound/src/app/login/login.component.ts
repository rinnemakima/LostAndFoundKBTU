import { FormsModule } from "@angular/forms";
import { Component} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent {
  input = {
    username: '',
    password: ''
  };
  


  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  
  onLogin() {
    this.userService.loginUser(this.input).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        this.router.navigate(['/home']); 
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
  
  
}
