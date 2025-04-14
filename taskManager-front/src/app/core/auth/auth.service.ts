import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { UserResponse } from '../../features/auth/models/userResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  private readonly API_URL = 'http://localhost:8080/auth';

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    return this.httpClient.post<{token : string, userId: number}>(this.API_URL + '/login', { username, password })      
    .pipe(
      map((response) => {
        if (response) {
          this.isAuthenticated = true;
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Erro no login:', error);
        return of(false);
      })
    );
  }

  register(username: string, password: string): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(this.API_URL + '/register', { username, password });
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}