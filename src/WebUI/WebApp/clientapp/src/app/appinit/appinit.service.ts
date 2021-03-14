import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

let server = "https://localhost:44333/api/HealthCheck/Get";
//let server = "http://no-such-web-server.org";
// let server = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=perl&site=stackoverflow";

@Injectable({ providedIn: "root" })
export class AppInitService {
  constructor(private httpClient: HttpClient) {}

  isRunning: boolean | null = null;

  pingServer(): Promise<any> {
    logMsg("pingServer. Enter");

    const promise = this.httpClient
      .get(server)
      .toPromise()
      .then(settings => {
        logMsg("pingServer Got server response");
        this.isRunning = true;
        return true;
      })
      .catch(err => {
        logMsg("pingServer No server Response");
        this.isRunning = false;
        err;
      });
    return promise;
  }
}

function logMsg(msg: string) {
  //console.log("AppInitService:", msg, getNow());
  let fullmsg = "AppInitService:" + msg + " " + getNow();
  console.log(fullmsg);
//  addItem("fullmsg");
}

function getNow() {
  let now = Date.now();
  let sec = Math.floor(now / 1000) % 100;
  let ms = now % 1000;
  return sec.toString() + ":" + ms.toString();
}

function addItem(val: any) {
  var node = document.createElement("li");
  var textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById("output").appendChild(node);
}


