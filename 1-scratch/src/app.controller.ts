import { Controller, Get } from '@nestjs/common'

// Will handle all requests oriented to this controller
// One of the configurations you can include inside the decorator call is the path
//  It will be `/` by default, but you can change it to something else (e.g. `api`, `users`, etc.)
//  The same can be done for the routes (e.g. GET, POST, etc.)
@Controller()
export default class AppController {
  // It will handle a GET API call
  @Get()
  getRootRoute() {
    return 'Hi there!'
  }
}
