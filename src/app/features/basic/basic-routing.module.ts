import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageBasicComponent} from "./page-basic/page-basic.component";

const routes: Routes = [{
  path: '',
  component: PageBasicComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
