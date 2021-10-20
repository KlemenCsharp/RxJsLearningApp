import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'basic-guide',
    loadChildren: () =>
      import('./features/basic/basic.module').then((m) => m.BasicModule),
  },
  {
    path: 'practical-guide',
    loadChildren: () =>
      import('./features/practical-guide/practical-guide.module').then(
        (m) => m.PracticalGuideModule
      ),
  },
  {
    path: 'angular-rxjs-guide',
    loadChildren: () =>
      import('./features/angular-rx-js-guide/angular-rx-js-guide.module').then(
        (m) => m.AngularRxJsGuideModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
