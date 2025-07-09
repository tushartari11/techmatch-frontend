import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FreelancerListComponent } from '../../components/freelancer-list/freelancer-list.component';
import {
  FreelancerProfile,
  FreelancerSearchCriteria,
  Skill, // Changed from FreelancerSearchFilters to FreelancerSearchCriteria
} from '../../../../core/models/freelancer-profile.model';
import { FreelancerProfileService } from '../../../../core/services/freelancer-profile.service';

@Component({
  selector: 'app-freelancers-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FreelancerListComponent],
  templateUrl: './freelancers-page.component.html',
  styleUrl: './freelancers-page.component.scss',
})
export class FreelancersPageComponent implements OnInit {
  freelancers: FreelancerProfile[] = [];
  filteredFreelancers: FreelancerProfile[] = [];
  searchForm: FormGroup;
  isLoading = false;
  totalFreelancers = 0;

  skillCategories = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Data Science',
    'DevOps',
    'Digital Marketing',
    'Content Writing',
    'Graphic Design',
    'Video Editing',
    'Translation',
  ];

  experienceLevels = ['Entry', 'Intermediate', 'Expert'];
  availabilityOptions = ['Available', 'Busy', 'Not Available'];

  constructor(
    private freelancerService: FreelancerProfileService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.createSearchForm();
  }

  ngOnInit(): void {
    this.loadFreelancers();
    this.setupSearchForm();
  }

  private createSearchForm(): FormGroup {
    return this.fb.group({
      search: [''],
      skills: [[]],
      location: [''],
      hourlyRateMin: [null],
      hourlyRateMax: [null],
      rating: [null],
      availability: [''],
      experienceLevel: [''],
      isVerified: [false],
    });
  }

  private setupSearchForm(): void {
    this.searchForm.valueChanges.subscribe(() => {
      this.onSearch();
    });
  }

  loadFreelancers(): void {
    this.isLoading = true;

    // Use the service's mock data method
    // this.freelancerService.getMockFreelancers().subscribe({
    this.freelancerService.getAllProfiles().subscribe({
      next: (freelancers) => {
        this.freelancers = freelancers;
        this.filteredFreelancers = [...this.freelancers];
        this.totalFreelancers = this.freelancers.length;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading freelancers:', error);
        this.isLoading = false;
      },
    });
  }

  onSearch(): void {
    const filters = this.searchForm.value;
    this.filteredFreelancers = this.freelancers.filter((freelancer) => {
      return this.matchesFilters(freelancer, filters);
    });
    this.totalFreelancers = this.filteredFreelancers.length;
  }

  private matchesFilters(freelancer: FreelancerProfile, filters: any): boolean {
    // Search in name and title
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      if (
        !freelancer.firstName.toLowerCase().includes(searchTerm) &&
        !freelancer.lastName.toLowerCase().includes(searchTerm) &&
        !freelancer.title.toLowerCase().includes(searchTerm)
      ) {
        return false;
      }
    }

    // Skills filter
    if (filters.skills && filters.skills.length > 0) {
      const hasMatchingSkill = filters.skills.some((skill: string) =>
        freelancer.skills.some((freelancerSkill: Skill) =>
          freelancerSkill.name.toLowerCase().includes(skill.toLowerCase())
        )
      );
      if (!hasMatchingSkill) return false;
    }

    // Location filter
    if (
      filters.location &&
      !freelancer.location
        .toLowerCase()
        .includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    // Rate filters
    if (
      filters.hourlyRateMin &&
      freelancer.hourlyRate < filters.hourlyRateMin
    ) {
      return false;
    }
    if (
      filters.hourlyRateMax &&
      freelancer.hourlyRate > filters.hourlyRateMax
    ) {
      return false;
    }

    // Rating filter
    if (filters.rating && freelancer.rating < filters.rating) {
      return false;
    }

    // Availability filter
    if (
      filters.availability &&
      freelancer.availability !== filters.availability
    ) {
      return false;
    }

    // Experience level filter
    if (filters.experienceLevel) {
      const freelancerLevel = this.getExperienceLevel(
        freelancer.experienceYears
      );
      if (freelancerLevel !== filters.experienceLevel) {
        return false;
      }
    }

    // Verified filter
    if (filters.isVerified && !freelancer.isVerified) {
      return false;
    }

    return true;
  }

  private getExperienceLevel(years: number): string {
    if (years < 2) return 'Entry';
    if (years < 5) return 'Intermediate';
    return 'Expert';
  }

  onResetFilters(): void {
    this.searchForm.reset();
    this.filteredFreelancers = [...this.freelancers];
    this.totalFreelancers = this.freelancers.length;
  }

  onFreelancerClick(freelancer: FreelancerProfile): void {
    console.log('Freelancer clicked:', freelancer);
    // Navigate to freelancer profile
  }

  onContactFreelancer(freelancer: FreelancerProfile): void {
    console.log('Contact freelancer:', freelancer);
    // Open contact modal or navigate to contact page
  }
}
