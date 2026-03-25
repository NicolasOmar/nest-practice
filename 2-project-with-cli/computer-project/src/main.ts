import { NestFactory } from '@nestjs/core';
import { ComputerModule } from './computer/computer.module';

/**
 * This project has been added for demonstration purposes to understand
 * how to correctly implement dependency injection in NestJS
 */
async function bootstrap() {
  const app = await NestFactory.create(ComputerModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
