import { map, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

/**
 * An interceptor is a specific class that catches the incoming request from any origin,
 * recieves its data, handles it as we want, and sends it to the next step in the request
 * handling process, which is usually a controller.
 */
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    /**
     * On this step, the interceptor recieves the entire context to be handled before
     * it is sent to the controller. This line is only to explain the menitoned point
     */
    // console.warn(context)

    // On this step, the handler manages the data after it has been processed by the controller, but before it is sent to the client.
    return handler.handle().pipe(
      map((dataToBeSerialized: any) => {
        return plainToClass(this.dto, dataToBeSerialized, {
          // This option will exclude any properties that are not defined in the UserDto
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
