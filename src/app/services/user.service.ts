import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any;

  login() {
    this.user = this.getUser();
    //@ts-ignore
    netlifyIdentity.open('login');
    if (this.user) {
      return true;
    }
    return false;
  }
  signup() {
    this.user = this.getUser();
    //@ts-ignore
    netlifyIdentity.open('signup');
    if (this.user) {
      return true;
    }
    return false;
  }
  isLoggedIn() {
    return this.getUser() ? true : false;
  }

  logout() {
    //@ts-ignore
    netlifyIdentity.logout();
    //@ts-ignore
    this.user = netlifyIdentity.currentUser();
    return this.user ? true : false;
  }

  getUser() {
    //@ts-ignore
    this.user = netlifyIdentity.currentUser();
    return this.user;
  }

  constructor() {
    //@ts-ignore
    this.user = netlifyIdentity.currentUser();
    //@ts-ignore
    netlifyIdentity.on('init', (user) => {
      //@ts-ignore
      console.log('Init detected', user, netlifyIdentity.currentUser());
      if (user) {
        this.user = user;
      }
    });

    //@ts-ignore
    netlifyIdentity.on('login', (user) => {
      //@ts-ignore
      console.log('Login detected', user, netlifyIdentity.currentUser());
      if (user) {
        this.user = user;
      }
    });
    //@ts-ignore
    netlifyIdentity.on('logout', () => {
      //@ts-ignore
      console.log('Login detected', netlifyIdentity.currentUser());
      this.user = undefined;
      console.log('after this.user = undefined', this.user);
    });
  }
}
