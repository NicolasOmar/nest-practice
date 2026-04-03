// import { APP_INTERCEPTOR } from '@nestjs/core';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
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
  providers: [
    UsersService,
    AuthService,
    /**
     *  In this case, the interceptor has been moved to be used at global scale, first
     * requesting to provide as an app interceptor and then using the Interceptor class
     * (have in mind that a injectable interceptor or piece of data must be a class)
     *
     *  After some exercises, we understood that the CurrentUserInterceptor was not
     * working in the logic path we needed because the session user is needed before
     * the execution of other objects such as Guards, and an Interceptor is been
     * executed too late
     *  Therefore, we moved the CurrentUser logic to an Middleware that we link to the
     * UserModule for all routes, that will give this logic an execution before the call
     * of Guards
     *  The code of Interceptor will not be deleted for education purposes (in case you
     * want to check its logic in the project)
     */
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor,
    // },
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
