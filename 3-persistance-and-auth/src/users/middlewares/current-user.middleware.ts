import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

/**
 *  The Request interface can be easily overwritten with this block of code, but I
 * prefer to create a custom one based on the original Express.Request
 */
// declare global {
//   namespace Express {
//     interface Request {
//       currentUser?: User
//     }
//   }
// }

interface CustomRequest extends Request {
  currentUser?: User;
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(request: CustomRequest, _: Response, next: NextFunction) {
    const { userId } = request.session ?? {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      request.currentUser = user ?? undefined;
    }

    return next();
  }
}
