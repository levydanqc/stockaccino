import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  routes: any = {
    '/login': 'Connexion',
    '/dashboard': 'Tableau de bord',
    '/signin': 'Inscription',
  };

  opened: boolean = false;
  title: string = 'Stockaccino';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.title = this.routes[event.url];
      }
    });
  }
}
