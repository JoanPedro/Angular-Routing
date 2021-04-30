import { slideInAnimation } from './app.animation';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(
    private readonly authService: AuthService,
    private readonly route: Router
  ) {
    route.events.subscribe(this.checkRouterEvent)
  }

  checkRouterEvent = (routerEvent: Event) => {
    if (routerEvent instanceof NavigationStart)
      this.loading = true;

    if (routerEvent instanceof NavigationEnd
      || routerEvent instanceof NavigationCancel
      || routerEvent instanceof NavigationError)
      this.loading = false;
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    //  https:localhost:4200/products(popup:messages)
    // this.route.navigate(['/welcome'])
    //  result => https:localhost:4200/welcome(popup:messages)
    this.route.navigateByUrl('/welcome')
    //  result => https:localhost:4200/welcome
  }
}
