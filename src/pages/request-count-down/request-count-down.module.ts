import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestCountDownPage } from './request-count-down';

@NgModule({
  declarations: [
    RequestCountDownPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestCountDownPage),
  ],
})
export class RequestCountDownPageModule {}
