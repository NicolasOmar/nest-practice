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
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  createUser(
    /**
     * The CreateUserDto helps validate the sended data and return errors in case such
     * data is not vaild before hitting the service and database layers.
     */
    @Body() body: CreateUserDto,
  ) {
    this.usersService.create(body.email, body.password);
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
