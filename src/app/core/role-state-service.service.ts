import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleStateServiceService {
  private roleSource = new BehaviorSubject<string | null>(null);
  currentRole = this.roleSource.asObservable();

  constructor() {}

  changeRole(role: string) {
    this.roleSource.next(role);
  }
}
