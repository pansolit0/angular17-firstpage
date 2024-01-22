import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleStateServiceService } from '../../core/role-state-service.service';
import { CeldaStateService } from '../../core/celda-state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router, private roleState: RoleStateServiceService, private CeldaStateService: CeldaStateService) {


  }

  redirigir(celdaId: string) {
    if (celdaId.startsWith('celda')) {
      const celdaNum = celdaId.split('_')[1];
      this.CeldaStateService.cambiarCelda(`celda_${celdaNum}`);
    }
  }

    redirigirOperador(destino: string): void {
        this.router.navigate(['/operador-dashboard']);
        }
        // Agregar más condiciones según sea necesario

}
