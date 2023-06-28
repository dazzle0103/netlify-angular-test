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
  user$!: BehaviorSubject<any>;
  isLoggedIn$!: BehaviorSubject<boolean>;

  async ngOnInit() {
    this.user$ = this.userService.user$;
    this.isLoggedIn$ = this.userService.isLoggedIn$;
  }

  async login() {
    this.userService.login();
  }
  async logout() {
    this.userService.logout();
  }
  async signup() {
    this.userService.signup();
  }

  async refresh() {
    this.isLoggedIn$ = this.userService.isLoggedIn$;
    this.user$ = this.userService.user$;
    console.log('REFRESH-User:', this.user$);
    console.log('REFRESH-isLoggedIn:', this.isLoggedIn$);
  }

  getShortToken(token: string) {
    return token ? `${token?.slice(0, 10)}...${token?.slice(-10)}` : '';
  }
}
