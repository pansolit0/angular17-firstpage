import {Component, OnInit} from '@angular/core';
import {NgStyle} from "@angular/common";
import {color} from "chart.js/helpers";
import {HttpClient} from "@angular/common/http";
import { Colors } from 'chart.js';
interface DeviceData {
  [key: string]: any; // Change `any` to a more specific type if possible.
}

interface Colors {
  [key: string]: string; // Since colors are always strings.
}
@Component({
  selector: 'app-cell7o7',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './cell7.component.html',
  styleUrl: './cell7.component.css'
})
export class Cell7Componentc7 {

  deviceData: DeviceData = {}; // Use the DeviceData type here
  colors: Colors = {}; // Use the Colors type here
  apiEndpoint = 'http://localhost/apichart.php';

  constructor(private http: HttpClient) {}



  ngOnInit(): void {
    this.fetchData();
    setInterval(() => this.fetchData(), 480000); // Updates every 8 minutes
  }



  fetchData(): void {
    const fields = ['jg', 'hf', 'eg', 'ro', 'sb']; // Fields to fetch
    fields.forEach(field => {
      this.http.get(`${this.apiEndpoint}?celda=celda_7&columna=${field}`).subscribe(data => {
        if (data && data.hasOwnProperty(field)) {
          // @ts-ignore
          this.updateData('celda_7', field, data[field]);
        }
      });
    });
  }

  updateData(celda: string, columna: string, value: any): void {
    this.deviceData[columna] = value; // No error here since we defined the index signature
    this.colors[columna] = this.determineColor(value);
  }

  determineColor(value: any): string {
    // This is a placeholder for your color determination logic.
    // You need to implement this according to your requirements.
    // For example, you could set different thresholds for each field and return a color accordingly.
    if (value > 1) {
      return 'red';
    } else if (value > 0) {
      return 'green';
    } else {
      return 'gray';
    }
  }
}
