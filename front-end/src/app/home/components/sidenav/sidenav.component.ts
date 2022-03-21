import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs';
import { YahooService } from 'src/app/service/yahoo.service';

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  title: string = 'Stockaccino';
  isExpanded: boolean = false;
  input = new FormControl();
  filteredResults: any;
  isLoading = false;

  constructor(private router: Router, private yahooService: YahooService) {
    // get the current url
    this.router.events.subscribe((url: any) => {
      if (url.url === '/') {
        this.title = 'Tableau de bord';
      } else if (url.url === '/history') {
        this.title = 'Historique des transactions';
      } else if (url.url === '/transactions') {
        this.title = 'Transactions';
      } else if (url.url === '/settings') {
        this.title = 'Paramètres';
      } else if (url.url === '/search') {
        this.title = 'Recherche';
      }
    });
  }

  ngOnInit() {
    this.input.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.filteredResults = [];
          this.isLoading = true;
        }),
        switchMap((value) => {
          if (value.length > 0) {
            return this.yahooService.getAutocomplete(value).pipe(
              finalize(() => {
                this.isLoading = false;
              })
            );
          }
          this.isLoading = false;
          return [];
        })
      )
      .subscribe((data) => {
        this.filteredResults = data;
      });
  }
}
