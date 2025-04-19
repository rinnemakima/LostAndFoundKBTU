import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse
} from '@angular/common/http';
import { UserService } from '../services/user.service';
import { catchError, from, switchMap, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const userService = inject(UserService);
  const token = userService.getAccessToken();

  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status === 401 &&
        error.error?.code === 'token_not_valid' &&
        error.error?.messages?.some((msg: any) => msg.message === 'Token is expired')
      ) {
        return from(userService.refreshAccessToken()).pipe(
          switchMap((newToken) => {
            if (newToken) {
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next(retryReq);
            } else {
              userService.clearTokens();
              return throwError(() => error);
            }
          }),
          catchError(refreshError => {
            userService.clearTokens();
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
