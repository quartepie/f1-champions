import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverComponent } from './driver.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('DriverComponent', () => {
  let component: DriverComponent;
  let fixture: ComponentFixture<DriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverComponent ],
      imports: [FontAwesomeModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
