import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Gender} from '../../classes/gender/gender';
import {LocalStorageService} from '../local-storage-service/local-storage.service';
import {AppSettings} from '../../classes/app-settings/app-settings';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  @Output()
  id: EventEmitter<string> = new EventEmitter<string>()

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  getGenders(): Observable<Gender[]> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.localStorageService.get(AppSettings.TOKEN_KEY))
      .set('Content-Type', 'application/json');

    return this.http.get<Gender[]>(AppSettings.GENDERS_URL, {headers}).pipe(
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
