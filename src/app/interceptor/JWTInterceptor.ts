import { HttpEvent, HttpInterceptorFn, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  if (req.url.includes('/login')) {
    return next(req);
  }
  
  let tokenData: string | null = null;

  if (typeof localStorage !== 'undefined') {
    tokenData = localStorage.getItem('jwt_token');
  }

  if (tokenData) {
    console.log("tokenData", tokenData);
    try {
      if (tokenData) {
        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${tokenData}`,
          },
        });
        return next(modifiedReq);
      }
    } catch (e) {
      console.error('Error parsing token data', e);
    }
  }

  return next(req);
};
