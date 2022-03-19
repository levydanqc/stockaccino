import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private cookieService: CookieService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {}

  deconnexion() {
    //TODO: https://github.com/levydanqc/stockaccino/issues/7
    this.cookieService.delete('id');
    location.reload();
  }
}
