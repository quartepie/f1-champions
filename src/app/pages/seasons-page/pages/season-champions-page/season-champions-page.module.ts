import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonChampionsPageComponent } from './season-champions-page.component';
import { ChampionListComponent } from './components/champion-list/champion-list.component';
import { RouterModule } from '@angular/router';
import { DriverModule } from '../../../../components/driver/driver.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    SeasonChampionsPageComponent,
    ChampionListComponent,
  ],
  imports: [
    CommonModule,
    DriverModule,
    FontAwesomeModule,
    RouterModule.forChild([{
      path: '',
      component: SeasonChampionsPageComponent
    }])
  ]
})
export class SeasonChampionsPageModule { }
