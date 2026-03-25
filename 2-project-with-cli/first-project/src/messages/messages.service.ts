import { Injectable } from '@nestjs/common';
import MessageRepository from './messages.repository';

@Injectable()
class MessagesService {
  // This declaration of the property is good, but is not the cleanes way to do it (which is directly declare it in the constructor)
  // messagesRepo: MessageRepository

  // Actually, this way to utilize a constructor is not the cleanest, but is an aproximation ot have in mind
  /**
    constructor(messagesRepo: MessageRepository) {
      // This pattern you see below IS NOT RECOMMENDED for a real application.
      // It is not recommended by NESTJS best practices.
        // this.messagesRepo = new MessageRepository()
      this.messagesRepo = messagesRepo
    }
  */

  // A public constructor parameter will be asigned as a class property directly
  constructor(public messagesRepo: MessageRepository) {}

  async findOne(id: number) {
    return this.messagesRepo.findOne(id);
  }

  async findAll() {
    return this.messagesRepo.findAll();
  }

  async create(content: string) {
    return this.messagesRepo.create(content);
  }
}

export default MessagesService;
