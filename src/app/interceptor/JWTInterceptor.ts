import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('/login')) {
      return next.handle(req);
    }
    let tokenData: string | null = null;

    if (typeof localStorage !== 'undefined') {
      tokenData = localStorage.getItem('jwt_token');
    }

    if (tokenData) {
      const tokenData = localStorage.getItem('jwt_token');
      console.log("tokenData",tokenData);
      if (tokenData) {
        try {
          const { token, _ } = JSON.parse(tokenData);
          if (token) {
            const modifiedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            });
            return next.handle(modifiedReq);
          }
        } catch (e) {
          console.error('Error parsing token data', e);
        }
      }
    }

    return next.handle(req);
  }
}
