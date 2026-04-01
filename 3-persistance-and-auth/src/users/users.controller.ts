import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SerializeUser } from 'src/interceptors/serialize.interceptor';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  createUser(
    /**
     * The CreateUserDto helps validate the sended data and return errors in case such
     * data is not vaild before hitting the service and database layers.
     */
    @Body() body: CreateUserDto,
  ) {
    return this.authService.signup(body.email, body.password);
  }

  @SerializeUser(UserDto)
  @Post('signin')
  signin(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }

  @SerializeUser(UserDto)
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
