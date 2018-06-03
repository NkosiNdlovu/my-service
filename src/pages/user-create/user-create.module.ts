import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserCreatePage } from './user-edit';

@NgModule({
  declarations: [
    UserCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(UserCreatePage),
  ],
  exports: [
    UserCreatePage
  ]
})
export class UserCreateModule {}
