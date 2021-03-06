import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { APP_SETTINGS } from './settings';

@Injectable()
export class AppInitService {
  static isServerRunning: boolean = null;

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

  pingServer(): Promise<any> {
    console.log(`pingServers:: before ping`);

    const promise = this.httpClient.get('https://localhost:44333/weatherforecast')
      .toPromise()
      .then(settings => {
        console.log("Got response")
        AppInitService.isServerRunning = true;
        return true;
      }).catch((err) => {
        console.log("No Response")
        AppInitService.isServerRunning = false;
        err
      });

    return promise;
  }

  fetchDataAsPromise() {
    return this.httpClient
      .get(
        `https://localhost:44333/weatherforecast`
      )
      .toPromise();
  }


}
