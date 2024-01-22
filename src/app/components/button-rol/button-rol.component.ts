import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleStateServiceService } from '../../core/role-state-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-rol',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './button-rol.component.html',
  styleUrl: './button-rol.component.css'
})

export class ButtonRolComponent {
  mostrarFondo = true;

  constructor(private router: Router, private roleState: RoleStateServiceService) {}

  redirigir(destino: string) {
    this.mostrarFondo = false;
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
}
