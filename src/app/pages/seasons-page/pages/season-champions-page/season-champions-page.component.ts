import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStore } from '../../../../store/data.store';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-season-champions-page',
  templateUrl: './season-champions-page.component.html',
  styleUrls: ['./season-champions-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonChampionsPageComponent implements OnInit, OnDestroy {

  public champions$ = this.store.driversList$;
  public isLoading$ = this.store.driversLoading$;
  public year = '';
  public crossIcon = faTimes;

  private destroy$ = new Subject<void>();

  constructor(private store: DataStore, private route: ActivatedRoute, private router: Router) { }

  public ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: any) => {
      if (params.year) {
        this.year = params.year
        this.store.getSeasonChampions(params.year);
      }
    })
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public closeList() {
    this.router.navigate(['/seasons']);
  }


}
