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
      console.log('Init detected', user);
      if (user) {
        this.user = {
          token: user?.token?.access_token,
          username: user?.user_metadata?.full_name,
          email: user?.email,
          id: user?.id,
        };
      }
    });

    //@ts-ignore
    netlifyIdentity.on('login', (user) => {
      console.log('Login detected');
      this.user = {
        token: user?.token?.access_token,
        username: user?.user_metadata?.full_name,
        email: user.email,
        id: user.id,
      };
    });
    //@ts-ignore
    netlifyIdentity.on('logout', () => {
      this.user = {
        token: '',
        username: '',
        email: '',
        id: '',
      };
    });
  }
}
