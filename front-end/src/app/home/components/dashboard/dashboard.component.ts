import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  message!: string;

  constructor(private cookieService: CookieService) {}

  deconnexion() {
    //TODO: https://github.com/levydanqc/stockaccino/issues/7
    this.cookieService.delete('UserEmail');
    location.reload();
  }
}
