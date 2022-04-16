import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss'],
})
export class RecommendationComponent implements AfterViewInit {
  loading: number = 1;

  constructor(private spinner: NgxSpinnerService) {}

  ngAfterViewInit(): void {
    this.spinner.show();
  }

  loaded() {
    this.loading--;
    if (this.loading == 0) this.spinner.hide();
  }
}
