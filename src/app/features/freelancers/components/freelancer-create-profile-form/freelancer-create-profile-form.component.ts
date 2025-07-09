import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FreelancerProfileService } from '../../../../core/services/freelancer-profile.service';
import {
  FreelancerProfile,
  PortfolioItem,
  Education,
  Certification,
} from '../../../../core/models/freelancer-profile.model';

@Component({
  selector: 'app-freelancer-create-profile-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './freelancer-create-profile-form.component.html',
  styleUrl: './freelancer-create-profile-form.component.scss',
})
export class FreelancerCreateProfileFormComponent implements OnInit {
  profileForm: FormGroup;
  isSubmitting = false;
  currentStep = 1;
  totalSteps = 6;
  profileImagePreview: string | null = null;
  selectedFile: File | null = null;
  public currentYear: number = new Date().getFullYear();

  // Options for dropdowns
  availabilityOptions = ['Available', 'Busy', 'Not Available'];
  currencyOptions = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  experienceOptions = [
    { value: 1, label: '1 year' },
    { value: 2, label: '2 years' },
    { value: 3, label: '3 years' },
    { value: 4, label: '4 years' },
    { value: 5, label: '5 years' },
    { value: 6, label: '6+ years' },
    { value: 7, label: '7+ years' },
    { value: 8, label: '8+ years' },
    { value: 9, label: '9+ years' },
    { value: 10, label: '10+ years' },
  ];

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
    'Project Management',
    'Business Analysis',
  ];

  languageOptions = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Chinese',
    'Japanese',
    'Korean',
    'Arabic',
    'Russian',
    'Hindi',
  ];

  constructor(
    private fb: FormBuilder,
    private freelancerService: FreelancerProfileService,
    private router: Router
  ) {
    this.profileForm = this.createForm();
  }

  ngOnInit(): void {
    console.log('Freelancer Create Profile Form loaded');
  }

  private createForm(): FormGroup {
    return this.fb.group({
      // Step 1: Basic Information
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)],
      ],
      title: ['', [Validators.required, Validators.minLength(5)]],
      location: ['', [Validators.required]],

      // Step 2: Professional Details
      hourlyRate: ['', [Validators.required, Validators.min(5)]],
      currency: ['USD', [Validators.required]],
      availability: ['Available', [Validators.required]],
      experienceYears: ['', [Validators.required, Validators.min(0)]],

      // Step 3: Skills and Specializations
      skills: this.fb.array([]),
      specializations: this.fb.array([]),
      languages: this.fb.array([]),

      // Step 4: Bio and Description
      bio: [
        '',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(500),
        ],
      ],

      // Step 5: Portfolio
      portfolio: this.fb.array([]),

      // Step 6: Education and Certifications
      education: this.fb.array([]),
      certifications: this.fb.array([]),
    });
  }

  // Form Array Getters
  get skillsArray(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }

  get specializationsArray(): FormArray {
    return this.profileForm.get('specializations') as FormArray;
  }

  get languagesArray(): FormArray {
    return this.profileForm.get('languages') as FormArray;
  }

  get portfolioArray(): FormArray {
    return this.profileForm.get('portfolio') as FormArray;
  }

  get educationArray(): FormArray {
    return this.profileForm.get('education') as FormArray;
  }

  get certificationsArray(): FormArray {
    return this.profileForm.get('certifications') as FormArray;
  }

  // Skills Management
  addSkill(skill: string): void {
    if (skill && !this.skillsArray.value.includes(skill)) {
      this.skillsArray.push(this.fb.control(skill));
    }
  }

  removeSkill(index: number): void {
    this.skillsArray.removeAt(index);
  }

  // Specializations Management
  addSpecialization(specialization: string): void {
    if (
      specialization &&
      !this.specializationsArray.value.includes(specialization)
    ) {
      this.specializationsArray.push(this.fb.control(specialization));
    }
  }

  removeSpecialization(index: number): void {
    this.specializationsArray.removeAt(index);
  }

  // Languages Management
  addLanguage(language: string): void {
    if (language && !this.languagesArray.value.includes(language)) {
      this.languagesArray.push(this.fb.control(language));
    }
  }

  removeLanguage(index: number): void {
    this.languagesArray.removeAt(index);
  }

  // Portfolio Management
  addPortfolioItem(): void {
    const portfolioGroup = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageUrl: [''],
      projectUrl: [''],
      technologies: this.fb.array([]),
    });
    this.portfolioArray.push(portfolioGroup);
  }

  removePortfolioItem(index: number): void {
    this.portfolioArray.removeAt(index);
  }

  addTechnology(portfolioIndex: number, technology: string): void {
    if (technology) {
      const technologiesArray = this.portfolioArray
        .at(portfolioIndex)
        .get('technologies') as FormArray;
      if (!technologiesArray.value.includes(technology)) {
        technologiesArray.push(this.fb.control(technology));
      }
    }
  }

  removeTechnology(portfolioIndex: number, techIndex: number): void {
    const technologiesArray = this.portfolioArray
      .at(portfolioIndex)
      .get('technologies') as FormArray;
    technologiesArray.removeAt(techIndex);
  }

  // Education Management
  addEducation(): void {
    const educationGroup = this.fb.group({
      degree: ['', [Validators.required]],
      institution: ['', [Validators.required]],
      year: [
        '',
        [
          Validators.required,
          Validators.min(1950),
          Validators.max(new Date().getFullYear()),
        ],
      ],
    });
    this.educationArray.push(educationGroup);
  }

  removeEducation(index: number): void {
    this.educationArray.removeAt(index);
  }

  // Certification Management
  addCertification(): void {
    const certificationGroup = this.fb.group({
      name: ['', [Validators.required]],
      issuer: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
    this.certificationsArray.push(certificationGroup);
  }

  removeCertification(index: number): void {
    this.certificationsArray.removeAt(index);
  }

  // File Upload
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Step Navigation
  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }

  // Form Validation for Current Step
  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return (
          (this.profileForm.get('firstName')?.valid &&
            this.profileForm.get('lastName')?.valid &&
            this.profileForm.get('email')?.valid &&
            this.profileForm.get('phone')?.valid &&
            this.profileForm.get('title')?.valid &&
            this.profileForm.get('location')?.valid) ||
          false
        );
      case 2:
        return (
          (this.profileForm.get('hourlyRate')?.valid &&
            this.profileForm.get('currency')?.valid &&
            this.profileForm.get('availability')?.valid &&
            this.profileForm.get('experienceYears')?.valid) ||
          false
        );
      case 3:
        return this.skillsArray.length > 0 && this.languagesArray.length > 0;
      case 4:
        return this.profileForm.get('bio')?.valid || false;
      case 5:
        return true; // Portfolio is optional
      case 6:
        return true; // Education and certifications are optional
      default:
        return false;
    }
  }

  // Form Submission
  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isSubmitting = true;

      const formData = this.prepareFormData();

      this.freelancerService.createProfile(formData).subscribe({
        next: (response) => {
          console.log('Profile created successfully:', response);
          this.router.navigate(['/freelancers']);
        },
        error: (error) => {
          console.error('Error creating profile:', error);
          this.isSubmitting = false;
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private prepareFormData(): FreelancerProfile {
    const formValue = this.profileForm.value;

    return {
      id: 0, // Will be assigned by backend
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phone: formValue.phone,
      title: formValue.title,
      profileImage: this.profileImagePreview || undefined,
      location: formValue.location,
      hourlyRate: formValue.hourlyRate,
      currency: formValue.currency,
      availability: formValue.availability,
      skills: formValue.skills || [],
      specializations: formValue.specializations || [],
      experienceYears: formValue.experienceYears,
      languages: formValue.languages || [],
      bio: formValue.bio,
      portfolio: formValue.portfolio || [],
      education: formValue.education || [],
      certifications:
        formValue.certifications?.map((cert: any) => ({
          ...cert,
          date: new Date(cert.date),
        })) || [],
      rating: 0,
      reviewsCount: 0,
      completedProjects: 0,
      description: formValue.bio, // Use bio as description initially
      isVerified: false,
      isOnline: true,
      joinedDate: new Date(),
      lastActive: new Date(),
      profileViews: 0,
      responseTime: '< 24 hours',
      successRate: 0,
    };
  }

  private markFormGroupTouched(): void {
    Object.keys(this.profileForm.controls).forEach((key) => {
      const control = this.profileForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper Methods
  getFieldError(fieldName: string): string {
    const field = this.profileForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `${fieldName} is too short`;
      if (field.errors['maxlength']) return `${fieldName} is too long`;
      if (field.errors['min']) return `${fieldName} value is too low`;
      if (field.errors['pattern']) return `${fieldName} format is invalid`;
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }
  // Add these helper methods here:
  getStepLabel(step: number): string {
    const labels = {
      1: 'Basic Info',
      2: 'Professional',
      3: 'Skills',
      4: 'About You',
      5: 'Portfolio',
      6: 'Education',
    };
    return labels[step as keyof typeof labels] || '';
  }

  getTechnologiesArray(portfolioIndex: number): FormArray {
    return this.portfolioArray
      .at(portfolioIndex)
      .get('technologies') as FormArray;
  }
}
