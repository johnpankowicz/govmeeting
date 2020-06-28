import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ErrorHandlingService } from '../shared/error-handling/error-handling.service';
import { AllUserData } from './ngrx-chat.models';
import { SAMPLE_ALL_DATA } from './ngrx-chat.data';

const postdataUrl = 'api/chat';

@Injectable({
  providedIn: 'root'
})
export class NgrxChatServiceStub {
  private observable: Observable<AllUserData>;

  public constructor(private http: HttpClient, private errHandling: ErrorHandlingService) { }

  public loadInitialUserData(): Observable<AllUserData> {
    return of(SAMPLE_ALL_DATA);
  }

  public saveUserData(chatdata: AllUserData) {
  const headers = { 'Content-Type': 'application/json' }
    this.http.post<any>(postdataUrl, chatdata, { headers }).subscribe({
      next: data => {
      },
      error: error => console.error('There was an error!', error)
    })
  }
}
