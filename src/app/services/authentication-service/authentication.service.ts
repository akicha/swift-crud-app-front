import {EventEmitter, Injectable, Output} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from '../local-storage-service/local-storage.service';
import {AppSettings} from '../../classes/app-settings/app-settings';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  @Output()
  id: EventEmitter<string> = new EventEmitter<string>()

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  login(user: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post<any>(AppSettings.LOGIN_URL, user, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  isLoggedIn() {
    return this.localStorageService.get(AppSettings.TOKEN_KEY) != null;
  }

  logout() {
    this.localStorageService.remove(AppSettings.TOKEN_KEY);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
