import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeaturesRoutingModule } from './features-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataTableModule } from 'angular-6-datatable';
import { CreateFormComponent } from './create-form/create-form.component';

@NgModule({
  declarations: [DashboardComponent, CreateFormComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardComponent,
    CreateFormComponent
  ]
})
export class FeaturesModule { }
