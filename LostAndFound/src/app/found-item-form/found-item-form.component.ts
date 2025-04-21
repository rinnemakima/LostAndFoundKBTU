import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-found-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './found-item-form.component.html',
  styleUrls: ['./found-item-form.component.css'],
})
export class FoundItemFormComponent {
  foundItem = {
    name: '',
    description: '',
    category: '',
    color: '',
    location: '',
    date: '',
    image: null as File | null
  };

  categories = ['Electronic', 'Accessories', 'Transportation Card', 'ID Card', 'Other'];

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.foundItem.image = input.files[0];
    }
  }

  submitFoundItem(): void {
    const formData = new FormData();
    formData.append('name', this.foundItem.name);
    formData.append('description', this.foundItem.description);
    formData.append('category', this.foundItem.category);
    formData.append('color', this.foundItem.color);
    formData.append('location', this.foundItem.location);
    formData.append('date', this.foundItem.date);
    if (this.foundItem.image) {
      formData.append('image', this.foundItem.image);
    }

    console.log('Token:', localStorage.getItem('access_token'));

    this.http.post('http://127.0.0.1:8000/api/found-items/', formData).subscribe({
      next: (res) => {
        alert('Found item reported successfully!');
        console.log(res);
      },
      error: (err) => {
        console.error('Submission failed', err);
        alert('Something went wrong while submitting the found item.');
      }
    });
  }
}
