import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((response) => {
        if (
          response &&
          typeof response === 'object' &&
          'data' in response &&
          'meta' in response
        ) {
          return {
            ...response,
            timestamp: new Date().toISOString(),
            duration: `${Date.now() - now}ms`,
            path: request.url,
            method: request.method,
          };
        }

        return {
          data: response,
          timestamp: new Date().toISOString(),
          duration: `${Date.now() - now}ms`,
          path: request.url,
          method: request.method,
        };
      }),
    );
  }
}
