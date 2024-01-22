import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  authStatus = this.authStatusSubject.asObservable();

  constructor() {}

  private hasToken(): boolean {
    // Aquí debes verificar la existencia de un token de sesión válido, por ejemplo:
    return !!localStorage.getItem('authToken');
  }

  public login(token: string): void {
    localStorage.setItem('authToken', token);
    this.authStatusSubject.next(true);
  }

  public logout(): void {
    localStorage.removeItem('authToken');
    this.authStatusSubject.next(false);
  }

  public isLoggedIn(): boolean {
    return this.authStatusSubject.value;
  }
}
