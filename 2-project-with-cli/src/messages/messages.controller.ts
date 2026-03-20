/**
 * To generate this file, first you have to create a module,
 * Then, you can generate the controller (that will be related to the created module)
 * with `nest g controller messages/messages --flat`
 *  Why like that?
 * - `messages/messages` because the controller is inside the messages folder (that is the module)
 * - `--flat` because we don't want to create a new folder for the controller, we want it to be inside the messages folder
 */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

// This is a class decorator because is declared above the class and affects the whole class
@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    return 'This action returns all messages';
  }

  // This is a method decorator because is declared above the method and affects the whole method
  @Post()
  createMessage(
    // This kind of decorator is used to handle different parts of the request, in this case, the body of the request
    @Body() body: { content: string },
  ) {
    return { content: body.content };
  }

  @Get(':id')
  getMessage(@Param('id') id: string) {
    return id;
  }
}
