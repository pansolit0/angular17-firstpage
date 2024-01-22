import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class MitablaServiceService {

  private apiUrl = 'http://localhost/Apirestful.php';

  constructor(private http: HttpClient) { }

  obtenerDatos(tabla: string): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
