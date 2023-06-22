import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from 'src/app/services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatListModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  userService: UserService = inject(UserService);

  test$: any;

  loggedIn: boolean = false;
  async ngOnInit() {
    this.user = this.userService.getUser();
    this.loggedIn = this.userService.isLoggedIn();
    this.test$ = await this.userService.getTestData();
  }

  incrementTest() {
    this.userService.incrementTest();
  }
  login() {
    this.loggedIn = this.userService.login();
  }
  logout() {
    this.loggedIn = this.userService.logout();
  }
  signUp() {
    this.loggedIn = this.userService.signup();
  }

  refreshUser() {
    this.user = this.userService.getUser();
    this.loggedIn = this.userService.isLoggedIn();
    console.log(this.user?.token?.access_token);
  }

  shortToken(token: string) {
    return token ? `${token?.slice(0, 10)}...${token?.slice(-10)}` : '';
  }
}
