import { Component, OnInit } from '@angular/core';
import { Participant, Thread, Message, ThreadSummaryVM, MessageVM } from './ngrx-chat.models';
import { UiState, StoreData, ApplicationState } from './ngrx-chat.models';
import { Observable, of } from 'rxjs';
import { Action, Store} from "@ngrx/store";
import * as _ from 'lodash';
import { firstThreadViewModel } from './ngrx-chat.data';
import { NgrxChatStoreService } from './ngrx-chat-store.service';



export function unreadMessagesCounterSelector(state: ApplicationState): number {
  const currentUserId = state.uiState.userId;
  return _.values<Thread>(state.storeData.threads)
      .reduce(
          (acc, thread) => acc + (thread.participants[currentUserId] || 0 )
          ,0);
}

// (NOTE-JP) I created a stub for stateToThreadSummariesSelector, which was missing.
export function stateToThreadSummariesSelector(state: ApplicationState): ThreadSummaryVM[] {
  return [firstThreadViewModel];
}


@Component({
  selector: 'thread-section',
  template: `
  <div class="thread-count">
      <span>Unread messages: {{unreadMessagesCounter$ | async }}</span>
  </div>
    <div class="thread-section">
        <thread-list
                [threads]="threadSummaries$ | async"
                [currentSelectedThreadId]="currentSelectedThreadId$ |async"
                (threadSelected)="onThreadSelected($event)" >
        </thread-list>
    </div>
`
})
export class ThreadSectionComponent {
  unreadMessagesCounter$:  Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;
  currentSelectedThreadId$:Observable<number>;

    // (NOTE-JP) I could not get this to work: constructor(private store: Store<ApplicationState>) {
    constructor(private storeService: NgrxChatStoreService) {
      // this.unreadMessagesCounter$ = storeService.store.select(unreadMessagesCounterSelector);
      // this.threadSummaries$ = storeService.store.select(stateToThreadSummariesSelector);
      // this.currentSelectedThreadId$ = storeService.store.select(state => state.uiState.currentThreadId);
  }

  onThreadSelected(selectedThreadId:number) {
      // (NOTE-JP) I commented out this next line. The ThreadSelectedAction class is not available.
      // this.store.dispatch(new ThreadSelectedAction(selectedThreadId));
  }


}
