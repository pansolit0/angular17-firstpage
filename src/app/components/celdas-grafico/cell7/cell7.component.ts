import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {MitablaServiceService} from "../../../core/mitabla-service.service";
import {HttpClientModule, HttpClient} from "@angular/common/http";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import {interval, Subscription} from "rxjs";
@Component({
  selector: 'app-cell7g',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './cell7.component.html',
  styleUrl: './cell7.component.css',
  providers:[MitablaServiceService]
})
export class Cell7ComponentO implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('myChart') private chartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('saveBtn', { static: false }) private saveButton!: ElementRef;
  chart!: Chart;
  apiEndpoint = 'https://ayudaweb.cl/api/apiExport.php';
  tabla: string = 'mitabla';
  private updateSubscription!: Subscription;

  constructor(private miTablaService: MitablaServiceService, private http: HttpClient) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    // Movido a ngAfterViewInit
  }

  ngAfterViewInit(): void {
    this.inicializarGrafico();
    this.actualizarDatos();
    this.initializeSaveButton();
  }

  private actualizarDatos() {
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

  agruparDatosPorDia(datos: any[]): Record<string, number[]> {
    const agrupados: Record<string, number[]> = {};
    datos.forEach(dato => {
      const fecha = new Date(dato.timestamp).toLocaleDateString();
      if (!agrupados[fecha]) {
        agrupados[fecha] = [];
      }
      agrupados[fecha].push(dato.datoIngreso);
    });
    return agrupados;
  }
  exportarDatos() {
    const apiUrl = `${this.apiEndpoint}`;

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
