import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tags } from '../../../core/class/tags';
import { ApiService } from '../../../core/services/api/api.service';
import { TagFormComponent } from '../tag-form/tag-form.component';

@Component({
  selector: 'app-edit-tag',
  standalone: true,
  imports: [CommonModule, FormsModule, TagFormComponent],
  templateUrl: './edit-tag.component.html'
})
export class EditTagComponent implements OnInit {

  tag: Tags | undefined;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {
    const tagId: string|null = this.route.snapshot.paramMap.get('id');
    if(tagId) {
      this.apiService.getTagById(tagId).subscribe({
        next: (tag) => {
          this.tag = tag;
        },
        error: (error) => {
          console.error('Error fetching tag:', error);
        }
      });
    } else {
      this.tag = undefined;
    }
  }
}
