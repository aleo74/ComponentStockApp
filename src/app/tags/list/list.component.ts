import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Tags } from '../../core/class/tags';
import { BorderCardDirective } from '../../core/directives/border-card.directive';
import { ApiService } from '../../core/services/api/api.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { LoaderComponent } from "../../loader/loader.component";
import { ButtonTagComponent } from '../button-tag/button-tag.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    standalone: true,
    imports: [IonicModule, CommonModule, BorderCardDirective, ButtonTagComponent, LoaderComponent]
})
export class ListComponent implements OnInit, OnDestroy {

  tagList: Tags[] = [];
  tagsChangedSubscription!: Subscription;
  loading: boolean = true;

  constructor(private router: Router, private authService: AuthService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadTags();

    this.tagsChangedSubscription = this.apiService.tagChanged$.subscribe(() => {
      this.loadTags();
    });
  }

  ngOnDestroy(): void {
    if (this.tagsChangedSubscription) {
      this.tagsChangedSubscription.unsubscribe();
    }
  }

  loadTags(): void {
    this.loading = true;
    this.apiService.loadTags().subscribe({
      next: (tagList) => {
        this.tagList = tagList;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching tags:', error);
        this.loading = false;
      }
    });
  }

  selectTag(tag: Tags) {
    this.router.navigate(['/tag/'+tag._id]);
  }
  
}
