import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Stock } from '../../core/class/stocks';
import { ApiService } from '../../core/services/api/api.service';
import { parseJSONSafely } from '../../shared/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  stockList: Stock[] = [];
  stockChangedSubscription!: Subscription;
  loading: boolean = true;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadStocks();

    this.stockChangedSubscription = this.apiService.stockChanged$.subscribe(() => {
      this.loadStocks();
    });

  }

  ngOnDestroy(): void {
    if (this.stockChangedSubscription) {
      this.stockChangedSubscription.unsubscribe();
    }
  }

  loadStocks(): void {
    this.loading = true;
    this.apiService.loadStocks().subscribe({
      next: (stockList) => {
        this.stockList = stockList.map(stock => {
          if (typeof stock.tags === 'string' && stock.tags) {
            stock.tags = parseJSONSafely(stock.tags);
          }
          return stock;
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching stocks:', error);
        this.loading = false;
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


  selectStock(stock: Stock) {
    this.router.navigate(['/detail/'+stock._id]);
  }

}
