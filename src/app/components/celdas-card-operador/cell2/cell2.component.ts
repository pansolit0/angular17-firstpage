import { Component, OnInit } from '@angular/core';
import {CommonModule, NgStyle } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { SharedService } from '../../../core/shared.service'; // Asegúrate de incluir la ruta correcta
import { ReactiveFormsModule } from '@angular/forms';
import { DataPieChartService } from '../../../core/data-pie-chart.service';

interface ApiResponse {
  jg: number;
  hf: number;
  ro: number;
}

interface DeviceData {
    [key: string]: any;
}

interface Colors {
    [key: string]: string;
}

@Component({
    selector: 'app-cell2o2',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, NgStyle],
    templateUrl: './cell2.component.html',
    styleUrl: './cell2.component.css',
    providers: [DataPieChartService]
})
export class Cell2Component2o implements OnInit {
    showRecommendation: boolean = false;
    recommendationTexts: string[] = [];
    deviceData: DeviceData = {}; // Use the DeviceData type here
    colors: Colors = {}; // Use the Colors type here


    constructor(
        private http: HttpClient,
        private dataService: DataPieChartService
    ) {
    }

    private lastFetchTime: Date | null = null;
    private cacheDuration = 5 * 60 * 1000;
    private fetchDataInterval: any;

    ngOnInit(): void {
        this.fetchData();
        this.fetchDataInterval = setInterval(() => this.fetchData(), 480000); // 8 minutos
    }

    ngOnDestroy(): void {
        if (this.fetchDataInterval) {
            clearInterval(this.fetchDataInterval);
        }
    }

    fetchData(): void {
        const now = new Date();
        if (this.lastFetchTime && now.getTime() - this.lastFetchTime.getTime() < this.cacheDuration) {
            console.log('Using cached data');
            return;
        }
        this.lastFetchTime = now;

        // Cambio: utilizar el servicio para obtener los datos
        const columns = ['jg', 'hf', 'ro']; // Define las columnas que necesitas
        this.dataService.obtenerDatosCelda('celda_2', columns).subscribe(
            (data: DeviceData) => {
                // Actualizar deviceData y colors
                this.deviceData = data;
                Object.keys(this.deviceData).forEach(key => {
                    const value = this.deviceData[key];
                    if (value !== undefined) {
                        this.colors[key] = this.determineColor(key, parseFloat(value).toFixed(1));
                    }
                });
            },
            (error: any) => {
                console.error(`Error fetching data:`, error);
            }
        );
    }


    updateData(celda: string, columna: string, value: any): void {
        if (columna === 'jg') {
            value = parseFloat(value).toFixed(1);
        } else {
            value = parseInt(value, 10);
        }

        // Actualizar los datos y colores
        this.deviceData[columna] = value;
        this.colors[columna] = this.determineColor(columna, value);
    }

    determineColor(columna: string, value: any): string {
        switch (columna) {
            case 'jg':
                return this.determineColorForJG(value);
            case 'hf':
                return this.determineColorForHF(value);
            case 'ro':
                return this.determineColorForRO(value);
            default:
                return 'gray'; // Color por defecto para columnas no especificadas
        }
    }

    determineColorForJG(value: number): string {
        const setPoint = 1.3;
        return this.calculateColor(value, setPoint, 'jg');
    }

    determineColorForHF(value: number): string {
        const setPoint = 5;
        return this.calculateColor(value, setPoint, 'hf');
    }

    determineColorForRO(value: number): string {
        const setPoint = 1.25;
        return this.calculateColor(value, setPoint, 'ro');
    }


    calculateColor(value: number, setPoint: number, columna: string): string {
        let difference = Math.abs(value - setPoint);
        let percentageVariation = (difference / setPoint) * 100;
        let recommendation = '';

        switch (columna) {
            case 'jg':
                recommendation = value > setPoint ?
                    `Bajar el aire un ${0.50 * difference}% para llegar JG ideal.` :
                    `Subir el aire un ${0.50 * difference}% para llegar JG ideal.`;
                break;
            case 'hf':
                recommendation = value > setPoint ?
                    `Cerrar valvulas un ${0.50 * difference}%, observar y evaluar.` :
                    `Abrir valvulas un ${0.50 * difference}% observar y evaluar.`;
                break;
            case 'ro':
                recommendation = value > setPoint ?
                    `Añadir agua para disminuir densidad de la pulpa.` :
                    `Reducir agua para incrementar densidad de la pulpa.`;
                break;
            default:
                recommendation = '';
                break;
        }

        if (recommendation) {
            this.recommendationTexts.push(recommendation);
        }
        this.showRecommendation = this.recommendationTexts.length > 0;

        if (percentageVariation <= 10) {
            return 'green'; // Menos del 10% de variación es 'green'
        } else if (percentageVariation > 10 && percentageVariation < 20) {
            return 'yellow'; // Entre 10% y 20% de variación es 'yellow'
        } else {
            return 'red'; // Más del 20% de variación es 'red'
        }
    }


    onCheckboxChange() {
        this.showRecommendation = false;
        this.recommendationTexts = [];
    }

    private updateRecommendations(key: string, value: any) {

    }
}
