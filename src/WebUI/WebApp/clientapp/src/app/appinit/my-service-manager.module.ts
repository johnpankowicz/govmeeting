import { ModuleWithProviders, NgModule } from "@angular/core";
import { AppInitService } from "./appinit.service";
import { MyServiceLoader } from "./my-service-loader";
import { MyService } from "./myservice";
import { MyServiceStub } from "./myservice-stub";
import { EditTranscriptService } from '../features/edittranscript/edittranscript.service';
import { EditTranscriptServiceStub } from '../features/edittranscript/edittranscript.service-stub';
import { HttpClient } from "@angular/common/http";


// this factory needs AppInitService to know if our web server is running
// in order to select our service
function myServiceFactory(
  appInitService: AppInitService,
  httpClient: HttpClient
): MyService | MyServiceStub {
  return appInitService.isRunning ? new MyService(httpClient) : new MyServiceStub();
}

//export function editMeetingServiceFactory(
//  appInitService: AppInitService
//): EditTranscriptService | EditTranscriptServiceStub {
//  return appInitService.isRunning ? new EditTranscriptService() : new EditTranscriptServiceStub();
//}

@NgModule()
export class MyServiceManagerModule {
  static forRoot(): ModuleWithProviders<MyServiceManagerModule> {
    return {
      ngModule: MyServiceManagerModule,
      providers: [
        // our service factory
        {
          provide: MyServiceLoader,
          useFactory: myServiceFactory,
          deps: [AppInitService, HttpClient]
        }
      ]
    };
  }
}
