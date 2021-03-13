import { Injectable } from "@angular/core";
import { MyServiceLoader } from "./my-service-loader";
import { HttpClient } from "@angular/common/http"

// must extend MyServiceLoader which is an abstract class
@Injectable()
export class MyService extends MyServiceLoader {
  http: HttpClient;
  constructor(private _http: HttpClient) {
    super();
    this.http = _http;
  }

  printTime(): void {
    let time = this.getNow();
    console.log("MyService:printTime ", time);
  }

  getNow(): string {
    let now = Date.now();
    let sec = Math.floor(now / 1000) % 100;
    let ms = now % 1000;
    return sec.toString() + ":" + ms.toString();
  }
}
