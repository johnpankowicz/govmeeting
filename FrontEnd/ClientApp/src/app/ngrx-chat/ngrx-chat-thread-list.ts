import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Participant, Thread, Message, ThreadSummaryVM, MessageVM } from './ngrx-chat.models';
import { UiState, StoreData, ApplicationState } from './ngrx-chat.models';


@Component({
  selector: 'thread-list',
  template: `
    <ul class="thread-list">
        <li class="thread-list-item" *ngFor="let thread of threads" (click)="selectThread(thread.id)"
            [ngClass]="{selected: thread.id == currentSelectedThreadId}">
            <h5 class="thread-name" [ngClass]="{unread: !thread.read}">{{thread.participantNames}}</h5>
            <div class="thread-time">{{thread.timestamp | date :'shortTime'}}</div>
            <div class="thread-last-message">{{thread.lastMessageText}}</div>
        </li>
    </ul>`
})
export class ThreadListComponent {

  @Input()
  threads: ThreadSummaryVM[];

  @Input()
  currentSelectedThreadId:number;


  @Output()
  threadSelected = new EventEmitter();

  selectThread(threadId:number) {
      this.threadSelected.next(threadId);
  }
}
