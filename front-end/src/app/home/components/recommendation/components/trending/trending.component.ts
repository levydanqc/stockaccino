import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/classes/user';
import { Trending } from 'src/app/classes/yahoo/trending';
import { UserService } from 'src/app/services/user.service';
import { YahooService } from 'src/app/services/yahoo.service';
import { screeners, Screener } from 'src/app/classes/yahoo/suggestion';
@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit {
  trending: Trending[] = [];
  suggestions: Screener[] = [];
  loading: boolean = false;
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
    // private userService: UserService,
    private _cookieService: CookieService
  ) {}

  ngOnInit() {
    this.yahooService.getTrending().subscribe((data: Trending[]) => {
      console.log(data);
      this.trending = data;
      this.loading = false;
    });

    // screeners.forEach((screener) => {
    //   this.yahooService.getSuggestion(screener).subscribe((data: Screener) => {
    //     this.suggestions.push(data);
    //   });
    // });
  }
}
