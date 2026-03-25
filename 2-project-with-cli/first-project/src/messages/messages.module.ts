// You can create this file (the first one on the list) with command `nest g module messages`
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import MessagesService from './messages.service';
import MessageRepository from './messages.repository';

@Module({
  controllers: [MessagesController],
  // providers are classes that can be used as dependencies for other classes
  providers: [MessagesService, MessageRepository],
})
export class MessagesModule {}
