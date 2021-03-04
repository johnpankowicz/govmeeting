import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { APP_SETTINGS } from './settings';

@Injectable()
export class AppLoadService {
  static isServerRunning: boolean;
  //static isServerRunning() {
  //    return this.isRunning;
  //}

  constructor(private httpClient: HttpClient) { }

  //isRunning: boolean;

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
        console.log("Server running")
        AppLoadService.isServerRunning = true;
        return APP_SETTINGS;
      }).catch((err) => {
        console.log("Server not running")
        AppLoadService.isServerRunning = false;
        err
      });

    return promise;
  }
}
