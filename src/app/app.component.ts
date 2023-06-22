import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'My Push up Tracker';
  loggedIn: boolean = false;

  userService: UserService = inject(UserService);

  ngOnInit() {
    this.loggedIn = this.userService.isLoggedIn();
  }

  navigationList: { link: string; text: string; active: boolean }[] = [
    { link: '/home', text: 'Home', active: true },
    { link: '/dashboard', text: 'Dashboard', active: true },
    { link: '/tracking', text: 'Tracking Form', active: true },
    { link: '/history', text: 'History', active: true },
    { link: '/goal', text: 'Goals', active: false },
    { link: '/reminder', text: 'Reminder', active: false },
  ];
  filteredNavigationList: { link: string; text: string; active: boolean }[] =
    this.navigationList.filter((el) => el.active);

  login() {
    this.loggedIn = this.userService.login();
  }
  signup() {
    this.loggedIn = this.userService.signup();
  }
  logout() {
    this.loggedIn = this.userService.logout();
  }
}
