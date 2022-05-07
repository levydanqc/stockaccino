import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.scss'],
})
export class NotificationMenuComponent {
  show: boolean = false;
  constructor() {}

  openNotification(state: boolean) {
    this.show = state;
  }
}
