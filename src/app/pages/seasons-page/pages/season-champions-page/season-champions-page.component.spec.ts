import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonChampionsPageComponent } from './season-champions-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataStore } from '../../../../store/data.store';
import { API_URL } from '../../../../core/tokens/api-url';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';

class MockComponent {}

describe('SeasonChampionsPageComponent', () => {
  let component: SeasonChampionsPageComponent;
  let fixture: ComponentFixture<SeasonChampionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeasonChampionsPageComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: 'seasons', component: MockComponent }])
      ],
      providers: [
        { provide: DataStore, useValue: {} },
        { provide: API_URL, useValue: '' },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonChampionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close list', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.closeList();
    expect(spy).toHaveBeenCalledWith(['/seasons'])
  });
});
