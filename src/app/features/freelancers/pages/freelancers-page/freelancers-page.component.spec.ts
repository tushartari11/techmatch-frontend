import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancersPageComponent } from './freelancers-page.component';

describe('FreelancersPageComponent', () => {
  let component: FreelancersPageComponent;
  let fixture: ComponentFixture<FreelancersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
