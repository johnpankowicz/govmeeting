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
    console.log(`pingServer:: before ping`);

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

//  delay(ms: number) {
//  return new Promise(resolve => setTimeout(resolve, ms));
//}

static async isWebServerRunning() {
  // Use value if specified in environment file.
  //if (environment.useServerStubs != null) {
  //  return environment.useServerStubs;
  //}
  // Use stubs if server is not running.

  const delay = ms => new Promise(res => setTimeout(res, ms));
  let running = null;
  let i = 0;
  while (true) {
    //running = AppInitService.isServerRunning;
    running = this.isServerRunning;
    if (running !== null) {
      break;
    }
    await delay(100);
    i++;
  }

  console.log("isServerRunning=" + String(running) + " time=" + i);
  return running;
}


  fetchDataAsPromise() {
    return this.httpClient
      .get(
        `https://localhost:44333/weatherforecast`
      )
      .toPromise();
  }


}
