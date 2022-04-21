import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import {
  Screener,
  screenersCategories,
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

  constructor(private yahooService: YahooService) {}

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
}
