import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from '../../core/class/stocks';
import { ApiService } from '../../core/services/api/api.service';
import { parseJSONSafely } from '../../shared/utils';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  stock: Stock|undefined;
  loading: boolean = true;
  imageUrl: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    const stockId: string|null = this.route.snapshot.paramMap.get('id');
    if (stockId) {
      this.apiService.getStocksById(stockId).subscribe({
        next: (stock) => {
          if(typeof stock.tags === 'string' && stock.tags) {
            try {
              stock.tags = parseJSONSafely(stock.tags);
            } catch (e) {
              console.error('Error parsing tags JSON: ', e);
            }
          }
          this.stock = stock;
          if (this.stock?.image_link) {
            this.apiService.getImageUrl(this.stock.image_link).subscribe({
              next: (imageBlob) => {
                this.imageUrl = URL.createObjectURL(imageBlob);
              },
              error: (error) => {
                console.error('Error fetching image:', error);
              }
            });
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching stock:', error);
          this.loading = false;
        }
      });
    }
  }

  editStock(id: string) {
    this.router.navigate(['edit/', id])
  }

  deleteStock(): void {
    this.apiService.deleteStock(this.stock?._id!).subscribe({
      next: () => {
        this.apiService.notifyStockChanged();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error deleting stock: ', error);
      }
    });
  }

  getTextColor(backgroundColor: string): string {
    const color = backgroundColor.charAt(0) === '#' ? backgroundColor.substring(1, 7) : backgroundColor;
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? 'black' : 'white';
  }

}
