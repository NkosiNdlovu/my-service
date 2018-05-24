import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateSchedulePage } from './create-schedule';

@NgModule({
  declarations: [
    CreateSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateSchedulePage),
  ],
})
export class CreateSchedulePageModule {}
