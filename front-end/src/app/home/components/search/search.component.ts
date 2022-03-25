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

  constructor(
      private Activatedroute: ActivatedRoute,
      private _yahooService: YahooService,
    ) {}

  ngOnInit(): void {
    this.searchedStock = this.Activatedroute.snapshot.queryParamMap.get('searchedStock') || undefined;
    if (this.searchedStock) {
      this._yahooService.getSearchedStock(this.searchedStock).subscribe((data: any) => {
        this.quote = data;
      });
    }
  }


}
