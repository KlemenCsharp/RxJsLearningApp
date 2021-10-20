import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageStorePatternComponent } from './page-store-pattern/page-store-pattern.component';

const routes: Routes = [
  {
    path: '',
    component: PageStorePatternComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticalGuideRoutingModule {}
