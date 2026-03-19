import { Controller, Module, Get } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

// Will handle all requests oriented to this controller
@Controller()
class AppController {
  // It will handle a GET API call
  @Get()
  getRootRoute() {
    return 'Hi there!'
  }
}

// A wrapper for a list of controllers (classes)
@Module({ controllers: [AppController] })
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  await app.listen(3000)
}

bootstrap()
