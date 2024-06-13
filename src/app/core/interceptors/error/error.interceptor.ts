import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      if ([404, 403].includes(error.stats)) {
        console.log('Unauthorized request');
      }
      if (["UNAUTHORIZED"].includes(error.statusText)) {
        localStorage.removeItem('angular17token');
        router.navigateByUrl('/login');
      }
      const e = error.error.message || error.statusText;
      console.log(e);
      return throwError(() => error);
    }
  ))
};
