import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';

interface UserSession {
  /** Authenticated user id stored in the cookie session */
  userId?: number;
}
import { SerializeUser } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from './guards/auth.guard';

@SerializeUser(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async createUser(
    /**
     * The CreateUserDto helps validate the sended data and return errors in case such
     * data is not vaild before hitting the service and database layers.
     */
    @Body() body: CreateUserDto,
    // Another of the special tags is @Session, that will help us handle data from client side
    @Session() session: UserSession,
  ) {
    const createdUser = await this.authService.signup(
      body.email,
      body.password,
    );
    // After the user is created, its respective id will be stored as a specific userId
    session.userId = createdUser.id;

    // When the API returns the user body, it also returns a session object that encrypts its data
    return createdUser;
  }

  @Post('signin')
  async signin(@Body() body: CreateUserDto, @Session() session: UserSession) {
    const signedUser = await this.authService.signin(body.email, body.password);
    /**
     * If you signin the same user you created before, it will not return any cookie because
     * the cookie content is the same as the one you created before and it avoids returning
     * the same cookie
     */
    session.userId = signedUser.id;

    return signedUser;
  }

  @Get('whoami')
  /**
   * A guard is a piece of code that blocks or passes any request if the request fullfils
   * certain logic asked by the guard
   * In case you cannot fulfill the guard's logic, it will return a 403 response (forbidden
   * resource)
   */
  @UseGuards(AuthGuard)
  /**
   * The logic for this particular decorator is a bit complex, therefore I will disarm it
   * in this comment.
   * - First, you have the CurrentUser decorator, which grabs the request's context and
   * call a specific property called [currentUser]
   * - But a decorator cannot use dependency injection (because this custom decorator is
   * a function, not a class), therefore a possible solution is to inject the request
   * data through a interceptor
   * - An interceptor is a class that can be injectable in the dependency injection
   * logic and uses the same context as CurrentUser decorator.
   * - So, the interceptor catches the request first, obtains request's cookie session,
   * calls the userService to find any User related to the userId inside that cookie
   * and asign that value to a new custom request property called currentUser
   * - Once the interceptor handles back the request, it falls into the decorator, which
   * catches the custom value mentioned above and returns it to the api callback as a
   * response that is after returned to the user/client.
   */
  whoAmI(@CurrentUser() user: UserDto) {
    return user;
  }

  @Post('signout')
  signout(@Session() session: UserSession) {
    session.userId = undefined;
  }

  @Get(':id')
  // Param works as 'localhost:3000/1234567' in the URL
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('findall')
  // Query works as 'localhost:3000?email=email@domain.com' in the URL
  findAllUsers(@Query('email') email: string) {
    return this.usersService.findAll(email);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: Partial<CreateUserDto>) {
    return this.usersService.update(+id, body);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
