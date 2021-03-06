import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppInitService {
  static isServerRunning: boolean = null;

  constructor(private httpClient: HttpClient) { }

  pingServer(): Promise<any> {
    console.log(`pingServer:: before ping`);

    const promise = this.httpClient.get('https://localhost:44333/weatherforecast')
      .toPromise()
      .then(settings => {
        console.log("Got server response")
        AppInitService.isServerRunning = true;
        return true;
      }).catch((err) => {
        console.log("No server Response")
        AppInitService.isServerRunning = false;
        err
      });

    return promise;
  }

  static async isWebServerRunning() {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    let running = null;
    let i = 0;
    // check every 100 milliseconds
    while ((running = AppInitService.isServerRunning) === null) {
      await delay(100);
      i++;
    }
    console.log("isServerRunning=" + String(running) + " time=" + i);
    return running;
  }

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

}
