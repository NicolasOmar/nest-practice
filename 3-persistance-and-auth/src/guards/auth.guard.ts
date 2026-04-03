import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

interface RequestWithSession {
  /** Cookie-session object attached by the cookie-session middleware */
  session: { userId?: number };
}

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithSession>();
    return !!request.session.userId;
  }
}
