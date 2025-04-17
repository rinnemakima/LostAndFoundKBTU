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
  providers: [UserService],
})
export class LoginComponent {
  input = {
    username: '',
    password: ''
  };
  


  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  
  onLogin() {
    this.userService.loginUser(this.input).subscribe(
      response => {
        console.log(response)
        alert('User ' + this.input.username + ' succesfully logged in.');
        this.router.navigate(['/home']); 
      },
      error => {
        console.log('error', error);
      }
    );
  }
  
}
