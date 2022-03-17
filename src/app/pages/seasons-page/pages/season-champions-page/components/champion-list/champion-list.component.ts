import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RaceChampion } from '../../../../../../core/interfaces/raceChampion';

@Component({
  selector: 'app-champion-list',
  templateUrl: './champion-list.component.html',
  styleUrls: ['./champion-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChampionListComponent {

  @Input() public champions: RaceChampion[] = [];
  @Input() public isLoading: boolean = false;

  public trackbyFn(index: number) {
    return index;
  }

}
