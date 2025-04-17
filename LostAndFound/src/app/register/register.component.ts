import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  providers: [UserService],
  styleUrls: ['./register.component.css']

})
export class RegisterComponent {
  register = {
    username: '',
    email: '',
    phone_number: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}


  registerUser(){
    this.userService.registerNewUser(this.register).subscribe(
      response => {
        alert('User ' + this.register.username + ' has been created!' )
      },
      error => console.log('error: ', error)
    );  
  }
}
