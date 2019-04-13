import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DataTableModule} from 'angular-6-datatable';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    DataTableModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class FeaturesModule { }
