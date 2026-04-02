import { map, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';

// This interface has been created to define a basic Class blueprint and satisfy the Typescript compiler
interface ClassConstructor {
  new (...args: any[]): object;
}

// This is a custom decorator that we implemented to reduce the function calling length
export function SerializeUser(dto: ClassConstructor) {
  /**
   * An interceptor can be called at function leve, controller level or at global scale
   * It dependens the scope of the interceptor, but in this case, it will be called only
   * for this specific route handler
   *  The new SerializeInterceptor(UserDto) has been implemented to extend the interceptor
   * functionality to more than one specific DTO
   */
  return UseInterceptors(new SerializeInterceptor(dto));
}

/**
 * An interceptor is a specific class that catches the incoming request from any origin,
 * recieves its data, handles it as we want, and sends it to the next step in the request
 * handling process, which is usually a controller.
 */
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<ClassConstructor> {
    /**
     * On this step, the interceptor recieves the entire context to be handled before
     * it is sent to the controller. This line is only to explain the menitoned point
     */
    // console.warn(context)

    // On this step, the handler manages the data after it has been processed by the controller, but before it is sent to the client.
    return handler.handle().pipe(
      map((dataToBeSerialized: ClassConstructor) => {
        return plainToClass(this.dto, dataToBeSerialized, {
          // This option will exclude any properties that are not defined in the UserDto
          excludeExtraneousValues: true,
        }) as ClassConstructor;
      }),
    );
  }
}
