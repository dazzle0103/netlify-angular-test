import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  cacheService: CacheService = inject(CacheService);

  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  //@ts-ignore
  user$ = new BehaviorSubject<any>(netlifyIdentity.currentUser());
  setIsLoggedIn(login: boolean) {
    this.isLoggedIn$.next(login);
  }
  setUser(user: any) {
    this.user$.next(user);
  }

  login() {
    //@ts-ignore
    netlifyIdentity.open('login');
  }
  signup() {
    //@ts-ignore
    netlifyIdentity.open('signup');
  }
  logout() {
    //@ts-ignore
    netlifyIdentity.logout();
  }

  async getUser() {
    //@ts-ignore
    return netlifyIdentity.currentUser();
  }

  constructor() {
    //@ts-ignore
    netlifyIdentity.on('init', (user) => {
      if (user) {
        console.log('netlifyIdentity - Init with User Object:', user);
        this.setIsLoggedIn(true);
      } else {
        console.log('netlifyIdentity - Init with undefined User Oject');
        this.setIsLoggedIn(false);
      }
      //@ts-ignore
      this.setUser(netlifyIdentity.currentUser());
    });

    //@ts-ignore
    netlifyIdentity.on('login', async (user) => {
      if (user) {
        console.log('netlifyIdentity - LOGIN with User Object:', user);
        this.setIsLoggedIn(true);
        await this.cacheService.updateCacheFromDatabase(
          user?.token?.access_token
        );
      } else {
        console.log(
          'netlifyIdentity - LOGIN without User Oject, I dont think this path is possible here',
          user
        );
        this.setIsLoggedIn(false);
        this.cacheService.clearCache(user?.token?.access_token);
      }
      //@ts-ignore
      this.setUser(netlifyIdentity.currentUser());
    });
    //@ts-ignore
    netlifyIdentity.on('logout', () => {
      console.log('netlifyIdentity - LOGOUT, NO OBJECT');
      this.setIsLoggedIn(false);
      //@ts-ignore
      this.setUser(netlifyIdentity.currentUser());

      console.log('login$:', this.isLoggedIn$);
      console.log('netlifyUser$:', this.user$);
    });
  }
}
