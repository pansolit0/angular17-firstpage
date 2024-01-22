import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overlay-button',
  standalone: true,
  imports: [],
  templateUrl: './overlay-button.component.html',
  styleUrl: './overlay-button.component.css'
})
export class OverlayButtonComponent {
  constructor(private router: Router) {}

  redirigir(destino: string) {
    if (destino === 'operador') {
      this.router.navigate(['/ruta-operador']);
    } else if (destino === 'gerencia') {
      this.router.navigate(['/ruta-gerencia']);
    }
  }
}
