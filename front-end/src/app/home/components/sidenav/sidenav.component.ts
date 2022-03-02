import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  title: string = 'Stockaccino';
  isExpanded: boolean = false;

  constructor(private router: Router) {
    // get the current url
    this.router.events.subscribe((url: any) => {
      if (url.url === '/') {
        this.title = 'Tableau de bord';
      } else if (url.url === '/history') {
        this.title = 'Historique des transactions';
      } else if (url.url === '/transactions') {
        this.title = 'Transactions';
      } else if (url.url === '/settings') {
        this.title = 'Paramètres';
      } else if (url.url === '/search') {
        this.title = 'Recherche';
      }
    });
  }

  ngOnInit(): void {}
}
