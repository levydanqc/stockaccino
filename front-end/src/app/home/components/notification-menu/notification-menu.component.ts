import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from 'src/app/classes/users/notification';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.scss'],
})
export class NotificationMenuComponent implements OnInit {
  show: boolean = false;
  icon: string = 'notifications_none';
  notifications!: Notification[];
  unread: number = 0;

  constructor(private _userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchNotifications();
    setInterval(() => {
      this.fetchNotifications();
    }, 3000);
  }

  toggleNotification(state: boolean) {
    this.show = state;
  }

  updateNotification(notification: Notification, read: boolean) {
    if (notification.Read === read) return;
    notification.Read = read;
    this._userService.updateNotification(notification).subscribe((res) => {
      notification.Read = true;
    });
  }

  fetchNotifications() {
    this._userService.getUserById().subscribe((user) => {
      this.notifications = user.Notifications.reverse();
      this.nbUnread();
    });
  }

  nbUnread() {
    let nb = 0;
    if (this.notifications && this.notifications.length > 0) {
      this.notifications.forEach((notification) => {
        if (!notification.Read) nb++;
      });
    }
    this.unread = nb;
  }

  getLink(notification: Notification) {
    this.updateNotification(notification, true);
    if (notification.Message.includes('recommande')) {
      this.router.navigate(['/search'], {
        queryParams: {
          searchedStock: notification.Message.split(' ')
            .pop()
            ?.replace('.', ''),
        },
      });
    } else if (notification.Message.includes('ami')) {
      this.router.navigate(['/social']);
    }
    return null;
  }
}
