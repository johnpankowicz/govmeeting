import { Component } from "@angular/core";
import { MyServiceLoader } from "./my-service/my-service-loader";

@Component({
  selector: "app-root",
  template: `
    <h2>Test for server running</h2>
  `
})
export class AppComponent {
  title = "testasync";

  // MyServiceLoader must be imported
  constructor(private myService: MyServiceLoader) {
    console.log("AppComponent:ngOnInit", this.getNow());
    this.myService.printTime();
  }

  getNow(): string {
    let now = Date.now();
    let sec = Math.floor(now / 1000) % 100;
    let ms = now % 1000;
    return sec.toString() + ":" + ms.toString();
  }
}
