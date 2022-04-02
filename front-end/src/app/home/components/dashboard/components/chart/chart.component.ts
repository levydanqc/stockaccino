import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  getElement,
  StockChartComponent,
  IRangeSelectorRenderEventArgs,
  IRangeLoadedEventArgs,
  PeriodsModel,
} from '@syncfusion/ej2-angular-charts';
import { chartData } from './datasource';
import {
  ItemModel,
  MenuEventArgs,
  ToolbarComponent,
} from '@syncfusion/ej2-angular-navigations';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';

import { Button } from '@syncfusion/ej2-buttons';
import { YahooService } from 'src/app/services/yahoo.service';
import { ChartRange } from 'src/app/classes/yahoo/range';

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

  public chartData: Object[] = [];
  public crosshair: Object = { enable: true };
  public tooltip: Object = { enable: true };
  public marker: Object = { visible: true, width: 10, height: 10 };

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
    // this.interval = setInterval(() => {
    //   let i: number;
    //   if (getElement('chart-container') === null) {
    //     clearInterval(this.interval);
    //   } else {
    //     this.chartData.push({
    //       date: new Date(
    //         new Date('2017-09-18').setDate(
    //           new Date('2017-09-18').getDate() + this.i + 1
    //         )
    //       ),
    //       high: Math.floor(Math.random() * (100 - 90 + 1) + 90),
    //       low: Math.floor(Math.random() * (60 - 50 + 1) + 50),
    //       close: Math.floor(Math.random() * (99 - 51 + 1) + 51),
    //       open: Math.floor(Math.random() * (99 - 51 + 1) + 51),
    //     });
    //     this.i++;
    //     this.stock.series[0].dataSource = this.chartData;
    //     this.stock.refresh();
    //   }
    // }, this.setTimeoutValue);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getStockData(): void {
    this.yahooservice
      .getStockChart(this.code, ChartRange.TEN_YEARS)
      .subscribe((data: any) => {
        this.chartData.push(...data);
        this.chartData = this.chartData.sort(
          (objA: any, objB: any) => objA.Date.getTime() - objB.Date.getTime()
        );
      });
    this.yahooservice
      .getStockChart(this.code, ChartRange.ONE_MONTH)
      .subscribe((data: any) => {
        this.chartData.push(...data);
        this.chartData = this.chartData.sort(
          (objA: any, objB: any) => objA.Date.getTime() - objB.Date.getTime()
        );
      });
    this.yahooservice
      .getStockChart(this.code, ChartRange.FIVE_DAYS)
      .subscribe((data: any) => {
        this.chartData.push(...data);
        this.chartData = this.chartData.sort(
          (objA: any, objB: any) => objA.Date.getTime() - objB.Date.getTime()
        );
      });
  }
}
