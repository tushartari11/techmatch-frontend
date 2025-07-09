import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerDetailsPageComponent } from './freelancer-details-page.component';

describe('FreelancerDetailsPageComponent', () => {
  let component: FreelancerDetailsPageComponent;
  let fixture: ComponentFixture<FreelancerDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
