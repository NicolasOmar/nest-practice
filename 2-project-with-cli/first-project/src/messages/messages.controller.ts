/**
 * To generate this file, first you have to create a module,
 * Then, you can generate the controller (that will be related to the created module)
 * with `nest g controller messages/messages --flat`
 *  Why like that?
 * - `messages/messages` because the controller is inside the messages folder (that is the module)
 * - `--flat` because we don't want to create a new folder for the controller, we want it to be inside the messages folder
 */
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import MessagesService from './messages.service';

// This is a class decorator because is declared above the class and affects the whole class
@Controller('messages')
export class MessagesController {
  // This declaration of the property is good, but is not the cleanes way to do it (which is directly declare it in the constructor)
  // messagesService: MessagesService

  constructor(public messagesService: MessagesService) {
    // This pattern you see below IS NOT RECOMMENDED for a real application.
    // It is not recommended by NESTJS best practices.
    // this.messagesService = new MessagesService() --- IGNORE ---
  }

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  // This is a method decorator because is declared above the method and affects the whole method
  @Post()
  createMessage(
    // This kind of decorator is used to handle different parts of the request, in this case, the body of the request
    @Body() body: CreateMessageDto,
  ) {
    return this.messagesService.create(body.content);
  }

  @Get(':id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(Number(id));
    console.log(message);
    if (!message) {
      return new NotFoundException(`Message with id ${id} not found`);
    }

    return message;
  }
}
