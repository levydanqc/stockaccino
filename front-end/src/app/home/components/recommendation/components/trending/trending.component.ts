import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Trending } from 'src/app/classes/yahoo/trending';
import { YahooService } from 'src/app/services/yahoo.service';
@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit {
  trending: Trending[] = [];
  loading: boolean = true;
  // Fake data only for enabling loop of carousel
  _images: any[] = [
    { path: '', width: 0, height: 0 },
    { path: '', width: 0, height: 0 },
    { path: '', width: 0, height: 0 },
    { path: '', width: 0, height: 0 },
    { path: '', width: 0, height: 0 },
  ];

  constructor(
    private yahooService: YahooService,
    private _cookieService: CookieService
  ) {}

  ngOnInit() {
    this.yahooService.getTrending().subscribe((data: Trending[]) => {
      console.log(data);
      this.trending = data;
      this.loading = false;
    });
  }
}
