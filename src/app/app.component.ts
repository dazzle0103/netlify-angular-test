import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { UserService } from './services/user.service';
import { BehaviorSubject } from 'rxjs';

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
  userService: UserService = inject(UserService);
  isLoggedIn$: boolean = false;

  async ngOnInit() {
    this.isLoggedIn$ = await this.userService.getIsLoggedIn();
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

  constructor(private cdr: ChangeDetectorRef) {}

  async login() {
    this.userService.login();
    this.isLoggedIn$ = await this.userService.getIsLoggedIn();
    this.cdr.detectChanges();
  }
  async signup() {
    this.userService.signup();
    this.isLoggedIn$ = await this.userService.getIsLoggedIn();

    this.cdr.detectChanges();
  }
  async logout() {
    this.userService.logout();
    this.isLoggedIn$ = await this.userService.getIsLoggedIn();

    this.cdr.detectChanges();
  }

  async refresh() {
    this.isLoggedIn$ = await this.userService.getIsLoggedIn();

    console.log('refreshUser-function:');
    console.log(' -> isLoggedIn$:', this.isLoggedIn$);
  }
}
