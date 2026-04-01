import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  /**
   * The never type is used when we are not going to provide any type of data on that function
   * If you try to put any value as an argument, the function will mark an error due
   * that type of data
   * Also, we put that not usable argument as _ to avoid linting errors
   */
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
