import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsPageComponent } from './seasons-page.component';
import { DataStore } from '../../store/data.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SeasonListComponent } from './components/season-list/season-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import createSpy = jasmine.createSpy;
import { Router } from '@angular/router';

describe('SeasonsPageComponent', () => {
  let component: SeasonsPageComponent;
  let fixture: ComponentFixture<SeasonsPageComponent>;
  let state: DataStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeasonsPageComponent, SeasonListComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [{
        provide: DataStore,
        useValue: { getSeasons: createSpy(), loadMoreSeasons: createSpy() } }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonsPageComponent);
    state = TestBed.inject(DataStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire getSeasons on init', () => {
    // const spy = spyOn(component as any, 'getSeasons');
    component.ngOnInit();
    expect(state.getSeasons).toHaveBeenCalled();
  });

  it('should dispatch loadMore', () => {
    component.loadMore();
    expect(state.loadMoreSeasons).toHaveBeenCalled();
  });

  it('getYearChampions should trigger navigation', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.getYearChampions('2022');
    expect(spy).toHaveBeenCalledWith(['/seasons', '2022'])
  })
});
