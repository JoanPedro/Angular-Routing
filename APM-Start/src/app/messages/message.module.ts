import { MessageRoutingModule } from './message-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MessageComponent } from './message.component';

@NgModule({
  imports: [
    SharedModule,
    MessageRoutingModule
  ],
  declarations: [
    MessageComponent
  ]
})
export class MessageModule { }
