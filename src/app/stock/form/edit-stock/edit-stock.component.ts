import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Stock } from '../../../core/class/stocks';
import { ApiService } from '../../../core/services/api/api.service';
import { StockFormComponent } from "../stock-form/stock-form.component";

@Component({
    selector: 'app-edit-stock',
    standalone: true,
    templateUrl: './edit-stock.component.html',
    imports: [CommonModule, FormsModule, StockFormComponent]
})
export class EditStockComponent implements OnInit {

  stock: Stock | undefined;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {
    const stockId: string|null = this.route.snapshot.paramMap.get('id');
    if(stockId) {
      this.apiService.getStocksById(stockId).subscribe(stock => this.stock = stock);
    } else {
      this.stock = undefined;
    }
  }
}
