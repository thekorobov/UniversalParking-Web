import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingViewPageComponent } from './parking-view-page.component';

describe('ParkingViewPageComponent', () => {
  let component: ParkingViewPageComponent;
  let fixture: ComponentFixture<ParkingViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingViewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
