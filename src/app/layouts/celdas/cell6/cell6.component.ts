import { Component } from '@angular/core';
import { TimelineChartComponent } from '../../../components/timeline-chart/timeline-chart.component';
import { ExportButtonComponent } from '../../../components/export-button/export-button.component';
import { AnalyticsCardComponent } from '../../../components/analytics-card/analytics-card.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgStyle } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ButtonRolComponent } from '../../../components/button-rol/button-rol.component';
import { GerenciaDashboardComponent } from '../../gerencia-dashboard/gerencia-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import {Cell6Componentc6} from '../../../components/celdas-card/cell6/cell6.component';
import { Cell6ComponentO } from '../../../components/celdas-grafico/cell6/cell6.component';

@Component({
  selector: 'app-cell6',
  standalone: true,
  imports: [
    ButtonRolComponent,
    HttpClientModule,
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    AnalyticsCardComponent,
    ExportButtonComponent,
    TimelineChartComponent,
    GerenciaDashboardComponent,
    ReactiveFormsModule,
    NgStyle,
    Cell6Componentc6,
    Cell6ComponentO
  ],
  templateUrl: './cell6.component.html',
  styleUrl: '../cell1/cell1.component.css'
})
export class Cell6Component {

}
