import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicRoutingModule } from './basic-routing.module';
import { HotColdComponent } from './hot-cold/hot-cold.component';
import { ObservableComponent } from './observable/observable.component';
import { PipeableOperatorsComponent } from './pipeable-operators/pipeable-operators.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { PageBasicComponent } from './page-basic/page-basic.component';
import { CreationComponent } from './creation/creation.component';

@NgModule({
  declarations: [
    HotColdComponent,
    ObservableComponent,
    CreationComponent,
    PipeableOperatorsComponent,
    SubjectsComponent,
    PageBasicComponent,
  ],
  imports: [CommonModule, BasicRoutingModule],
})
export class BasicModule {}
