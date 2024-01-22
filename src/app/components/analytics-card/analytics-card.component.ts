import {Component, OnInit} from '@angular/core';
import {NgStyle} from "@angular/common";
import {color} from "chart.js/helpers";
import {HttpClient} from "@angular/common/http";
import { Colors } from 'chart.js';
import {forkJoin, interval, Subscription} from "rxjs";
import { DataPieChartService } from '../../core/data-pie-chart.service';
import { CeldaStateService } from '../../core/celda-state.service';
interface DeviceData {
  [key: string]: number; // Cambia `any` por `number` si solo recibes números
}

interface Colors {
  [key: string]: string; // Los colores siempre son cadenas
}
@Component({
  selector: 'app-analytics-card',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './analytics-card.component.html',
  styleUrl: './analytics-card.component.css',
  providers: [DataPieChartService]
})



export class AnalyticsCardComponent implements OnInit {
  tituloCelda: string = 'ESTADOS CELDA 1';
  showRecommendation: boolean = false;
  deviceData: DeviceData = {}; // Use the DeviceData type here
  colors: Colors = {}; // Use the Colors type here
  private dataSubscription!: Subscription;
  celda: string = 'celda_1';
    constructor(
        private http: HttpClient,
        private serviciodata: DataPieChartService,
        private celdaStateService: CeldaStateService
    ) {}

  ngOnInit(): void {
    this.celdaStateService.celdaActual$.subscribe((celdaActual) => {
      this.celda = celdaActual;
      const numeroCelda = celdaActual.split('_')[1];
      this.tituloCelda = `Estados de la Celda #${numeroCelda.toUpperCase()}`; // Actualizar el título
      this.fetchAllData();
    });

        // Configurar para actualizar cada 5 minutos (300000 milisegundos)
        this.dataSubscription = interval(300000).subscribe(() => {
            this.fetchAllData();
        });
    }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

    fetchAllData(): void {
        console.log("el fetch fue exitoso");
        const columnas = ['jg', 'hf', 'eg', 'ro', 'sb'];
        this.serviciodata.obtenerDatosCelda(this.celda, columnas).subscribe((valor) => {
            this.deviceData = valor;
            columnas.forEach((columna: string) => {
                if (valor && valor.hasOwnProperty(columna)) {
                    this.updateData(this.celda, columna, valor[columna]);
                }
            });
        });
    }



  updateData(celda: string, columna: string, value: any): void {
    // Convertir el valor a un número con formato adecuado
    value = (columna === 'jg' || columna === 'eg' || columna === 'sb') ?
      parseFloat(value).toFixed(1) :
      parseInt(value, 10);

    this.deviceData[columna] = value;
    this.colors[columna] = this.determineColor(columna, value);
  }


  determineColor(columna: string, value: number): string {
    // Campos que siempre deben ser verdes
    const alwaysGreenFields = ['jg', 'hf', 'eg', 'ro', 'sb'];
    if (alwaysGreenFields.includes(columna)) {
      return 'green';
    }

    let setPoint: number | undefined;
    switch(columna) {
      case 'jg':
        setPoint = 1.3;
        break;
      case 'hf':
        setPoint = 5;
        break;
      case 'ro':
        setPoint = 1.25;
        break;
      case 'eg':
        setPoint = 1; // Aquí debes establecer el valor de 'eg'
        break;
      case 'sb':
        setPoint = 1; // Aquí debes establecer el valor de 'sb'
        break;
      default:
        return 'gray'; // Color por defecto para columnas no especificadas
    }

    if (setPoint === undefined) {
      return 'gray'; // O manejar de otra manera si es necesario
    }

    return this.calculateColor(value, setPoint);
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

}
