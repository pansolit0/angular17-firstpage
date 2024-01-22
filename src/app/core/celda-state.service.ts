import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CeldaStateService {
  private celdaActualSource = new BehaviorSubject<string>('celda_1');
  celdaActual$ = this.celdaActualSource.asObservable();

  cambiarCelda(celda: string) {
    this.celdaActualSource.next(celda);
  }
}
