import { Component, OnInit } from '@angular/core';
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

  constructor(private yahooService: YahooService) {}

  ngOnInit() {
    this.yahooService.getTrending().subscribe((data: Trending[]) => {
      this.trending = data;
      this.loading = false;
    });
  }
  
}
