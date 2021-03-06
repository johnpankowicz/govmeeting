import { NgModule, APP_INITIALIZER, Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppInitService } from './appinit.service';

// Example of using APP_INITIALIZER twice.
// export function init_app(appInitService: AppInitService) {
//    return () => appInitService.initializeApp();
// }

export function pingFactory(appInitService: AppInitService) {
  return () => appInitService.pingServer();
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AppInitService,

    // Example of using APP_INITIALIZER twice.
    // { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppInitService], multi: true },

    { provide: APP_INITIALIZER, useFactory: pingFactory, deps: [AppInitService], multi: true },
  ],
})
export class AppInitModule {}
