import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarWashStationSelectionPage } from './car-wash-station-selection';

@NgModule({
  declarations: [
    CarWashStationSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(CarWashStationSelectionPage),
  ],
})
export class CarWashStationSelectionPageModule {}
