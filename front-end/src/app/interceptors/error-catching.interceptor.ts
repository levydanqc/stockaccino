import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { YahooService } from '../services/yahoo.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(
    private yahooService: YahooService,
    private toast: ToastrService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 429) {
          this.yahooService.reloadApiKey();
          this.toast
            .error('Merci de rafraichir la page.', "Erreur d'API")
            .onTap.pipe(take(1))
            .subscribe(() => window.location.reload());
        }
        return throwError(
          () => 'Something bad happened; please try again later.'
        );
      })
    );
  }
}
