import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  Screener,
  screenersCategories,
  Suggestion,
} from 'src/app/classes/yahoo/suggestion';
import { YahooService } from 'src/app/services/yahoo.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss'],
})
export class SuggestionComponent implements AfterViewInit {
  screeners: Screener[] = [];
  opened: Screener | undefined;
  @Output()
  loaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private yahooService: YahooService, private router: Router) {}

  ngAfterViewInit(): void {
    screenersCategories.forEach((screener) => {
      this.yahooService.getSuggestion(screener).subscribe((data: Screener) => {
        this.screeners.push(data);
        if (this.screeners.length == screenersCategories.length)
          this.loaded.emit(true);
      });
    });
  }

  changed(opened: boolean, item: any) {
    this.opened = opened ? item : undefined;
  }

  voirStock(stock: Suggestion) {
    this.router.navigate(['/search'], {
      queryParams: { searchedStock: stock.Symbol },
    });
  }
}
