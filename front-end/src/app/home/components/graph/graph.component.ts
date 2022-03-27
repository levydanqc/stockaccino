import { Component } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent {
  private format: string = `
    high: <b>\${point.high}</b><br/>
     low: <b>\${point.low}</b><br/>
    open: <b>\${point.open}</b><br/>
   close: <b>\${point.close}</b><br/>
  volume: <b>\${point.volume}</b>
  `
  public data: Object[];
  public xAxis: Object;
  public chartTitle: string;
  public yAxis: Object;
  public tooltipSettings: Object = { enable: true, header: '<b>${point.x}</b>', format: this.format };
  public crossSettings: Object = { enable: true, lineType: 'Horizontal'};
  public crosshairTooltipSettings: Object = { enable: true };
  public enableSolidCandles: Object = { enable: true };
  public marker: Object = { visible: true, width: 10, height: 10, shape: 'Rectangle'};
  
  constructor() {
    this.chartTitle = 'Graph';
    this.xAxis = {
      title: 'Date Time',
      valueType: 'DateTimeCategory',
      labelFormat: 'd/M/yy',
      intervalType: 'Days',
      crosshairTooltip: this.crosshairTooltipSettings,
      majorGridLines: { width: 0 },
    };
    this.yAxis = {
      title: 'Prix',
      crosshairTooltip: this.crosshairTooltipSettings,
    };
    this.data = [
      { x: new Date('2018-01-01'), high: 160, low: 100, open: 120, close: 140, volume: 90000 },
      { x: new Date('2018-01-02'), high: 190, low: 130, open: 150, close: 170, volume: 50000 },
      { x: new Date('2018-01-03'), high: 170, low: 110, open: 130, close: 150, volume: 50000 },
      { x: new Date('2018-01-04'), high: 180, low: 120, open: 160, close: 140, volume: 50000 },
      { x: new Date('2018-01-05'), high: 170, low: 110, open: 150, close: 130, volume: 90000 },
      { x: new Date('2018-01-06'), high: 85, low: 70, open: 70, close: 80, volume: 90000 },
      { x: new Date('2018-01-07'), high: 80, low: 65, open: 85, close: 80, volume: 90000 },
      { x: new Date('2018-01-08'), high: 90, low: 75, open: 70, close: 80, volume: 90000 },
      { x: new Date('2018-01-09'), high: 80, low: 70, open: 70, close: 80, volume: 90000 },
      { x: new Date('2018-01-10'), high: 85, low: 75, open: 70, close: 80, volume: 90000 },
      { x: new Date('2018-01-11'), high: 90, low: 80, open: 85, close: 80, volume: 90000 },
      { x: new Date('2018-01-12'), high: 85, low: 75, open: 85, close: 80, volume: 90000 },
      { x: new Date('2018-01-13'), high: 80, low: 70, open: 70, close: 80, volume: 90000 },
      { x: new Date('2018-01-14'), high: 90, low: 75, open: 70, close: 80, volume: 10000 },
      { x: new Date('2018-01-15'), high: 85, low: 70, open: 70, close: 80, volume: 10000 },
      { x: new Date('2018-01-16'), high: 80, low: 65, open: 70, close: 80, volume: 10000 },
      { x: new Date('2018-01-17'), high: 85, low: 70, open: 85, close: 80, volume: 10000 },
      { x: new Date('2018-01-18'), high: 80, low: 65, open: 70, close: 80, volume: 90000 },
      { x: new Date('2018-01-19'), high: 90, low: 75, open: 85, close: 80, volume: 90000 },
      { x: new Date('2018-01-20'), high: 80, low: 70, open: 70, close: 80, volume: 90000 },
    ];
  }
}
