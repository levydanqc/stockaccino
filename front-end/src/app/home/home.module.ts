import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';

import { DashboardRoutingModule } from './home-routing.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { SocialComponent } from './components/social/social.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SearchComponent } from './components/search/search.component';

import { ChartComponent } from './components/chart/chart.component';

import {
  ChartAllModule,
  StockChartAllModule,
  RangeNavigatorAllModule,
} from '@syncfusion/ej2-angular-charts';
import {
  DateTimeService,
  LegendService,
  TooltipService,
  CategoryService,
  LineSeriesService,
  TmaIndicatorService,
  ColumnSeriesService,
  RangeAreaSeriesService,
} from '@syncfusion/ej2-angular-charts';
import {
  DataLabelService,
  CandleSeriesService,
} from '@syncfusion/ej2-angular-charts';

import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

schemas: [CUSTOM_ELEMENTS_SCHEMA];

@NgModule({
  declarations: [
    SidenavComponent,
    DashboardComponent,
    SocialComponent,
    SettingsComponent,
    SearchComponent,
    ChartComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ChartAllModule,
    StockChartAllModule,
    ToolbarModule,
    RangeNavigatorAllModule,
  ],
  providers: [
    DateTimeService,
    LegendService,
    TooltipService,
    DataLabelService,
    CandleSeriesService,
    CategoryService,
    LineSeriesService,
    TmaIndicatorService,
    ColumnSeriesService,
    RangeAreaSeriesService,
  ],
})
export class DashboardModule {}
