import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private cookieService: CookieService,
    private _userService: UserService
  ) {}

  deconnexion() {
    //TODO: https://github.com/levydanqc/stockaccino/issues/7
    this.cookieService.delete('id');
    location.reload();
  }
}
