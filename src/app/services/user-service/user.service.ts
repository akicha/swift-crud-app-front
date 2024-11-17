import {EventEmitter, Injectable, Output} from '@angular/core';
import {User} from '../../classes/user/user';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from '../local-storage-service/local-storage.service';
import {AppSettings} from '../../classes/app-settings/app-settings';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output()
  id: EventEmitter<string> = new EventEmitter<string>()

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.localStorageService.get(AppSettings.TOKEN_KEY))
      .set('Content-Type', 'application/json');
    return this.http.get<User[]>(AppSettings.USERS_URL, {headers});
  }

  createUser(user: User): Observable<User> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.localStorageService.get(AppSettings.TOKEN_KEY))
      .set('Content-Type', 'application/json');
    return this.http.post<User>(AppSettings.USERS_URL, user, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: number | undefined): Observable<User> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.localStorageService.get(AppSettings.TOKEN_KEY))
      .set('Content-Type', 'application/json');
    return this.http.delete<User>(AppSettings.USERS_URL + "/" + userId, {headers}).pipe(
      catchError(this.handleError)
    );
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
