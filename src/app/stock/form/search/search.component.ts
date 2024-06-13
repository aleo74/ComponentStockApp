import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Stock } from '../../../core/class/stocks';
import { ApiService } from '../../../core/services/api/api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './search.component.html',
  styles: ''
})
export class SearchComponent implements OnInit {
  
  searchTerm: string = '';
  stock$!: Observable<Stock[]>;
  stockList: Stock[] = [];

  constructor(private router: Router, private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.apiService.stocks$.subscribe(stocks => {
      this.stockList = stocks;
    });
  }

  onSearchChange(value: any): void {
    const searchTerm = value as string;
    this.searchTerm = searchTerm;
  }

  get filteredStocks(): Stock[] {
    return this.stockList.filter(stock => stock.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  goToDetail(stock: Stock) {
    this.router.navigate(['/detail/'+stock._id]);
  }

}
