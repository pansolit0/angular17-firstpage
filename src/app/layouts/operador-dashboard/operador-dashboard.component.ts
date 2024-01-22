import { Component, NgModule } from '@angular/core';
import { TimelineChartComponent } from '../../components/timeline-chart/timeline-chart.component';
import { AnalyticsCardComponent } from '../../components/analytics-card/analytics-card.component';
import { Cell1Component1o } from '../../components/celdas-card-operador/cell1/analytics-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {Cell2Component2o} from '../../components/celdas-card-operador/cell2/cell2.component';
import {Cell3Componentc3} from '../../components/celdas-card-operador/cell3/cell3.component';
import {Cell4Componentc4} from '../../components/celdas-card-operador/cell4/cell4.component';
import {Cell5Componentc5} from '../../components/celdas-card-operador/cell5/cell5.component';
import {Cell6Componentc6} from '../../components/celdas-card-operador/cell6/cell6.component';
import {Cell7Componentc7} from '../../components/celdas-card-operador/cell7/cell7.component';
import {SidebarOpComponent} from '../../components/sidebar-operador/sidebar.component';

@Component({
  selector: 'app-operador-dashboard',
  standalone: true,
  imports: [ SidebarOpComponent , Cell1Component1o,Cell7Componentc7,Cell6Componentc6,Cell5Componentc5,Cell4Componentc4,Cell2Component2o,Cell3Componentc3,HttpClientModule, CommonModule, RouterOutlet, SidebarComponent, AnalyticsCardComponent, TimelineChartComponent],
  templateUrl: './operador-dashboard.component.html',
  styleUrl: './operador-dashboard.component.css'
})
export class OperadorDashboardComponent {

}
