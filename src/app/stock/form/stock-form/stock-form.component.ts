import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Stock } from '../../../core/class/stocks';
import { Tags } from '../../../core/class/tags';
import { ApiService } from '../../../core/services/api/api.service';
import { parseJSONSafely } from '../../../shared/utils';

@Component({
  selector: 'app-stock-form',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockFormComponent implements OnInit {
  
  @Input() stock!: Stock;
  isAddForm!: boolean;
  selectedFile: File | null = null;
  availableTags: Tags[] = [];
  selectedTagIds: string[] = [];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.isAddForm = this.router.url.includes('add');
    this.loadTags();
    if (!this.isAddForm && this.stock && typeof this.stock.tags === 'string') {
      this.stock.tags = parseJSONSafely(this.stock.tags);
      this.selectedTagIds = this.stock.tags.map((tag: Tags) => tag._id);
    }
  }

  loadTags(): void {
    this.apiService.loadTags().subscribe({
      next: (tagList) => {
        this.availableTags = tagList;
      },
      error: (error) => {
        console.error('Error fetching tags:', error);
      }
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  addTag(tagId: string) {
    if (!this.selectedTagIds.includes(tagId)) {
      this.selectedTagIds.push(tagId);
      this.updateStockTags();
    }
  }

  removeTag(tagId: string) {
    const index = this.selectedTagIds.indexOf(tagId);
    if (index > -1) {
      this.selectedTagIds.splice(index, 1);
      this.updateStockTags();
    }
  }

  updateStockTags() {
    this.stock.tags = this.selectedTagIds.map(id => {
      return this.availableTags.find(tag => tag._id === id);
    }).filter(tag => tag !== undefined) as Tags[];
  }

  onSubmit() {
    if(this.isAddForm) {
      this.apiService.saveStockJson(this.stock)
        .subscribe({
          next: (response: any) => {
            const savedStock: Stock = response.stock;
            this.router.navigate(['/detail/', savedStock._id]);
          },
          error: (error) => {
            console.error('Error saving stock:', error);
          }
        });
      
    } else {
      this.apiService.editStock(this.stock._id, this.stock)
        .subscribe({
          next: (response: any) => {
            this.router.navigate(['/detail/', this.stock._id]);
          },
          error: (error) => {
            console.error('Error saving stock:', error);
          }
        });
    }
  }
}
