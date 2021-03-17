import { Injectable } from '@angular/core';
import { VideoService } from './video.service';

const NoLog = true; // set to false for console logging

@Injectable()
export class VideoServiceStub implements VideoService {
  private ClassName: string = this.constructor.name + ': ';

  getLocation(): string {
    //throw new Error('Method not implemented.');

    let location = 'assets/stubdata/';

    //if (appData.isLargeEditData) {
    //  location = 'assets/stubdata/LARGE/';
    //}

    NoLog || console.log(this.ClassName + 'location=' + location);
   return location;

  }

  getFileBasename() {

    //if (appData.isLargeEditData) {
    //  fileBasename = 'USA_NJ_Passaic_LittleFalls_TownshipCouncil_en_2020-06-20';
    //}

    let fileBasename = 'ToEdit';
    return fileBasename;

  }
}
