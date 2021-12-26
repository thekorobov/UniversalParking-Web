import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingPlacePageComponent } from './parking-place-page.component';

describe('ParkingPlacePageComponent', () => {
  let component: ParkingPlacePageComponent;
  let fixture: ComponentFixture<ParkingPlacePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingPlacePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingPlacePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
