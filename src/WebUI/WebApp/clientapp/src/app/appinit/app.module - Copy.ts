import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppInitService } from "./services/appinit.service";

import { HttpClientModule } from "@angular/common/http";
import { MyServiceManagerModule } from "./my-service/my-service-manager.module";

export function pingFactory(appInitService: AppInitService) {
  return () => appInitService.pingServer();
}

@NgModule({
  declarations: [AppComponent],
  // MyServiceManagerModule must be imported calling forRoot on our root module 
  // this module internally handle which service will be used
  imports: [BrowserModule, HttpClientModule, MyServiceManagerModule.forRoot()],
  providers: [
    // our APP_INITIALIZER must be imported on our root module too
    {
      provide: APP_INITIALIZER,
      useFactory: pingFactory,
      deps: [AppInitService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
