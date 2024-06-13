import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Tags } from '../../core/class/tags';
import { ApiService } from '../../core/services/api/api.service';

@Component({
  selector: 'app-config-home',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './config-home.component.html'
})
export class ConfigHomeComponent implements OnInit {
  
  @Input() tag!: Tags;
  isAddForm!: boolean;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.tag = new Tags();
    this.isAddForm = true;
  }

  goToTag() {
    this.router.navigate(['/tags']);
  }
}
