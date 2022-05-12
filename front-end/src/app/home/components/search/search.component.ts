import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/classes/users/user';
import { UserService } from 'src/app/services/user.service';
import { YahooService } from 'src/app/services/yahoo.service';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchedStock?: string;
  amisString?: string[];
  quote?: any;
  stock?: any;
  chartData?: any;
  isLoading: boolean = true;
  user?: User;
  isWatched?: boolean;
  amis: string[] = [];
  status: string[] = [];
  amisLoaded: boolean = false;

  constructor(
      private Activatedroute: ActivatedRoute,
      private _yahooService: YahooService,
      private _userService: UserService,
      private toastr: ToastrService,
      private modalService: ModalService
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
    this._userService
      .getUserById()
      .subscribe((data: any) => {
        this.amisString = data.Amis;
        if (this.amisString)
          if (this.amisString.length > 0) {
            this.amisString.forEach(ami => {
              this._userService
              .getUserByEmail(ami)
              .subscribe((data: any) => {
                this.amis?.push(data.Prenom + " " + data.Nom);
                this.status?.push('send');
              });
            });
          }
        this.amisLoaded = true;
      });
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

  sendTo(i: number) {
    if (this.status![i] === 'send') {
      let notif: string = `${this.user?.Prenom} ${this.user?.Nom} vous recommande de jetez un coup d'oeil à ${this.searchedStock}.`;
      console.log(`Envoi de la notification suivante à ${this.amisString![i]}:`, notif);
      // TODO: Send notification

      this.status![i] = 'done';
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
}
