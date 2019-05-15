import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceSelectionPage } from './service-selection';

@NgModule({
  declarations: [
    ServiceSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceSelectionPage),
  ],
})
export class ServiceSelectionPageModule {}
