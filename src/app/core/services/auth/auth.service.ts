import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../class/user';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;
  errorMessage: string = '';

  constructor(private apiService: ApiService) {
    const isLoggedIn = !!localStorage.getItem('angular17token'); // Check if the token exists
    this.isLoggedInSubject = new BehaviorSubject<boolean>(isLoggedIn);
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  logging(user: User): Observable<boolean> {
    return new Observable(observer => {
      this.apiService.login(user).subscribe({
        next: (response) => {
          localStorage.setItem('angular17token', response.access_token);
          this.isLoggedInSubject.next(true);
          observer.next(true);
          observer.complete();
        },
        error: (error) => {
          console.error('Login error', error);
          this.isLoggedInSubject.next(false);
          observer.error(false);
        }
      });
    });
  }

  isAuthenticatedUser(): boolean {
    return this.isLoggedInSubject.value;
  }

  lougout() {
    localStorage.removeItem('angular17token');
    this.isLoggedInSubject.next(false);
  }
}
