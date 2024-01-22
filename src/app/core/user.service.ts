import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserLoginResponse {
  loginExitoso?: any;
  error?: string;
}
@Injectable({
  providedIn: 'root'
})

export class LoginServiceService {

  URL = "http://localhost/Angular/";

  constructor(private http: HttpClient) { }

  loginUsuario(login: { usuario: null; contrasena: null; }) {
    return this.http.post(`${this.URL}Login.php`, JSON.stringify(login));
  }

}
