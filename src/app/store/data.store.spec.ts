import { TestBed } from '@angular/core/testing';

import { DataStore } from './data.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { API_URL } from '../core/tokens/api-url';
import { ApiDataService } from '../services/api-data.service';
import createSpy = jasmine.createSpy;
import { TestScheduler } from 'rxjs/testing';
import { EMPTY, of } from 'rxjs';

const unknownDriver = {
  firstName: '???',
  code: 'unknown',
  lastName: '????',
  number: '?'
}

describe('DataStore', () => {
  let service: DataStore;
  let testScheduler: TestScheduler;
  let api: ApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: API_URL, useValue: '' },
        {
          provide: ApiDataService, useValue: {
            getSeasons: () => of({ list: [] }),
            getSeasonChampions: () => of([])
          }
        }
      ],
      imports: [HttpClientTestingModule,]
    });
    service = TestBed.inject(DataStore);
    api = TestBed.inject(ApiDataService);
  });

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSeasons', () => {
    it('should set loading to true', () => {
      const spy = spyOn((service as any).seasonsLoading, 'next');
      service.getSeasons();
      expect(spy).toHaveBeenCalledWith(true)
    });
    it('should get to API call', () => {
      testScheduler.run(({ hot, flush }) => {
        let spy = spyOn(api, 'getSeasons').and.callFake(() => hot('a', { a: { list: [], canLoadMore: true } }))
        service.getSeasons();
        flush();
        expect(spy).toHaveBeenCalledWith(1);
      })
    });
    it('should set mapped response', () => {
      testScheduler.run(({ hot, flush }) => {
        const spy = spyOn((service as any).seasonList, 'next');
        spyOn(api, 'getSeasons').and.callFake(() => hot('a', {
          a: {
            list: [{
              season: '2012',
              DriverStandings: [{ Driver: {} }]
            }], canLoadMore: true
          }
        }))
        service.getSeasons();
        flush();
        expect(spy).toHaveBeenCalledWith([{ year: '2012', driver: unknownDriver }])
      });
    })
    it('should set loading to false one finished', () => {
      testScheduler.run(({ hot, flush }) => {
        const spy = spyOn((service as any).seasonsLoading, 'next');
        spyOn(api, 'getSeasons').and.callFake(() => hot('a', { a: { list: [], canLoadMore: true } }))
        service.getSeasons();
        flush();
        expect(spy).toHaveBeenCalledWith(false)
      });
    });
    it('should turn off loading on fail', () => {
      testScheduler.run(({ hot, flush, expectObservable }) => {
        const spy = spyOn((service as any).seasonsLoading, 'next');
        spyOn(api, 'getSeasons').and.callFake(() => hot('#'));
        try {
          service.getSeasons();
          flush();
        } catch (e) {
          expect(spy).toHaveBeenCalledWith(false);
        }
      });
    })
  });

  describe('getSeasonChampions', () => {
    it('should set loading to true', () => {
      const spy = spyOn((service as any).driversLoading, 'next');
      service.getSeasonChampions('');
      expect(spy).toHaveBeenCalledWith(true)
    });
    it('should get to API call', () => {
      testScheduler.run(({ hot, flush }) => {
        let spy = spyOn(api, 'getSeasonChampions').and.callFake(() => hot('a', { a: [] }))
        service.getSeasonChampions('2021');
        flush();
        expect(spy).toHaveBeenCalledWith('2021');
      })
    });
    it('should set mapped response', () => {
      testScheduler.run(({ hot, flush }) => {
        const spy = spyOn((service as any).driversList, 'next');
        spyOn(api, 'getSeasonChampions').and.callFake(() => hot('a', {
            a: [{
              round: '1',
              raceName: 'name',
              Results: [{ Driver: {} }]
            }]
          }
        ))
        service.getSeasonChampions('2012');
        flush();
        expect(spy).toHaveBeenCalledWith([{
          round: '1',
          raceName: 'name',
          driver: { ...unknownDriver, isSeasonWinner: false }
        }])
      });
    })
    it('should set loading to false one finished', () => {
      testScheduler.run(({ hot, flush }) => {
        const spy = spyOn((service as any).driversLoading, 'next');
        spyOn(api, 'getSeasonChampions').and.callFake(() => hot('a', { a: [] }))
        service.getSeasonChampions('2021');
        flush();
        expect(spy).toHaveBeenCalledWith(false)
      });
    });
    it('should turn off loading on fail', () => {
      testScheduler.run(({ hot, flush, expectObservable }) => {
        const spy = spyOn((service as any).driversLoading, 'next');
        spyOn(api, 'getSeasonChampions').and.callFake(() => hot('#'));
        try {
          service.getSeasonChampions('2021');
          flush();
        } catch (e) {
          expect(spy).toHaveBeenCalledWith(true);
        }
      });
    });
  });

  describe('loadMoreSeasons', () => {
    it('should launch getSeasons with incremented page', () => {
      const spy = spyOn(api, 'getSeasons').and.callFake(() => EMPTY);
      (service as any).seasonPage = 3;
      service.loadMoreSeasons();
      expect(spy).toHaveBeenCalledWith(4);
    })
  })

});
