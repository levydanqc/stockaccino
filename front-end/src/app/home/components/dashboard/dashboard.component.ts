import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  message!: string;

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    if (this.cookieService.get('UserEmail')) {
      this.message = "Bienvenue, " + this.cookieService.get('UserEmail');
    }
  }

  deconnexion() {
    this.cookieService.delete('UserEmail');
    location.reload();
  }

}
