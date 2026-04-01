import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';

/**
 * To correctly use the created entities (and its future implementation of repositories)
 * we need to import each one of the user entities to an array that
 * will be implemented as a import for a typeorm feature
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  /**
   * On this particular case, we are importing the custom interceptor as provider to be
   * usable through the application hierarchy
   */
  providers: [UsersService, AuthService, CurrentUserInterceptor],
})
export class UsersModule {}
