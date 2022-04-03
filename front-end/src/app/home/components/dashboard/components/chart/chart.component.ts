import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  StockChartComponent,
  PeriodsModel,
} from '@syncfusion/ej2-angular-charts';
import { YahooService } from 'src/app/services/yahoo.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() code = '';
  @ViewChild('chart', { static: true })
  public stock!: StockChartComponent | StockChartComponent;
  public isLoading: boolean = true;

  public chartData!: Object[];
  public crosshair: Object = { enable: true };
  public tooltip: Object = {
    enable: true,
    // header: '<b>${point.x}</b>',
  };
  public marker: Object = { visible: true, width: 100, height: 10 };
  public primaryXAxis: Object = {
    valueType: 'DateTime',
    crosshairTooltip: { enable: true },
  };
  public primaryYAxis: Object = {
    majorTickLines: { color: 'transparent', width: 0 },
    crosshairTooltip: { enable: true },
    opposedPosition: false,
  };

  public i: number = 0;
  public interval: any;
  public setTimeoutValue: number = 10000;
  public periods: PeriodsModel[] = [
    { intervalType: 'Days', interval: 1, text: '1D' },
    { intervalType: 'Weeks', interval: 1, text: '5D' },
    { intervalType: 'Months', interval: 1, text: '1M' },
    { intervalType: 'Months', interval: 3, text: '3M' },
    { intervalType: 'Months', interval: 6, text: '6M', selected: true },
    { intervalType: 'Auto', text: 'YTD' },
    { intervalType: 'Years', interval: 1, text: '1Y' },
    { intervalType: 'Years', interval: 5, text: '5Y' },
    { intervalType: 'Years', interval: 10, text: '10Y' },
  ];
  constructor(private yahooservice: YahooService) {}

  ngOnInit() {
    this.getStockData();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getStockData(): void {
    this.yahooservice.getStockChart(this.code).subscribe((data: any) => {
      this.chartData = data;
      this.isLoading = false;
    });
  }
}
