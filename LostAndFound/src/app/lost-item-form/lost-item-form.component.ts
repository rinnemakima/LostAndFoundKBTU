// lost-item-form.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lost-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lost-item-form.component.html',
  styleUrls: ['./lost-item-form.component.css'],
})
export class LostItemFormComponent {
  lostItem = {
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
      this.lostItem.image = input.files[0];
    }
  }

  submitLostItem(): void {
    const formData = new FormData();
    formData.append('name', this.lostItem.name);
    formData.append('description', this.lostItem.description);
    formData.append('category', this.lostItem.category);
    formData.append('color', this.lostItem.color);
    formData.append('location', this.lostItem.location);
    formData.append('date', this.lostItem.date);
    if (this.lostItem.image) {
      formData.append('image', this.lostItem.image);
    }

    this.http.post('http://127.0.0.1:8000/api/lost-items/', formData).subscribe({
      next: (res) => {
        alert('Lost item reported successfully!');
        console.log(res);
      },
      error: (err) => {
        console.error('Submission failed', err);
        alert('Something went wrong while submitting the lost item.');
      }
    });
  }
}
