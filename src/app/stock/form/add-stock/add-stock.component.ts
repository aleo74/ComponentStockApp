import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Stock } from '../../../core/class/stocks';
import { StockFormComponent } from '../stock-form/stock-form.component';

@Component({
  selector: 'app-add-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, StockFormComponent],
  templateUrl: './add-stock.component.html',
  styles: ``
})
export class AddStockComponent implements OnInit {
  stock: Stock | undefined;
  ngOnInit() {
    this.stock = new Stock();
  }
}
