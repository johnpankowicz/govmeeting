import { Injectable } from '@angular/core';
import { VideoService } from './video.service';

const NoLog = true; // set to false for console logging

@Injectable()
export class VideoServiceReal implements VideoService {
  private ClassName: string = this.constructor.name + ': ';

  getLocation(): string {
    //throw new Error('Method not implemented.');

    let location = 'datafiles/PROCESSING/USA_ME_LincolnCounty_BoothbayHarbor_Selectmen_en/2017-02-15/Edit/part01/';
    let fileBasename = 'ToEdit';

    NoLog || console.log(this.ClassName + 'location=' + location);

    return location;
  }

  getFileBasename(): string {
    let fileBasename = 'ToEdit';
    return fileBasename;
  }
}
