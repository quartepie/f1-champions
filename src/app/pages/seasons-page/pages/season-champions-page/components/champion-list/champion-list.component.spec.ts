import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionListComponent } from './champion-list.component';

describe('ChampionListComponent', () => {
  let component: ChampionListComponent;
  let fixture: ComponentFixture<ChampionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChampionListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('trackByFn', () => {
    it('should return provided index', () => {
      expect(component.trackbyFn(123)).toEqual(123);
    })
  });
});
