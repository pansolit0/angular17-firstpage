import { Component } from '@angular/core';
import { TimelineChartComponent } from '../../components/timeline-chart/timeline-chart.component';

import { AnalyticsCardComponent } from '../../components/analytics-card/analytics-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-gerencia-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterOutlet, SidebarComponent, AnalyticsCardComponent, TimelineChartComponent],
  templateUrl: './gerencia-dashboard.component.html',
  styleUrl: './gerencia-dashboard.component.css'
})
export class GerenciaDashboardComponent {

}
