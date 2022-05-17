import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss'],
})
export class RecommendationComponent implements AfterViewInit {
  loading: number = 2;

  constructor(private spinner: NgxSpinnerService) {}

  ngAfterViewInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  loaded() {
    this.loading--;
    if (this.loading == 0) this.spinner.hide();
  }
}
