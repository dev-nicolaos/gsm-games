import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  post(url: string, data: object) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application.json'
      })
    };

    JSON.stringify(data);
    return this.http.post(url, data, httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}`);
      console.error(`Error Message: ${error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
