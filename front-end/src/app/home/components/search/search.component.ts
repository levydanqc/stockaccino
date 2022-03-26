import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { YahooService } from "src/app/services/yahoo.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchedStock?: string;
  quote?: any;
  stock?: any;
  chartData?: any;

  constructor(
      private Activatedroute: ActivatedRoute,
      private _yahooService: YahooService,
    ) {}

  ngOnInit(): void {
    this.searchedStock = this.Activatedroute.snapshot.queryParamMap.get('searchedStock') || undefined;
    if (this.searchedStock) {
      this._yahooService.getSearchedStock(this.searchedStock).subscribe((data: any) => {
        this.quote = data;
        this.stock = this.quote['quoteResponse']['result'][0];
      });
      this._yahooService.getStockChart(this.searchedStock).subscribe((data: any) => {
        this.chartData = data;
        console.log(this.chartData);
      });
    }
  }


}
