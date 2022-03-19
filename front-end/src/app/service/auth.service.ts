import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  isLoggedIn() {
    // TODO: https://github.com/levydanqc/stockaccino/issues/7
    return this.cookieService.check('UserEmail');
  }
}
