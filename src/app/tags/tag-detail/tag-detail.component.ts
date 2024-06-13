import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Tags } from '../../core/class/tags';
import { ApiService } from '../../core/services/api/api.service';
import { LoaderComponent } from "../../loader/loader.component";
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-tag-detail',
  standalone: true,
  imports: [IonicModule, LoaderComponent, CommonModule, SharedModule],
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.css']
})
export class TagDetailComponent implements OnInit {
  
  tag: Tags|undefined;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    const tagId: string|null = this.route.snapshot.paramMap.get('id');
    if (tagId) {
      this.apiService.getTagById(tagId).subscribe({
        next: (tag) => {
          this.tag = tag;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching tag:', error);
          this.loading = false;
        }
      });
    }
  }

  editTag(id: string) {
    this.router.navigate(['tag/edit/', id])
  }

  returnTagsList(){
    this.router.navigate(['tags/'])
  }

  deleteTag(): void {
    this.apiService.deleteTagAndUpdateStocks(this.tag?._id!).subscribe({
      next: () => {
        this.apiService.notifyTagsChanged();
        this.router.navigate(['tags/']);
      },
      error: (error) => {
        console.error('Error deleting stock: ', error);
      }
    });
  }
}
