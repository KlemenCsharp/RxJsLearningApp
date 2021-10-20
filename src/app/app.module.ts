import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ObservableComponent } from './observable/observable.component';
import { HotColdComponent } from './hot-cold/hot-cold.component';
import {HttpClientModule} from "@angular/common/http";
import { CreationComponent } from './creation/creation.component';
import { PipeableOperatorsComponent } from './pipeable-operators/pipeable-operators.component';
import { SubjectsComponent } from './subjects/subjects.component';

@NgModule({
  declarations: [
    AppComponent,
    ObservableComponent,
    HotColdComponent,
    CreationComponent,
    PipeableOperatorsComponent,
    SubjectsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
