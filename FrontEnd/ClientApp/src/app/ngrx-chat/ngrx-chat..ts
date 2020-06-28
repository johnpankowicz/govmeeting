import { Component, OnInit } from '@angular/core';
import { NgrxChatServiceStub } from './ngrx-chat.service.stub';
import { AllUserData } from './ngrx-chat.models';
import { Store } from "@ngrx/store";
import { UserThreadsLoadedAction  } from './ngrx-chat-store.service';



@Component({
  selector: 'gm-ngrx-chat',
  templateUrl: './ngrx-chat.html',
  styleUrls: ['./ngrx-chat.scss']
})
export class NgrxChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
}
