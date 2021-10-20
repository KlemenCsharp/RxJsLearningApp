import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticalGuideRoutingModule } from './practical-guide-routing.module';
import { PageStorePatternComponent } from './page-store-pattern/page-store-pattern.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    PageStorePatternComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    PracticalGuideRoutingModule
  ]
})
export class PracticalGuideModule { }
