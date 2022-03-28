import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  IStockChartEventArgs,
  getElement,
  PeriodsModel,
  StockChartComponent,
} from '@syncfusion/ej2-angular-charts';
import { chartData } from './datasource';
import { ToolbarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChartComponent implements OnInit, OnDestroy {
  public chartData: Object[] = chartData;
  public periods!: Object;
  public title: string = 'Apple Inc. (AAPL)';
  public i: number = 0;
  public interval: any;
  public setTimeoutValue!: number;
  @ViewChild('chart', { static: true })
  public stock!: StockChartComponent | StockChartComponent;

  constructor() {}

  ngOnInit() {
    this.periods = {
      position: 'Top',
      periods: [
        { intervalType: 'Minutes', interval: 1, text: '1m' },
        { intervalType: 'Minutes', interval: 30, text: '30m' },
        { intervalType: 'Hours', interval: 1, text: '1H', selected: true },
        { intervalType: 'Hours', interval: 2, text: '2H' },
      ],
    };
    this.setTimeoutValue = 5000;
    this.interval = setInterval(() => {
      let i: number;
      if (getElement('chart-container') === null) {
        clearInterval(this.interval);
      } else {
        this.chartData.push({
          date: new Date(
            new Date('2017-09-18').setDate(
              new Date('2017-09-18').getDate() + this.i + 1
            )
          ),
          high: Math.floor(Math.random() * (100 - 90 + 1) + 90),
          low: Math.floor(Math.random() * (60 - 50 + 1) + 50),
          close: Math.floor(Math.random() * (99 - 51 + 1) + 51),
          open: Math.floor(Math.random() * (99 - 51 + 1) + 51),
        });
        this.i++;
        this.stock.series[0].dataSource = this.chartData;
        this.stock.refresh();
      }
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
