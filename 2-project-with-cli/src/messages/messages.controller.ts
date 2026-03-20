/**
 * To generate this file, first you have to create a module,
 * Then, you can generate the controller (that will be related to the created module)
 * with `nest g controller messages/messages --flat`
 *  Why like that?
 * - `messages/messages` because the controller is inside the messages folder (that is the module)
 * - `--flat` because we don't want to create a new folder for the controller, we want it to be inside the messages folder
 */
import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    return 'This action returns all messages';
  }

  @Post()
  createMessage() {
    return { content: 'This action adds a new message' };
  }

  @Get(':id')
  getMessage() {
    return 'This action returns a message';
  }
}
