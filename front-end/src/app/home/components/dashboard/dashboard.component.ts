import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { YahooService } from 'src/app/services/yahoo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  stocks?: string[];
  hasStocks?: boolean;
  selectedStock: string = '';
  stockObject?: any;

  constructor(
    private cookieService: CookieService,
    private _userService: UserService,
    private _yahooService: YahooService,
    private router: Router
  ) {}

  selectStock(stock?: string, i?: number) {
    if (i) {
      if (this.stocks) this.selectedStock = this.stocks[i];
    } else if (stock) this.selectedStock = stock;

    if (this.selectedStock) {
      this._yahooService
        .getSearchedStock(this.selectedStock)
        .subscribe((data: any) => {
          this.stockObject = data['quoteResponse']['result'][0];
        });
    }
  }

  voirStock() {
    this.router.navigate(['/search'], {
      queryParams: { searchedStock: this.selectedStock },
    });
  }

  ngOnInit(): void {
    this._userService
      .getUserById(this.cookieService.get('id'))
      .subscribe((data: any) => {
        this.stocks = data.Stocks;
        if (this.stocks)
          if (this.stocks.length > 0) {
            this.hasStocks = true;
            this._yahooService
              .getSearchedStock(this.stocks[0])
              .subscribe((data: any) => {
                this.stockObject = data['quoteResponse']['result'][0];
              });
            this.selectedStock = this.stocks[0];
          } else this.hasStocks = false;
      });
  }
}
