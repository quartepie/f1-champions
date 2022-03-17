import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeasonsPageComponent } from './seasons-page.component';
import { SeasonListComponent } from './components/season-list/season-list.component';
import { DriverModule } from '../../components/driver/driver.module';

@NgModule({
  declarations: [
    SeasonsPageComponent,
    SeasonListComponent,
  ],
  imports: [
    CommonModule,
    DriverModule,
    RouterModule.forChild([
      {
        path: '',
        component: SeasonsPageComponent,
        children: [
          {
            path: ':year',
            loadChildren: () => import('./pages/season-champions-page/season-champions-page.module').then(m => m.SeasonChampionsPageModule)
          }
        ]
      }
    ])
  ]
})
export class SeasonsPageModule { }
