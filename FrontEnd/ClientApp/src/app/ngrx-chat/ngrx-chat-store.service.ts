import {Action, Store} from "@ngrx/store";
import { UiState, StoreData, ApplicationState, AllUserData } from './ngrx-chat.models';
import * as _ from 'lodash';
import { Injectable, OnInit } from '@angular/core';
import { NgrxChatServiceStub } from './ngrx-chat.service.stub';

function createNewState(currentState: ApplicationState, action: Action) :ApplicationState {
  return {
      uiState: createNewUIState(currentState.uiState, action),
      storeData: createNewStoreData(currentState.storeData, action)
  }
}

// (NOTE-JP) I created this stub for the missing method, "createNewUIState".
export function createNewUIState(state: UiState, action:Action) : UiState {
  return state;
}

// (NOTE-JP) I rename this methog from "storeData", which I believe was a typo.
export function createNewStoreData(state: StoreData, action:Action) : StoreData {
  switch (action.type)  {

      case USER_THREADS_LOADED_ACTION:

        // (NOTE-JP) I removed this code because of error "payload not a propery of action".
        // return {
          //      participants: _.keyBy(action.payload.participants, 'id'),
          //      messages: _.keyBy(action.payload.messages, 'id'),
          //      threads: _.keyBy(action.payload.threads, 'id')
          // };
          return state;

      default:
          return state;
  }
}

export const USER_THREADS_LOADED_ACTION = 'USER_THREADS_LOADED_ACTION';

export class UserThreadsLoadedAction implements Action {

    readonly type = USER_THREADS_LOADED_ACTION;

    constructor(public payload?: AllUserData) {

    }

}

@Injectable({
  providedIn: 'root'
})
export class NgrxChatStoreService {

  store: Store<ApplicationState> = new Store<ApplicationState>(null, null, null);

  constructor(private ngrxService: NgrxChatServiceStub) { }

  ngOnInit() {
    this.ngrxService.loadInitialUserData()
    . subscribe(initialUserData => this.store.dispatch(
         new UserThreadsLoadedAction(initialUserData)) );
  }

}


