import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {MitablaServiceService} from "../../core/mitabla-service.service";
import {HttpClientModule, HttpClient} from "@angular/common/http";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { interval, Subscription} from "rxjs";
import {AnalyticsCardComponent} from "../analytics-card/analytics-card.component";
import moment from 'moment';
import { CeldaStateService } from '../../core/celda-state.service';

interface DatosApi {
  fecha: string;
  promedio: number;
}


@Component({
  selector: 'app-timeline-chart',
  standalone: true,
  imports: [HttpClientModule, AnalyticsCardComponent],
  templateUrl: './timeline-chart.component.html',
  styleUrl: './timeline-chart.component.css',
  providers:[MitablaServiceService]
})

export class TimelineChartComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('myChart') private chartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('saveBtn', { static: false }) private saveButton!: ElementRef;
  chart!: Chart;
  private updateSubscription!: Subscription;
  tabla: string = 'celda_1';
  apiEndpoint = 'https://gdmxapi.onrender.com/exportExcel';


  constructor(private http: HttpClient, private miTablaService: MitablaServiceService, private CeldaStateService : CeldaStateService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.CeldaStateService.celdaActual$.subscribe((celdaActual) => {
      this.tabla = celdaActual;
      this.actualizarDatos(); // Actualizar los datos cuando cambia la celda
    });
        throw new Error('Method not implemented.');
    }

  ngAfterViewInit(): void {
    this.inicializarGrafico();
    this.actualizarDatos();
    this.initializeSaveButton();
  }

  actualizarDatos() {
    this.miTablaService.obtenerDatos(this.tabla).subscribe(datosApi => {
      this.actualizarGrafico(datosApi);
      if (!this.updateSubscription) {
        this.updateSubscription = interval(300000).subscribe(() => {
          this.miTablaService.obtenerDatos(this.tabla).subscribe(datosApi => {
            this.actualizarGrafico(datosApi);
          });
        });
      }
    }, error => {
      console.error('Error al obtener los datos:', error);
    });
  }

  private initializeSaveButton(): void {
    this.saveButton.nativeElement.addEventListener('click', () => {
      const canvas = this.chartRef.nativeElement;
      canvas.toBlob(blob => {
        if (blob) {
          saveAs(blob, 'Promedio_por_dia(14dias)_Celda_1.png');
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
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
        datasets: [
          {
            label: 'JG PROMEDIO DÍA:',
            data: [],
            backgroundColor: 'rgba(67, 100, 143, 0.2)',
            borderColor: 'rgba(67, 100, 143, 1)',
            borderWidth: 1
          },
          {
            label: 'HF PROMEDIO DÍA:',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
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

  actualizarGrafico(datosApi: any[]): void {
    const fechas = datosApi.map(d => moment(d.fecha).format('DD/MM/YYYY'));
    const promediosJG = datosApi.map(d => d.promediojg);
    const promediosHF = datosApi.map(d => d.promediohf);

    // Actualizar el gráfico con las nuevas etiquetas y datos de promedios
    this.chart.data.labels = fechas;
    this.chart.data.datasets[0].data = promediosJG; // Suponiendo que el primer dataset es para JG
    this.chart.data.datasets[1].data = promediosHF; // Agrega un segundo dataset para HF si es necesario
    this.chart.update();
  }

  exportarDatos() {
    const body = { celda: this.tabla };

    this.http.post<any[]>(this.apiEndpoint, body).subscribe(
      (data) => {
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
    const fields = ['jg', 'hf', 'ro', 'sb', 'eg', 'p1', 'p2', 'timestamp'];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, { header: fields, skipHeader: true });

    // Renombrar las columnas en la hoja de cálculo
    XLSX.utils.sheet_add_aoa(worksheet, [fields], { origin: 'A1' });

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

    // Crear un Blob para el archivo Excel
    const arrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Descargar el archivo Excel
    saveAs(blob, 'datos_exportados.xlsx');
  }

  areArraysEqual(arr1: any[] | undefined, arr2: any[] | undefined): boolean {
    // Handle cases where either of the arrays is undefined
    if (arr1 === undefined || arr2 === undefined) {
      return arr1 === arr2; // true if both are undefined, false otherwise
    }

    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

}
