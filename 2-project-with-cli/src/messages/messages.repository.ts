import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
class MessageRepository {
  async findOne(id: number): Promise<{ content: string }> {
    const fileContent = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(fileContent);

    return messages[id] || null;
  }

  async findAll(): Promise<{ content: string }[]> {
    const fileContent = await readFile('messages.json', 'utf-8');

    return JSON.parse(fileContent);
  }

  async create(content: string): Promise<void> {
    const fileContent = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(fileContent);
    const newId = Object.keys(messages).length;
    messages[newId] = { id: newId, content };

    await writeFile('messages.json', JSON.stringify(messages));
  }
}

export default MessageRepository;
