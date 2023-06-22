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

  async ngOnInit() {
    this.user = this.userService.getUser();
  }

  login() {
    //@ts-ignore
    netlifyIdentity.open('login');
  }
  logout() {
    //@ts-ignore
    netlifyIdentity.logout();
  }
  signUp() {
    //@ts-ignore
    netlifyIdentity.open('signup');
  }

  refreshUser() {
    this.user = this.userService.getUser();
    console.log(this.user?.token?.access_token);
  }

  shortToken(token: string) {
    return `${token.slice(0, 10)}...${token.slice(-10)}`;
  }
}