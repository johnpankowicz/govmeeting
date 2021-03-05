import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { APP_SETTINGS } from './settings';

@Injectable()
export class AppInitService {
  static isServerRunning: boolean;

  constructor(private httpClient: HttpClient) { }

  // Example of using APP_INITIALIZER twice.
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

    let promise = new Promise<void>((resolve, reject) => {
      let apiURL = 'https://localhost:44333/weatherforecast';
      this.httpClient.get(apiURL)
        .toPromise()
        .then(
          res => {
            console.log("got response");
            AppInitService.isServerRunning = true;
            resolve();
          }
        )
        .catch((err) => {
          console.log("no response");
          AppInitService.isServerRunning = false;
          reject();
        }
        )
      });
    return promise;
  }

    //const promise = this.httpClient.get('https://localhost:44333/weatherforecast')
    //  .toPromise()
    //  .then(settings => {
    //    console.log("Server running")
    //    AppInitService.isServerRunning = true;
    //  //  resolve();
    //    return APP_SETTINGS;
    //  }).catch((err) => {
    //    console.log("Server not running")
    //    AppInitService.isServerRunning = false;
    //    err
    //  });
}
