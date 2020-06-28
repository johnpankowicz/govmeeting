import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgrxChatComponent } from './ngrx-chat.';
import { NgrxChatServiceStub } from './ngrx-chat.service.stub';
import { ThreadListComponent } from './ngrx-chat-thread-list';
import { ThreadSectionComponent } from './ngrx-chat-thread-section';
import { NgrxChatStoreService } from './ngrx-chat-store.service';
// import { StoreService<ApplicationState> } from './ngrx-chat-store.service';

@NgModule({
  imports: [
  CommonModule

  ],
  declarations: [
    NgrxChatComponent,
    ThreadListComponent,
    ThreadSectionComponent
  ],
  providers: [
    NgrxChatServiceStub,
    NgrxChatStoreService

  ],
  exports: [
    NgrxChatComponent
  ]
})
export class NgrxChatModule {

 }
