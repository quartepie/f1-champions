import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ChildActivationEnd, ChildrenOutletContexts, Router } from '@angular/router';
import { DataStore } from '../../store/data.store';
import { filter, Subject, takeUntil } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-seasons-page',
  templateUrl: './seasons-page.component.html',
  styleUrls: ['./seasons-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // adding some fancy enter animation for champion list
  animations: [trigger('enter', [
    transition('*=>show', [
      style({ opacity: 0, transform: 'translateX(100%)' }),
      animate('400ms ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
    ])
  ])]
})
export class SeasonsPageComponent implements OnInit, OnDestroy {

  public years$ = this.store.seasonList$;
  public seasonsLoading$= this.store.seasonsLoading$;
  public canLoadSeasons$ = this.store.canLoadMoreSeasons$;
  public selectedYear = '';

  private destroy$ = new Subject<void>();

  constructor(private store: DataStore,
              private router: Router,
              private route: ActivatedRoute,
              private contexts: ChildrenOutletContexts) {

    // this is needed to mark the season as selected when user opens a direct link to it
    this.router.events
      .pipe(filter(ev => ev instanceof ChildActivationEnd), takeUntil(this.destroy$))
      .subscribe(() => {
        const params = this.contexts.getContext('primary')?.route?.snapshot.params ?? {};
        this.selectedYear = params['year'];
    })
  }

  ngOnInit() {
    this.store.getSeasons();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getYearChampions(year: string) {
    this.router.navigate(['/seasons', year]);
  }

  loadMore() {
    this.store.loadMoreSeasons();
  }
}
