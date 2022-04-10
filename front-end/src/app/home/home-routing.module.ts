import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryComponent } from './components/history/history.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SearchComponent } from './components/search/search.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'trending',
        component: RecommendationComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
