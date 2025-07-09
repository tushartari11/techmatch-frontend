import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerCreateProfileFormComponent } from './freelancer-create-profile-form.component';

describe('FreelancerCreateProfileFormComponent', () => {
  let component: FreelancerCreateProfileFormComponent;
  let fixture: ComponentFixture<FreelancerCreateProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerCreateProfileFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerCreateProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
