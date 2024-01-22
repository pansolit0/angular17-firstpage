// Importaciones necesarias para el nuevo componente
import {Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Subscription, forkJoin, interval } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import {MitablaServiceService} from "../../core/mitabla-service.service";
import {NgStyle} from "@angular/common";
import {TimelineChartComponent} from "../timeline-chart/timeline-chart.component";
import {AnalyticsCardComponent} from "../analytics-card/analytics-card.component";

// ...otros imports necesarios...

// Interfaces para los datos
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
  selector: 'app-combined-component',
  templateUrl: './combined.component.html',
  standalone: true,
  imports: [
    NgStyle,
    HttpClientModule,
    TimelineChartComponent,
    AnalyticsCardComponent
  ],
  styleUrls: ['./combined.component.css'],
  providers:[MitablaServiceService],
})

export class CombinedComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('myChart') private chartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('saveBtn', { static: false }) private saveButton!: ElementRef;
  chart!: Chart;
  tabla: string = 'mitabla';
  private updateSubscription!: Subscription;
  private dataSubscription!: Subscription;
  showRecommendation: boolean = false;
  deviceData: DeviceData = {}; // Use the DeviceData type here
  colors: Colors = {}; // Use the Colors type here
  dataApiEndpoint = 'https://ayudaweb.cl/api/apiExport.php';
  chartApiEndpoint = 'https://ayudaweb.cl/api/apichart.php';

  constructor(private http: HttpClient, private miTablaService: MitablaServiceService) {
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.fetchAllData();
    this.dataSubscription = interval(300000).subscribe(() => {
      this.fetchAllData();
    });

  }
  ngAfterViewInit(): void {
    // Ahora que la vista está lista, podemos inicializar el gráfico
    this.inicializarGrafico();
  }

  ngOnDestroy(): void {
    // Limpieza de suscripciones y recursos
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    if (this.chart) {
      this.chart.destroy();
    }
  }

  fetchAllData(): void {
    const fields = ['jg', 'hf', 'eg', 'ro', 'sb'];
    const requests = fields.map(field => this.http.get<ApiResponse>(`${this.chartApiEndpoint}?celda=celda_1&columna=${field}`));

    forkJoin(requests).subscribe(responses => {
      responses.forEach((data, index) => {
        const field = fields[index];
        if (data && data.hasOwnProperty(field)) {
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
      value = parseFloat(value).toFixed(1);
    } else {
      value = parseInt(value, 10);
    }

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

  inicializarGrafico() {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener el contexto del canvas');
      return;
    }
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'JG PROMEDIO DÍA:',
          data: [],
          backgroundColor: 'rgba(67, 100, 143, 0.2)',
          borderColor: 'rgba(67, 100, 143, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    this.miTablaService.obtenerDatos(this.tabla).subscribe(datosApi => {
      this.actualizarGrafico(datosApi);
    }, error => {
      console.error('Error al obtener los datos:', error);
    });
  }

  actualizarGrafico(datosApi: { algunaPropiedad: any[] }) {
    // Asegurarse de que la propiedad 'algunaPropiedad' es un array antes de proceder
    if (!Array.isArray(datosApi.algunaPropiedad)) {
      console.error('Los datos recibidos no son un array:', datosApi);
      return; // Salir de la función si no es un array
    }


    const fechas = datosApi.algunaPropiedad.map(d => d.fecha);
    const promediosDeDatos = datosApi.algunaPropiedad.map(d => d.promedio);

    // Actualizar el gráfico con las nuevas etiquetas y datos de promedios
    this.chart.data.labels = fechas;
    this.chart.data.datasets[0].data = promediosDeDatos;
    this.chart.update();
  }


  exportarDatos() {
    const apiUrl = `${this.dataApiEndpoint}`;

    this.http.get(apiUrl).subscribe(
      (data: any) => { // Cambiar el tipo de data a any[]
        // Verificar si se recibieron datos
        if (data && data.length > 0) {
          this.exportarExcel(data);
        } else {
          console.error('No se recibieron datos para exportar.');
        }
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }


  exportarExcel(data: any[]) {
    const fields = ['id', 'jg', 'hf', 'ro', 'sb', 'eg', 'p1', 'p2', 'timestamp'];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Renombrar las columnas en la hoja de cálculo
    const header = fields.map((field) => ({ v: field }));
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

    // Crear un Blob para el archivo Excel
    const arrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Convertir el ArrayBuffer a Blob
    const blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Descargar el archivo Excel
    saveAs(blob, 'datos_exportados.xlsx');
  }

}

