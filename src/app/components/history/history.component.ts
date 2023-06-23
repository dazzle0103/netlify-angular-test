import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabaseService } from 'src/app/services/database.service';
import { UserService } from 'src/app/services/user.service';

import { MatButtonModule } from '@angular/material/button';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  trainingsList: any = [];
  databaseService: DatabaseService = inject(DatabaseService);
  cacheService: CacheService = inject(CacheService);
  userService: UserService = inject(UserService);

  async ngOnInit() {
    if (await this.userService.getIsLoggedIn()) {
      const user = await this.userService.getUser();
      this.trainingsList = this.cacheService.getCache(
        user?.token?.access_token
      ).data;
    }
  }

  async deleteHistory() {
    if ((await this.userService.getIsLoggedIn()) && this.trainingsList.length) {
      const user = await this.userService.getUser();

      // Positive Deletion
      this.cacheService.clearCache(user?.token?.access_token);
      this.trainingsList = this.cacheService.getCache(
        user?.token?.access_token
      ).data;

      const deletedResponse = await this.databaseService.deleteTraining(
        user?.token?.access_token
      );
      if (deletedResponse.deletedCount <= 0) {
        // Error... Revert cache
        alert('Error deleting History');
        this.cacheService.updateCacheFromDatabase(user?.token?.access_token);
        this.trainingsList = this.cacheService.getCache(
          user?.token?.access_token
        ).data;
      } else {
        // all good. nothing else to do?
        alert('Deletion Completed in database');
      }
    } else {
      // error
      alert(`ERROR: No User logged in!`);
    }
  }

  getTotalSum(arr: number[]) {
    return arr.length ? arr.reduce((acc, val) => acc + val) : 0;
  }
  getTrainingString(arr: number[]) {
    return arr.length ? arr.join('-') : '';
  }
  getTotalPushups() {
    let x = this.trainingsList.map((el: any) => this.getTotalSum(el?.training));
    return this.getTotalSum(x);
  }
}
