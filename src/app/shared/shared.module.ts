import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonServicesModule } from './common-services/common-services.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonServicesModule
  ]
})
export class SharedModule { }
