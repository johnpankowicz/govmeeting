import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { APP_SETTINGS } from './settings';

@Injectable()
export class AppLoadService {
  static isServerRunning() {
      throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) { }

  static isRunning: boolean;

  //isServerRunning(): boolean {
  //  return AppLoadService.isRunning;
  //}

  //initializeApp(): Promise<any> {
  //  return new Promise<void>((resolve, reject) => {
  //    console.log(`initializeApp:: inside promise`);

  //    setTimeout(() => {
  //      console.log(`initializeApp:: inside setTimeout`);
  //      // doing something

  //      resolve();
  //    }, 3000);
  //  });
  //}

  checkIfServerRunning(): Promise<any> {
    console.log(`getSettings:: before http.get call`);

    const promise = this.httpClient.get('https://localhost:44333/weatherforecast')
      .toPromise()
      .then(settings => {
        console.log("get succeeded")
        AppLoadService.isRunning = true;
        return APP_SETTINGS;
      }).catch((err) => {
        console.log("get failed")
        AppLoadService.isRunning = false;
        err
      });

    //const promise = this.httpClient.get('https://private-1ad25-initializeng.apiary-mock.com/settings')
    //  .toPromise()
    //  .then(settings => {
    //    console.log(`Settings from API: `, settings);

    //    APP_SETTINGS.connectionString = settings[0].value;
    //    APP_SETTINGS.defaultImageUrl = settings[1].value;

    //    console.log(`APP_SETTINGS: `, APP_SETTINGS);

    //    return settings;
    //  }).catch((err) => {
    //    err
    //  });

    return promise;
  }
}
