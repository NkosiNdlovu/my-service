import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewMyRequestsPage } from './view-my-requests';

@NgModule({
  declarations: [
    ViewMyRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewMyRequestsPage),
  ],
})
export class ViewMyRequestsPageModule {}
