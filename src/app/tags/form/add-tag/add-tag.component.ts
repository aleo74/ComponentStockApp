import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tags } from '../../../core/class/tags';
import { TagFormComponent } from '../tag-form/tag-form.component';

@Component({
  selector: 'app-add-tag',
  standalone: true,
  imports: [CommonModule, FormsModule, TagFormComponent],
  templateUrl: './add-tag.component.html'
})
export class AddTagComponent implements OnInit {
  tag: Tags | undefined;
  ngOnInit() {
    this.tag = new Tags();
  }
}