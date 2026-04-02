import { Observable } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

interface RequestWithSession {
  /** Cookie-session object attached by the cookie-session middleware */
  session?: { userId?: number };
  /** The authenticated user attached by this interceptor */
  currentUser?: User;
}

// ANY class you wnat to use as dependency injection MUST have the Injectable decorator above
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest<RequestWithSession>();
    const { userId } = request.session ?? {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      request.currentUser = user ?? undefined;
    }

    return handler.handle();
  }
}
