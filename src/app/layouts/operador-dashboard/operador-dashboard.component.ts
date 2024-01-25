import { Component, NgModule } from '@angular/core';
import { TimelineChartComponent } from '../../components/timeline-chart/timeline-chart.component';
import { AnalyticsCardComponent } from '../../components/analytics-card/analytics-card.component';
import { Cell1Component1o } from '../../components/celdas-card-operador/cell1/analytics-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {SidebarOpComponent} from '../../components/sidebar-operador/sidebar.component';

@Component({
  selector: 'app-operador-dashboard',
  standalone: true,
  imports: [ SidebarOpComponent , Cell1Component1o,HttpClientModule, CommonModule, RouterOutlet, SidebarComponent, AnalyticsCardComponent, TimelineChartComponent],
  templateUrl: './operador-dashboard.component.html',
  styleUrl: './operador-dashboard.component.css'
})
export class OperadorDashboardComponent {

}
