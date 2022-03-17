import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Season } from '../../../../core/interfaces/season';

@Component({
  selector: 'app-season-list',
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonListComponent {

  @Input() public seasons: Season[] = [];
  @Input() public selectedYear: string = '';
  @Input() public isLoading: boolean = false;
  @Input() public allLoaded: boolean = false;

  @Output() public yearClick = new EventEmitter<string>();
  @Output() public loadMore = new EventEmitter<void>();

  public trackbyFn(index: number) {
    return index;
  }

}

