import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.scss'],
})
export class NotificationMenuComponent {
  show: boolean = false;
  icon: string = 'notifications_none';
  notifications = [
    { message: "You've received a new message", read: false },
    { message: "You've received a new message", read: false },
    { message: "You've received a new message", read: false },
  ];

  constructor() {}

  toggleNotification(state: boolean) {
    console.log(state);
    this.show = state;
  }
}
