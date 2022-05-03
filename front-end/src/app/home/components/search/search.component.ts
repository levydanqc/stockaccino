import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { YahooService } from 'src/app/services/yahoo.service';

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
  isLoading: boolean = true;
  user?: User;
  isWatched?: boolean;

  constructor(
      private Activatedroute: ActivatedRoute,
      private _yahooService: YahooService,
      private _userService: UserService,
      private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.searchedStock =
      this.Activatedroute.snapshot.queryParamMap.get('searchedStock')?.toUpperCase() ||
      undefined;
    if (this.searchedStock) {
      let stockSymbol: string = this.searchedStock;
      this._yahooService
        .getSearchedStock(stockSymbol)
        .subscribe((data: any) => {
          this.quote = data;
          this.stock = this.quote['quoteResponse']['result'][0];
          this.isLoading = false;
        });
      this._userService
        .getUserById()
        .subscribe((data: any) => {
          this.user = data;
          if (this.user?.Stocks.includes(stockSymbol)) {
            this.isWatched = true;
          } else this.isWatched = false;
        });
    }
  }

  watch() {
    if (this.searchedStock)
      this._userService.watchStock(
        this.searchedStock
      );
    this.isWatched = true;
    this.toastr.success('Stock ajouté à votre watchlist.', "Succès");
  }

  unwatch() {
    if (this.searchedStock)
      this._userService.unwatchStock(
        this.searchedStock
      );
    this.isWatched = false;
    this.toastr.success('Stock retiré de votre watchlist.', "Succès");
  }
}
