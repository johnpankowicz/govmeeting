import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppInitService } from './appinit.service';

//export function init_app(appInitService: AppInitService) {
//    return () => appInitService.initializeApp();
//}

//export function get_settings(appInitService: AppInitService) {
//    return () => appInitService.getSettings();
//}

export function pingFactory(appInitService: AppInitService) {
  return () => appInitService.checkIfServerRunning();
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    //AppInitService,
    //{ provide: APP_INITIALIZER, useFactory: init_app, deps: [AppInitService], multi: true },
    //{ provide: APP_INITIALIZER, useFactory: get_settings, deps: [AppInitService], multi: true }
    { provide: APP_INITIALIZER, useFactory: pingFactory, deps: [AppInitService], multi: true }
  ]
})
export class AppInitModule { }
