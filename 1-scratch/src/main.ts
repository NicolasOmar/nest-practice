import { NestFactory } from '@nestjs/core'
import AppModule from './app.module'

/**
 * Nest recommends to structure the application using certain name conventions
 *  - one class per file (e.g. app.controller.ts, app.module.ts)
 *  - class names should include the type of thing they are working on (e.g. AppController, AppModule)
 *  - file names should be in kebab-case (e.g. app.controller.ts, app.module.ts)
 *    - this name should follow the pattern [entity].[type].ts
 *  - class names should be in PascalCase (e.g. AppController, AppModule)
 */

/**
 * The logic to integrate the created files is the following:
 *  - A bootstrap function wrapps all the modules
 *  - Every Module integrates one or several controllers
 *  - Every Controller handles one or several routes (e.g. GET, POST, etc.)
 *  - Every route is associated to a function that will be executed when the route is called
 *    - This function should return something (e.g. a string, an object, etc.)
 */

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // This will make the application listen to the port 3000 (localhost:3000)
  await app.listen(3000)
}

bootstrap()
