import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabaseService } from 'src/app/services/database.service';

import { MatButtonModule } from '@angular/material/button';

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

  constructor() {}
  async ngOnInit() {
    let cache = this.databaseService.getCachedData();
    console.log('chache', cache?.data);

    if (cache?.data?.length) {
      this.trainingsList = cache?.data;
      console.log('CACHED DATA: ', this.trainingsList);
    }

    //@ts-ignore
    const user = netlifyIdentity.currentUser();
    if (user) {
      console.log('user', user);
      let updatedCache = await this.databaseService.getUpdatedCache(
        user?.token?.access_token
      );
      this.trainingsList = updatedCache?.data;
    }
  }

  async deleteHistory() {
    //@ts-ignore
    const user = netlifyIdentity.currentUser();
    await this.databaseService.deleteTraining(user?.token?.access_token);

    let updatedCache = await this.databaseService.getUpdatedCache(
      user?.token?.access_token
    );
    this.trainingsList = updatedCache?.data;
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
