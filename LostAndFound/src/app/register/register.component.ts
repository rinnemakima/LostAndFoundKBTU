import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  register = {
    username: '',
    email: '',
    phone_number: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  registerUser() {
    this.http.post('http://127.0.0.1:8000/api/register/', this.register).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        alert('Registered successfully! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error.error);
        alert('Registration failed. Please check the fields and try again.');
      }
    });
  }
}
