import { Injectable } from '@angular/core';
import { ApiDataService } from '../services/api-data.service';
import { BehaviorSubject, catchError, Observable, take, throwError } from 'rxjs';
import { mapDriverData } from '../core/helpers/driver.mapper';
import { Season } from '../core/interfaces/season';
import { SeasonDto } from '../core/interfaces/season.dto';


/*
* this is a quick implementation of data state
* it uses BehaviorSubjects that are exposed only as Observables, so Components can't modify them directly
* */

@Injectable({
  providedIn: 'root'
})
export class DataStore {

  private driversList = new BehaviorSubject([]);
  private seasonList = new BehaviorSubject<Season[]>([]);
  private seasonsLoading = new BehaviorSubject(false);
  private driversLoading = new BehaviorSubject(false);
  private canLoadMoreSeasons = new BehaviorSubject(false);
  private seasonPage = 1;

  public canLoadMoreSeasons$ = this.canLoadMoreSeasons.asObservable() as Observable<boolean>;
  public seasonsLoading$ = this.seasonsLoading.asObservable() as Observable<boolean>;
  public driversLoading$ = this.driversLoading.asObservable();
  public seasonList$ = this.seasonList.asObservable();
  public driversList$ = this.driversList.asObservable();

  constructor(private api: ApiDataService) {
  }

  public getSeasons() {
    this.seasonsLoading.next(true);
    this.api.getSeasons(this.seasonPage)
      .pipe(
        take(1),
        catchError((err) => {
          this.seasonsLoading.next(false);
          return throwError(err)
        }))
      .subscribe(({ list, canLoadMore }: {list: SeasonDto[], canLoadMore: boolean}) => {
        // we additionally map response, so components only receive needed data
        const mappedResponse = list.map((seasonDto: SeasonDto) => ({
          year: seasonDto.season,
          driver: mapDriverData(seasonDto.DriverStandings[0].Driver)
        }))
        this.seasonList.next([...this.seasonList.getValue(), ...mappedResponse])
        this.canLoadMoreSeasons.next(canLoadMore)
        this.seasonsLoading.next(false)
      });
  }

  public getSeasonChampions(year: string) {
    this.driversLoading.next(true);
    this.api.getSeasonChampions(year)
      .pipe(take(1), catchError(err => {
        this.driversLoading.next(false);
        return throwError(err);
      }))
      .subscribe(res => {
        this.driversList.next(res.map((race: any) => ({
          round: race.round,
          raceName: race.raceName,
          driver: {
            ...mapDriverData(race.Results[0].Driver),
            // checks the champion of currently selected year and compares it to a driver's code
            // better to precalculate this rather than do it in a getter IMO
            isSeasonWinner: this.getSeasonChampionCode(year) === race.Results[0].Driver.code,
          }
        })));
        this.driversLoading.next(false);
      });
  }

  private getSeasonChampionCode(year: string) {
    const season = this.seasonList.value.find(season => season.year === year);
    return season ? season.driver.code : '';
  }

  public loadMoreSeasons() {
    this.seasonPage += 1;
    this.getSeasons();
  }
}
