import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from 'src/app/services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatListModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userService: UserService = inject(UserService);

  user$: any;
  isLoggedIn$!: BehaviorSubject<boolean>;

  async ngOnInit() {
    this.user$ = await this.userService.getUser();
    this.isLoggedIn$ = this.userService.isLoggedIn$;
  }

  async login() {
    this.userService.login();
    this.isLoggedIn$ = this.userService.isLoggedIn$;
    this.user$ = await this.userService.getUser();
  }
  async logout() {
    this.userService.logout();
    this.user$ = await this.userService.getUser();
  }
  async signup() {
    this.userService.signup();
    this.user$ = await this.userService.getUser();
  }

  async refresh() {
    this.user$ = await this.userService.getUser();
    this.isLoggedIn$ = this.userService.isLoggedIn$;
    console.log('refreshUser-function:');
    console.log(' -> user$:', this.user$);
    console.log(' -> isLoggedIn$:', this.isLoggedIn$);
  }

  shortToken(token: string) {
    return token ? `${token?.slice(0, 10)}...${token?.slice(-10)}` : '';
  }
}
