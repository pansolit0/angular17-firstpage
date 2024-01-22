import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataPieChartService {


  url:string = "https://gdmxapi.onrender.com/datosChart";
  constructor(private httpClient: HttpClient) {

  }
  ngOnInit(): void {

  }

  obtenerDatosCelda(celda: string, cols:string[]): Observable<any>{
    const body = { celda: celda, columnas : cols }; // Crear el objeto body que será enviado
    console.log(cols);
    console.log(body);
    console.log(this.httpClient.post(this.url, body));
    return this.httpClient.post(this.url, body)

  }
}
