import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class MitablaServiceService {

  private apiUrl = 'https://gdmxapi.onrender.com/promedioCatorce';

  constructor(private http: HttpClient) {}

  obtenerDatos(tabla: string): Observable<any> {
    const body = { celda: tabla };
    return this.http.post<any>(this.apiUrl, body);
  }

}
