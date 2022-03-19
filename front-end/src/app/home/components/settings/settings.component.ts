import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  email!: string;
  prenom!: string;
  nom!: string;

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    if (this.cookieService.get('UserEmail')) {
      this.email = this.cookieService.get('UserEmail');
    }
  }

}
