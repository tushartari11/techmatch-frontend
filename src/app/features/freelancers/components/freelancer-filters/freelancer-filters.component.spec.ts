import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerFiltersComponent } from './freelancer-filters.component';

describe('FreelancerFiltersComponent', () => {
  let component: FreelancerFiltersComponent;
  let fixture: ComponentFixture<FreelancerFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
