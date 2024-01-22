import { Component } from '@angular/core';
import { TimelineChartComponent } from '../../components/timeline-chart/timeline-chart.component';
import { ExportButtonComponent } from '../../components/export-button/export-button.component';
import { AnalyticsCardComponent } from '../../components/analytics-card/analytics-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {CombinedComponent} from "../../components/combined/combined.component";

@Component({
  selector: 'app-gerencia-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterOutlet, SidebarComponent, AnalyticsCardComponent, ExportButtonComponent, TimelineChartComponent, CombinedComponent],
  templateUrl: './gerencia-dashboard.component.html',
  styleUrl: './gerencia-dashboard.component.css'
})
export class GerenciaDashboardComponent {

}
