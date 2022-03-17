import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'seasons', pathMatch: 'full' },
  { path: 'seasons',
    loadChildren: () => import('./pages/seasons-page/seasons-page.module')
      .then(m => m.SeasonsPageModule)
  },
  {
    path: '**',
    redirectTo: 'seasons',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
