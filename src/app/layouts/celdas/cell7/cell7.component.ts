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
import {Cell7Componentc7} from '../../../components/celdas-card/cell7/cell7.component';
import { Cell7ComponentO } from '../../../components/celdas-grafico/cell7/cell7.component';
@Component({
  selector: 'app-cell7',
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
    Cell7Componentc7,
    Cell7ComponentO
  ],
  templateUrl: './cell7.component.html',
  styleUrl: '../cell1/cell1.component.css'
})
export class Cell7Component {

}
