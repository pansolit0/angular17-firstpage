import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleStateServiceService } from '../../core/role-state-service.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router, private roleState: RoleStateServiceService) {}


  redirigir(destino: string) {
    if (destino === 'operador') {
      this.router.navigate(['/operador-dashboard']);
    } else if (destino === 'gerencia') {
      this.router.navigate(['/gerencia-dashboard']);
    } else if (destino.startsWith('celda')) {
      const celdaNum = destino.split('-')[1];
      this.router.navigate([`/layout/celda/cell${celdaNum}`]);
    }
    this.roleState.changeRole(destino);
  }
  redirigirACelda(celdaNum: number) {
    this.router.navigate([`/layout/celda/cell${celdaNum}`]);
  }
}
