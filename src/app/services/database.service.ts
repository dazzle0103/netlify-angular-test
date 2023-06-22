import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  cache: any;
  constructor() {}

  async getUpdatedCache(token: string) {
    if (token) {
      let response = await fetch('/.netlify/functions/readData', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('GetData - Response:', response);
      let res: { file: string; data: any[] } = await response.json();
      this.cache = res;
    }
    console.log('database-service - cache:', this.getCachedData());
    return this.getCachedData();
  }

  getCachedData() {
    console.log('getCachedData:', this.cache);
    if (this.cache) {
      return this.cache;
    }
    return { file: 'Errorfile', data: [] };
  }

  async writeTraining(trainingsData: any, token: string) {
    console.log('writeTraining:', trainingsData);
    if (token) {
      let response = await fetch('/.netlify/functions/writeData', {
        method: 'POST',
        body: JSON.stringify(trainingsData),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    }
    return { file: 'No File', error: 'error - Not Logged In' };
  }

  async deleteTraining(token: string) {
    if (token) {
      let response = await fetch('/.netlify/functions/deleteData', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await response.json();
    }
    return { file: 'No File', error: 'error - Not Logged In' };
  }
}
