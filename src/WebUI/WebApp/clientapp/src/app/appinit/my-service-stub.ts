import { Injectable } from "@angular/core";
import { MyService } from "./my-service";

// must extend MyService which is an abstract class
@Injectable()
export class MyServiceStub extends MyService {
  printTime(): void {
    let time = this.getNow();
    console.log("MyServiceStub:printTime ", time);
  }

  getNow(): string {
    let now = Date.now();
    let sec = Math.floor(now / 1000) % 100;
    let ms = now % 1000;
    return sec.toString() + ":" + ms.toString();
  }
}
