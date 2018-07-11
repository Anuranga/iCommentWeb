import { NgModule } from '@angular/core';
import {DashboardComponent} from '../../../components/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';

/* material Form Components */
import {
  MatCardModule
} from '@angular/material';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
