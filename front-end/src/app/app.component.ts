import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'Stockaccino';

  constructor(router: Router, route: ActivatedRoute) {
    router.events
      .pipe(filter((e: any) => e instanceof NavigationEnd))
      .forEach((e: any) => {
        this.title = route.root.firstChild!.snapshot.data['title'];
      });
  }
}
