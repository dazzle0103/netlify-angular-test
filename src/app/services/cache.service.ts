import { Injectable, inject } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: { file: string; data: any[] } = {
    file: 'cache',
    data: [],
  };
  databaseService: DatabaseService = inject(DatabaseService);

  getCache(token: string) {
    return this.cache;
  }

  async updateCacheFromDatabase(token: string) {
    this.cache = await this.databaseService.getTraining(token);
    this.cache.file = 'cache';
  }

  clearCache(token: string) {
    this.cache = {
      file: 'cache',
      data: [],
    };
  }

  addTrainingToCache(training: any, token: string) {
    this.cache?.data.push(training);
  }

  removeLastTrainingFromCache(token: string) {
    this.cache?.data.pop();
  }
}
