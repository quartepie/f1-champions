import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { API_URL } from '../core/tokens/api-url';

const SEASON_PAGE_SIZE = 11;
const SKIP_SEASON_PAGES = 5;


@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private http: HttpClient,
              @Inject(API_URL) private apiUrl: string
  ) { }

  getSeasons(page = 1) {
    const params = {
      limit: SEASON_PAGE_SIZE,
      offset: SEASON_PAGE_SIZE * (SKIP_SEASON_PAGES - 1 + page)
    }
    return this.http.get(`${this.apiUrl}/driverstandings/1.json`, { params })
      .pipe(map((res: any) => ({
        list: res.MRData.StandingsTable.StandingsLists,
        // calculates if we can load more seasons. Takes already taken offset + current page size and compares it with total items
        canLoadMore: res.MRData.total > +res.MRData.offset + SEASON_PAGE_SIZE
      })));
  }

  getSeasonChampions(year: string) {
    return this.http.get(`${this.apiUrl}/${year}/results/1.json`)
      .pipe(map((res: any) => res.MRData.RaceTable.Races));
  }
}
