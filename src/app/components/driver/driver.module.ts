import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverComponent } from './driver.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [DriverComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [DriverComponent]
})
export class DriverModule { }
