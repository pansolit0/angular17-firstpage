import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperadorDashboardComponent } from './layouts/operador-dashboard/operador-dashboard.component';
import { GerenciaDashboardComponent } from './layouts/gerencia-dashboard/gerencia-dashboard.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

export const routes: Routes = [
  { path: 'gerencia-dashboard', component: GerenciaDashboardComponent },
  { path: 'operador-dashboard', component: OperadorDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
