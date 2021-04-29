import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Acme Product Management';

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
  ) { }

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
