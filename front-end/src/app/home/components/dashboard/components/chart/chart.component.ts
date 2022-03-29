import {
  Component,
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
} from '@syncfusion/ej2-angular-charts';
import { chartData } from './datasource';
import {
  ItemModel,
  MenuEventArgs,
  ToolbarComponent,
} from '@syncfusion/ej2-angular-navigations';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';

import { Button } from '@syncfusion/ej2-buttons';

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
  public selectorRender!: (args: IRangeSelectorRenderEventArgs) => void;
  public onRangeChange!: (args: any) => void;
  public indicators: Object[] = [];

  constructor() {}

  ngOnInit() {
    this.selectorRender = (args: IRangeSelectorRenderEventArgs) => {
      console.log(args);
    };

    this.onRangeChange= (args: any) => {
      console.log(args);
    };

    this.periods = {
      position: 'Left',
      periods: [
        { intervalType: 'Days', interval: 1, text: '1D' },
        { intervalType: 'Days', interval: 3, text: '3D' },
        { intervalType: 'Days', interval: 6, text: '6D' },
        { intervalType: 'Weeks', interval: 1, text: '1W' },
        { intervalType: 'Months', interval: 1, text: '1M' },
        ,
        { intervalType: 'Months', interval: 6, text: '6M' },
        { intervalType: 'Years', interval: 1, text: '1Y' },
        { intervalType: 'Years', interval: 5, text: '5Y' },
        { intervalType: 'Years', interval: 10, text: '10Y' },
        { intervalType: 'Auto', text: 'YTD' },
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
