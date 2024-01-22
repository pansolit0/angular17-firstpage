import {Component, OnInit} from '@angular/core';
import {NgStyle} from "@angular/common";
import {color} from "chart.js/helpers";
import {HttpClient} from "@angular/common/http";
import { Colors } from 'chart.js';
import {forkJoin} from "rxjs";
interface DeviceData {
  [key: string]: any; // Change `any` to a more specific type if possible.
}
interface ApiResponse {
  [key: string]: any;
}
interface Colors {
  [key: string]: string; // Since colors are always strings.
}

@Component({
  selector: 'app-cell3c3',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './cell3.component.html',
  styleUrl: './cell3.component.css'
})
export class Cell3Componentc3 implements OnInit {

  showRecommendation: boolean = false;
  deviceData: DeviceData = {}; // Use the DeviceData type here
  colors: Colors = {}; // Use the Colors type here
  apiEndpoint = 'https://ayudaweb.cl/api/apichart.php';
  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.fetchAllData();
    setInterval(() => this.fetchAllData(), 1000); // Actualiza cada 8 minutos
  }

  fetchAllData(): void {
    const fields = ['jg', 'hf', 'eg', 'ro', 'sb'];
    const requests = fields.map(field => this.http.get<ApiResponse>(`${this.apiEndpoint}?celda=celda_1&columna=${field}`));

    forkJoin(requests).subscribe(responses => {
      responses.forEach((data, index) => {
        const field = fields[index];
        if (data && data.hasOwnProperty(field)) {
          // Cambiar la notación de punto por la notación de corchetes
          this.updateData('celda_1', field, data[field]);
        }
      });
      console.log("Todas las peticiones han sido completadas.");
    }, error => {
      console.error(`Error al cargar los datos:`, error);
    });
  }


  updateData(celda: string, columna: string, value: any): void {
    if (columna === 'jg' || columna === 'eg' || columna === 'sb') {
      // Usar notación de corchetes en lugar de punto
      value = parseFloat(value).toFixed(1);
    } else {
      value = parseInt(value, 10);
    }

    // Usar notación de corchetes en lugar de punto
    this.deviceData[columna] = value;
    this.colors[columna] = this.determineColor(columna, value);
  }
  determineColor(columna: string, value: number): string {
    return 'green'; // Always return 'green' regardless of the input
  }

  calculateColor(value: number, setPoint: number): string {
    let percentageVariation = Math.abs((value - setPoint) / setPoint) * 100;

    if (percentageVariation <= 10) {
      return 'green'; // Menos del 10% de variación es 'green'
    } else if (percentageVariation > 10 && percentageVariation <= 20) {
      return 'yellow'; // Entre 10% y 20% de variación es 'yellow'
    } else {
      return 'red'; // Más del 20% de variación es 'red'
    }
  }

  onCheckboxChange() {
    this.showRecommendation = false;
  }
}
