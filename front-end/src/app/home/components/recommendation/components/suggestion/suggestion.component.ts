import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss'],
})
export class SuggestionComponent implements AfterViewInit {
  @Output()
  loaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngAfterViewInit(): void {
    this.loaded.emit(true);
  }
}
