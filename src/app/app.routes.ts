import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperadorDashboardComponent } from './layouts/operador-dashboard/operador-dashboard.component';
import { GerenciaDashboardComponent } from './layouts/gerencia-dashboard/gerencia-dashboard.component';
import { Cell1Component } from './layouts/celdas/cell1/cell1.component';
import { Cell2Component } from './layouts/celdas/cell2/cell2.component';
import { Cell3Component } from './layouts/celdas/cell3/cell3.component';
import { Cell4Component } from './layouts/celdas/cell4/cell4.component';
import { Cell5Component } from './layouts/celdas/cell5/cell5.component';
import { Cell6Component } from './layouts/celdas/cell6/cell6.component';
import { Cell7Component } from './layouts/celdas/cell7/cell7.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

export const routes: Routes = [
  { path: 'gerencia-dashboard', component: GerenciaDashboardComponent },
  { path: 'operador-dashboard', component: OperadorDashboardComponent },
  { path: 'layout/celda/cell1', component: Cell1Component },
  { path: 'layout/celda/cell2', component: Cell2Component },
  { path: 'layout/celda/cell3', component: Cell3Component },
  { path: 'layout/celda/cell4', component: Cell4Component },
  { path: 'layout/celda/cell5', component: Cell5Component },
  { path: 'layout/celda/cell6', component: Cell6Component },
  { path: 'layout/celda/cell7', component: Cell7Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
