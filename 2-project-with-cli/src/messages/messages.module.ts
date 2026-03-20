// You can create this file (the first one on the list) with command `nest g module messages`
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';

@Module({
  controllers: [MessagesController],
})
export class MessagesModule {}
