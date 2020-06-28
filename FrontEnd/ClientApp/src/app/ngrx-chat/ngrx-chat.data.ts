import { Participant, Thread, Message, ThreadSummaryVM, MessageVM } from './ngrx-chat.models';
import { UiState, StoreData, ApplicationState, AllUserData } from './ngrx-chat.models';


const firstThread: Thread = {
  id: 1,
  messageIds: [1, 2, 3, 4, 5],
  participants: {
      1: 0,
      2: 0
  }
};

const firstThreadParticipants = [{
  id: 1,
  name: 'Alice'
},
{
  id: 2,
  name: 'Bob'
}];

const firstThreadMessages = [{
  id: 1,
  threadId: 1,
  participantId: 1,
  text: 'Did you take take out the trash today ?',
  timestamp: new Date().getTime()
},
{
  id: 2,
  threadId: 1,
  participantId: 2,
  text: 'Is it full again ?',
  timestamp: new Date().getTime()
},
{
  id: 3,
  threadId: 1,
  participantId: 1,
  text: 'Yes, can you take it out now ? ',
  timestamp: new Date().getTime()
},
{
  id: 4,
  threadId: 1,
  participantId: 2,
  text: 'OK, no problem',
  timestamp: new Date().getTime()
},
{
  id: 5,
  threadId: 1,
  participantId: 1,
  text: 'Great',
  timestamp: new Date().getTime()
}
];

export const firstThreadViewModel: ThreadSummaryVM = {
  id:1,
  participantNames: 'Alice, Bob',
  lastMessageText:'Great',
  timestamp: new Date().getTime(),
  read:true
};


const participants: {[key: number]: Participant} = {
  1: {
      id: 1,
      name: 'Alice'
  },
  2: {
      id: 2,
      name: 'Bob'
  },
  3: {
      id: 3,
      name: 'Chuck'
  },
  4: {
      id: 4,
      name: 'David'
  },
  5: {
      id: 5,
      name: 'Erin'
  }
};

export const dbMessagesQueuePerUser: {[key: number]: number[]} = {
  1: []
};

//////////////// Sample AllUserData ///////////////


export const SAMPLE_ALL_DATA: AllUserData = {
  participants: firstThreadParticipants,
  threads: [firstThread],
  messages: firstThreadMessages
}


//////////////// Initial Application State ///////////////

export const INITIAL_UI_STATE: UiState = {
  userId: undefined,
  currentThreadId: undefined
};

export const INITIAL_STORE_DATA: StoreData = {
  threads: {},
  messages: {},
  participants: {}
};

export const INITIAL_APPLICATION_STATE: ApplicationState = {
uiState: INITIAL_UI_STATE,
storeData:INITIAL_STORE_DATA
};

//////////////// Later Program State ////////////////


