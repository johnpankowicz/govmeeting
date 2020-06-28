////////////////// Models /////////////////////////////

export interface Thread {
  id:number;
  messageIds: number[];
  participants: {[key:number]: number};
}


export interface Message {
  id:number;
  threadId:number;
  participantId: number;
  text:string;
  timestamp:number;
}


export interface Participant {
  id:number;
  name:string;
}


///////////////////  View Models ////////////////////

export interface ThreadSummaryVM {
  id:number;
  participantNames:string;
  lastMessageText:string;
  timestamp:number;
  read:boolean;
}

export interface MessageVM {
  id:number;
  text:string;
  participantName:string;
  timestamp: number;
}


////////////////////// Application State ///////////////

export interface UiState {
  userId:number;
  currentThreadId: number;
  currentError?: string;
}

export interface StoreData {
  participants: {[key:number]: Participant};
  threads: {[key:number]: Thread};
  messages: {[key:number]:Message};
}

export interface ApplicationState {
  uiState: UiState,
  storeData: StoreData
}


///////////////// AllUserData //////////////////

export interface AllUserData {
  participants: Participant[];
  threads: Thread[];
  messages: Message[];
}


