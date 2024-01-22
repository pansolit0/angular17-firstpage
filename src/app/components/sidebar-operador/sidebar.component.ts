import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleStateServiceService } from '../../core/role-state-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CeldaStateService } from '../../core/celda-state.service';

@Component({
  selector: 'app-sidebar-operador',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarOpComponent {
  mostrarFondo = true;

  constructor(private router: Router, private roleState: RoleStateServiceService, private CeldaStateService: CeldaStateService,) {

  }

  redirigirGerencia(destino: string): void {
    this.router.navigate(['/gerencia-dashboard']);
  }


}
