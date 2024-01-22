import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  private recomendacionesSource = new BehaviorSubject<string[]>([]);
  recomendaciones = this.recomendacionesSource.asObservable();

  constructor() { }

  updateRecomendaciones(recomendaciones: string[]) {
    this.recomendacionesSource.next(recomendaciones);
  }
}
