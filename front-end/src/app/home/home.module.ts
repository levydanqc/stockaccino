import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';

import { DashboardRoutingModule } from './home-routing.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { HistoryComponent } from './components/history/history.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SearchComponent } from './components/search/search.component';

import { NgxSpinnerModule } from 'ngx-spinner';

schemas: [CUSTOM_ELEMENTS_SCHEMA];

@NgModule({
  declarations: [
    SidenavComponent,
    DashboardComponent,
    HistoryComponent,
    SettingsComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    NgxSpinnerModule,
  ],
  exports: [NgxSpinnerModule],
})
export class DashboardModule {}
