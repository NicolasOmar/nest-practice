import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

interface RequestWithSession {
  currentUser?: { isAdmin: boolean };
}

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithSession>();
    console.warn(request.currentUser);
    // If the currentUser does not exists, it will be false, otherwise, it will give its admin status
    return request?.currentUser?.isAdmin ?? false;
  }
}
