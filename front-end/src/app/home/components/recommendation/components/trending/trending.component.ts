import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Trending } from 'src/app/classes/yahoo/trending';
import { YahooService } from 'src/app/services/yahoo.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements AfterViewInit {
  trending: Trending[] = [];
  loading: boolean = true;
  @Output()
  loaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private yahooService: YahooService, private router: Router) {}

  ngAfterViewInit(): void {
    this.yahooService.getTrending().subscribe((data: Trending[]) => {
      this.trending = data;
      this.loaded.emit(true);
    });
  }

  voirStock(stock: Trending) {
    this.router.navigate(['/search'], {
      queryParams: { searchedStock: stock.Symbol },
    });
  }
}
