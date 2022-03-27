import { Component } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent {
  public data: Object[];
  public xAxis: Object;

  constructor() {
    this.xAxis = {
      valueType: 'DateTime',
    };
    this.data = [
      { x: new Date('2018-01-01'), high: 80, low: 70 },
      { x: new Date('2018-01-02'), high: 90, low: 75 },
      { x: new Date('2018-01-03'), high: 85, low: 70 },
      { x: new Date('2018-01-04'), high: 95, low: 85 },
      { x: new Date('2018-01-05'), high: 80, low: 65 },
      { x: new Date('2018-01-06'), high: 85, low: 70 },
      { x: new Date('2018-01-07'), high: 80, low: 65 },
      { x: new Date('2018-01-08'), high: 90, low: 75 },
      { x: new Date('2018-01-09'), high: 80, low: 70 },
      { x: new Date('2018-01-10'), high: 85, low: 75 },
      { x: new Date('2018-01-11'), high: 90, low: 80 },
      { x: new Date('2018-01-12'), high: 85, low: 75 },
      { x: new Date('2018-01-13'), high: 80, low: 70 },
      { x: new Date('2018-01-14'), high: 90, low: 75 },
      { x: new Date('2018-01-15'), high: 85, low: 70 },
      { x: new Date('2018-01-16'), high: 80, low: 65 },
      { x: new Date('2018-01-17'), high: 85, low: 70 },
      { x: new Date('2018-01-18'), high: 80, low: 65 },
      { x: new Date('2018-01-19'), high: 90, low: 75 },
      { x: new Date('2018-01-20'), high: 80, low: 70 },
    ];
  }
}
