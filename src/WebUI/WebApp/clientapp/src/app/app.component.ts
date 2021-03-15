import { Component, HostListener, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
// import {ApplicationRef} from '@angular/core';

import { NavService } from './sidenav/nav.service';
// import { MediaQueryService } from './work_experiments/media-query.service';

import { Router } from '@angular/router';
import { UserSettingsService, UserSettings, LocationType } from './common/user-settings.service';

//import { observableLog } from './logger-service';
import { replaySubjectLog } from './logger-service';
//import { Observable } from 'rxjs/Observable';
//let observableLog = Observable.create((observer: any) => {
//  observer.next('Hey guys!')
//})

///////////////////////////////////////////////////////////////
import { MyService } from "./appinit/my-service";
import { HttpClient } from '@angular/common/http';
////////////////////////////////////////////////////////////////

//let server = "https://localhost:44333/api/WeatherForecast/Get";
let server = "https://localhost:44333/api/HealthCheck/Get";
//let server = "https://localhost:44333/api/GovLocation/GetMyGovLocations";
//let server = "http://no-such-web-server.org";
//let server = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=perl&site=stackoverflow";


const NoLog = true; // set to false for console logging

function addItem(val: any) {
  var node = document.createElement("li");
  var textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById("output").appendChild(node);
}

@Component({
  selector: 'gm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {
  private ClassName: string = this.constructor.name + ': ';
  @ViewChild('sidenav', { static: false }) sidenav: ElementRef;

  // setMode(value) {
  //   this.options.value.mode = value;
  // }

  options: FormGroup;
  mediaQueryList: MediaQueryList;
  private mediaQueryListener: () => void;
  httpClient: HttpClient;

  constructor(
    private _httpClient: HttpClient,
    //////////////////////////////////////////////
    private myService: MyService,
    /////////////////////////////////////////////
    private userSettingsService: UserSettingsService,
    private router: Router,
    public navService: NavService,
    // public mediaQueryService: MediaQueryService,
    fb: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
    // changeDetectorRef: ApplicationRef,
    media: MediaMatcher
  ) {
    this.options = fb.group({
      bottom: 0,
      fixed: true,
      top: 0,
      mode: 'side',
      hasBackdrop: false,
    });
    this.mediaQueryList = media.matchMedia('(max-width: 600px)');
    this.mediaQueryListener = () => {
      changeDetectorRef.detectChanges();
      NoLog || console.log(this.ClassName + 'mediaQueryListener:' + this.mediaQueryList.matches);
      // this.checkDeviceType();
    };
    this.mediaQueryList.addEventListener('change', this.mediaQueryListener);

    /////////////////////////////////////////////////////
    console.log("AppComponent:ngOnInit", this.getNow());
    this.myService.printTime();
    /////////////////////////////////////////////////////

    this.httpClient = _httpClient;
  }

  ngOnInit() {
    let msg = "AppComponent:ngOnInit. Enter";
    this.addFullItem(msg);

    //observableLog.subscribe((x: any) => {
    //  console.log(x);

    replaySubjectLog.subscribe(
      data => this.addFullItem("" + data)
    );

    replaySubjectLog.next("AppComponent:ngOnInit. Talking to myself after subscribing.")


  }

  addFullItem(msg: string) {
    let fullmsg = msg + " " + this.getNow();
    addItem(fullmsg);
  }


  ///////////////////////////////////////////
  getNow(): string {
    let now = Date.now();
    let sec = Math.floor(now / 1000) % 100;
    let ms = now % 1000;
    return sec.toString() + ":" + ms.toString();
  }
  ////////////////////////////////////////////

  ngAfterViewInit() {
    this.navService.sidenav = this.sidenav;
  }

  ngOnDestroy(): void {
    this.mediaQueryList.removeEventListener('change', this.mediaQueryListener);
  }

  isMobile() {
    return false;
    // return this.mediaQueryService.isMobile();
  }

  checkDeviceType() {
    const width = window.innerWidth;
    if (width <= 768) {
      NoLog || console.log(this.ClassName + 'mobile device detected');
    } else if (width > 768 && width <= 992) {
      NoLog || console.log(this.ClassName + 'tablet detected');
    } else {
      NoLog || console.log(this.ClassName + 'desktop detected');
    }
  }

  ///      For testng ///////

  sendSettings() {
    const userSettings: UserSettings = new UserSettings('en', 'Totowa', 'Council');
    this.userSettingsService.settings = userSettings;
  }
  setLanguage() {
    this.userSettingsService.language = 'de';
  }

  routeAbout() {
    this.router.navigateByUrl('about');
  }

  routeDash() {
    this.router.navigateByUrl('dash');
  }

  startPing() {
    this.addFullItem("AppComponent:startPing. Enter");
    const promise = this.httpClient
      .get(server)
      .toPromise()
      .then(settings => {
        this.addFullItem("AppComponent:pingServer Got server response");
        return true;
      })
      .catch(err => {
        this.addFullItem("AppComponent:pingServer. No server Response");
        //this.startAnotherPing();
        err;
      });
  }
}
