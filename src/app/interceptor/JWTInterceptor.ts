import { HttpEvent, HttpInterceptorFn, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>, next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

  let tokenData: string | null = null;

  if (req.url.includes('/login')) {
    return next(req);
  }

  if (typeof localStorage !== 'undefined') {
    tokenData = localStorage.getItem('jwt_token');
  }

  if (tokenData) {
    try {
      if (tokenData) {
        console.log("req",req)
        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${tokenData}`,
          },
        });
        return next(modifiedReq);
      }
      else{
        
      }
    } catch (e) {
      localStorage.removeItem('jwt_token');
        console.error('Error parsing token data');
        new Router().navigate(['/']);
      // ToastRef.call.bind.apply.toString.prototype;
    }
  }

  return next(req);
};
