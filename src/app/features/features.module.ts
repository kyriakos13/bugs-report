import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeaturesRoutingModule } from './features-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DataTableModule} from 'angular-6-datatable';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    DataTableModule,
    FormsModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class FeaturesModule { }
