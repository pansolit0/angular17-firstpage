import { Component, OnInit,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { AnalyticsCardComponent } from "./components/analytics-card/analytics-card.component";
import { TimelineChartComponent } from "./components/timeline-chart/timeline-chart.component";
import { HttpClientModule } from '@angular/common/http';
import { GerenciaDashboardComponent } from "./layouts/gerencia-dashboard/gerencia-dashboard.component";
import { AuthenticationService } from './core/authentication.service';
import { RoleStateServiceService } from './core/role-state-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonRolComponent } from './components/button-rol/button-rol.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    AnalyticsCardComponent,
    TimelineChartComponent,
    GerenciaDashboardComponent,
    ReactiveFormsModule,
    ButtonRolComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoggedIn!: boolean;
  currentRole: string | null = null;

  constructor(
    private authService: AuthenticationService,
    private roleState: RoleStateServiceService
  ) {
    this.authService.authStatus.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  ngOnInit() {
    this.roleState.currentRole.subscribe(role => {
      this.currentRole = role;
    });
  }
}
