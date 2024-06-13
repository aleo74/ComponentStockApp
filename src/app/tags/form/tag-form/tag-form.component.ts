import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Tags } from '../../../core/class/tags';
import { ApiService } from '../../../core/services/api/api.service';

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [IonicModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent implements OnInit {

  @Input() tag!: Tags;
  isAddForm!: boolean;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.isAddForm = this.router.url.includes('add');
  }

  onSubmit() {
    if (this.isAddForm) {
      this.apiService.saveTag(this.tag)
        .subscribe({
          next: (response: any) => {
            const savedTag: Tags = response.tag;
            this.router.navigate(['/tag/', savedTag._id]);
          },
          error: (error) => {
            console.error('Error saving tag:', error);
          }
        });
    } else {
      this.apiService.editTag(this.tag._id, this.tag)
      .subscribe({
        next: (response: any) => {
          this.router.navigate(['/tag/', this.tag._id]);
        },
        error(err) {
          console.error('Error saving stock:', err);
        },
      });
    }
  }
}
