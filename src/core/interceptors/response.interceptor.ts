import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { Response } from '../response/types';
import { ResponseMessageKey } from '../decorators/response.decorator';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  // constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const responseMessage =
      // this.reflector.get(ResponseMessageKey, context.getHandler()) ?? '';
      new Reflector().get(ResponseMessageKey, context.getHandler()) ?? '';

    return next.handle().pipe(
      map((data) => {
        // if (!data) {
        //   return null;
        // }
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: responseMessage,
          data,
        };
      }),
    );
  }
}
