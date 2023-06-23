import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  async getTraining(token: string) {
    if (token) {
      let response = await fetch('/.netlify/functions/readData', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let res: { file: string; data: any[] } = await response.json();
      return res;
    }
    return { file: 'Error', data: [] };
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
    return { file: 'Error', newEntry: {} };
  }

  async deleteTraining(token: string) {
    if (token) {
      let response = await fetch('/.netlify/functions/deleteData', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await response.json();
    } else {
      // Not Logged ...
      return {
        file: 'Error',
        deletedResponse: { acknowledged: false, deletedCount: 0 },
      };
    }
  }
}
