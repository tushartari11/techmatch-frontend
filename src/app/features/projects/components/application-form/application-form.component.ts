import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../../../../core/services/application.service';
import { JobApplication } from '../../../../core/models/application.model';

@Component({
  selector: 'app-application-form',
  template: `
    <div class="application-form-container">
      <form
        [formGroup]="applicationForm"
        (ngSubmit)="onSubmit()"
        *ngIf="!isSubmitted"
      >
        <div class="form-section">
          <h3>Personal Information</h3>

          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                formControlName="firstName"
                class="form-control"
                [class.is-invalid]="isFieldInvalid('firstName')"
              />
              <div class="invalid-feedback" *ngIf="isFieldInvalid('firstName')">
                <small
                  *ngIf="applicationForm.get('firstName')?.errors?.['required']"
                >
                  First name is required
                </small>
                <small
                  *ngIf="applicationForm.get('firstName')?.errors?.['minlength']"
                >
                  First name must be at least 2 characters
                </small>
              </div>
            </div>

            <div class="form-group">
              <label for="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                formControlName="lastName"
                class="form-control"
                [class.is-invalid]="isFieldInvalid('lastName')"
              />
              <div class="invalid-feedback" *ngIf="isFieldInvalid('lastName')">
                <small
                  *ngIf="applicationForm.get('lastName')?.errors?.['required']"
                >
                  Last name is required
                </small>
                <small
                  *ngIf="applicationForm.get('lastName')?.errors?.['minlength']"
                >
                  Last name must be at least 2 characters
                </small>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email Address *</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              class="form-control"
              [class.is-invalid]="isFieldInvalid('email')"
            />
            <div class="invalid-feedback" *ngIf="isFieldInvalid('email')">
              <small *ngIf="applicationForm.get('email')?.errors?.['required']">
                Email is required
              </small>
              <small *ngIf="applicationForm.get('email')?.errors?.['email']">
                Please enter a valid email address
              </small>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Cover Letter</h3>
          <div class="form-group">
            <label for="coverLetter"
              >Why are you the best fit for this project? *</label
            >
            <textarea
              id="coverLetter"
              formControlName="coverLetter"
              class="form-control"
              rows="6"
              placeholder="Tell us about your relevant experience, skills, and why you're interested in this project..."
              [class.is-invalid]="isFieldInvalid('coverLetter')"
            ></textarea>
            <div class="character-count">
              {{ applicationForm.get('coverLetter')?.value?.length || 0 }} /
              2000 characters
            </div>
            <div class="invalid-feedback" *ngIf="isFieldInvalid('coverLetter')">
              <small
                *ngIf="applicationForm.get('coverLetter')?.errors?.['required']"
              >
                Cover letter is required
              </small>
              <small
                *ngIf="applicationForm.get('coverLetter')?.errors?.['minlength']"
              >
                Cover letter must be at least 50 characters
              </small>
              <small
                *ngIf="applicationForm.get('coverLetter')?.errors?.['maxlength']"
              >
                Cover letter cannot exceed 2000 characters
              </small>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Resume/CV</h3>
          <div class="form-group">
            <label>Upload your resume/CV</label>
            <app-file-upload
              (fileSelected)="onFileSelected($event)"
              (fileRemoved)="onFileRemoved()"
              accept=".pdf,.doc,.docx"
            ></app-file-upload>
            <small class="form-text text-muted">
              Supported formats: PDF, DOC, DOCX (max 5MB)
            </small>
          </div>
        </div>

        <div class="form-section">
          <h3>Eligibility</h3>
          <div class="form-group">
            <div class="form-check">
              <input
                type="checkbox"
                id="eligibleToWork"
                formControlName="eligibleToWork"
                class="form-check-input"
                [class.is-invalid]="isFieldInvalid('eligibleToWork')"
              />
              <label class="form-check-label" for="eligibleToWork">
                I am eligible to work in the required location *
              </label>
              <div
                class="invalid-feedback"
                *ngIf="isFieldInvalid('eligibleToWork')"
              >
                <small>You must confirm your eligibility to work</small>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button
            type="button"
            class="btn btn-secondary"
            (click)="onCancel()"
            [disabled]="isSubmitting"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="btn btn-primary"
            [disabled]="applicationForm.invalid || isSubmitting"
          >
            <span *ngIf="isSubmitting">
              <i class="fas fa-spinner fa-spin"></i>
              Submitting...
            </span>
            <span *ngIf="!isSubmitting">
              <i class="fas fa-paper-plane"></i>
              Submit Application
            </span>
          </button>
        </div>
      </form>

      <!-- Success Message -->
      <div class="success-message" *ngIf="isSubmitted">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3>Application Submitted Successfully!</h3>
        <p>
          Thank you for your interest in this project. We have received your
          application and will review it shortly.
        </p>
        <p>
          You will receive a confirmation email at
          <strong>{{ submittedApplication?.email }}</strong>
        </p>
        <div class="success-actions">
          <button class="btn btn-primary" (click)="viewMoreProjects()">
            View More Projects
          </button>
        </div>
      </div>

      <!-- Error Message -->
      <div class="error-message" *ngIf="submitError">
        <div class="error-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <h4>Submission Failed</h4>
        <p>{{ submitError }}</p>
        <button class="btn btn-outline-primary" (click)="retrySubmission()">
          Try Again
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .application-form-container {
        max-width: 800px;
        margin: 0 auto;
      }

      .form-section {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #007bff;
      }

      .form-section h3 {
        margin-bottom: 1rem;
        color: #333;
        font-size: 1.2rem;
        font-weight: 600;
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      .form-group {
        margin-bottom: 1rem;
      }

      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #555;
      }

      .form-control {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
      }

      .form-control:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      }

      .form-control.is-invalid {
        border-color: #dc3545;
      }

      .form-control.is-invalid:focus {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
      }

      textarea.form-control {
        min-height: 120px;
        resize: vertical;
      }

      .character-count {
        font-size: 0.875rem;
        color: #666;
        text-align: right;
        margin-top: 0.25rem;
      }

      .form-check {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .form-check-input {
        width: 1.25rem;
        height: 1.25rem;
        margin-top: 0.125rem;
      }

      .form-check-label {
        flex: 1;
        font-size: 0.95rem;
        line-height: 1.5;
      }

      .invalid-feedback {
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 0.875rem;
        color: #dc3545;
      }

      .form-text {
        margin-top: 0.25rem;
        font-size: 0.875rem;
        color: #6c757d;
      }

      .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        padding-top: 1.5rem;
        border-top: 1px solid #e9ecef;
      }

      .btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }

      .btn-primary {
        background: #007bff;
        color: white;
      }

      .btn-primary:hover:not(:disabled) {
        background: #0056b3;
      }

      .btn-secondary {
        background: #6c757d;
        color: white;
      }

      .btn-secondary:hover:not(:disabled) {
        background: #545b62;
      }

      .btn-outline-primary {
        background: transparent;
        color: #007bff;
        border: 2px solid #007bff;
      }

      .btn-outline-primary:hover {
        background: #007bff;
        color: white;
      }

      .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .success-message {
        text-align: center;
        padding: 3rem 2rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .success-icon {
        font-size: 4rem;
        color: #28a745;
        margin-bottom: 1rem;
      }

      .success-message h3 {
        color: #28a745;
        margin-bottom: 1rem;
      }

      .success-message p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 1rem;
      }

      .success-actions {
        margin-top: 2rem;
      }

      .error-message {
        text-align: center;
        padding: 2rem;
        background: #f8d7da;
        border: 1px solid #f5c6cb;
        border-radius: 8px;
        color: #721c24;
      }

      .error-icon {
        font-size: 3rem;
        color: #dc3545;
        margin-bottom: 1rem;
      }

      .error-message h4 {
        margin-bottom: 1rem;
      }

      @media (max-width: 768px) {
        .form-row {
          grid-template-columns: 1fr;
        }

        .form-actions {
          flex-direction: column;
        }

        .btn {
          width: 100%;
          justify-content: center;
        }
      }
    `,
  ],
})
export class ApplicationFormComponent implements OnInit {
  @Input() projectId!: string;
  @Input() disabled: boolean = false;
  @Output() applicationSubmitted = new EventEmitter<JobApplication>();

  applicationForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  submitError = '';
  submittedApplication: JobApplication | null = null;
  selectedFile: File | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly applicationService: ApplicationService
  ) {
    this.applicationForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.disabled) {
      this.applicationForm.disable();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      coverLetter: [
        '',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(2000),
        ],
      ],
      eligibleToWork: [false, Validators.requiredTrue],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.applicationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onFileSelected(file: File): void {
    this.selectedFile = file;
  }

  onFileRemoved(): void {
    this.selectedFile = null;
  }

  onSubmit(): void {
    if (this.applicationForm.valid) {
      this.isSubmitting = true;
      this.submitError = '';

      const formValue = this.applicationForm.value;
      const application: JobApplication = {
        projectId: this.projectId,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        coverLetter: formValue.coverLetter,
        eligibleToWork: formValue.eligibleToWork,
        cvFile: this.selectedFile || undefined,
        cvFileName: this.selectedFile?.name,
      };

      this.applicationService.submitApplication(application).subscribe({
        next: (response: JobApplication) => {
          this.isSubmitting = false;
          this.isSubmitted = true;
          this.submittedApplication = response;
          this.applicationSubmitted.emit(response);
        },
        error: (error: any) => {
          this.isSubmitting = false;
          this.submitError =
            error.message ?? 'Failed to submit application. Please try again.';
          console.error('Application submission error:', error);
        },
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.applicationForm.controls).forEach((key) => {
        const control = this.applicationForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  onCancel(): void {
    this.applicationForm.reset();
    this.selectedFile = null;
    this.submitError = '';
  }

  retrySubmission(): void {
    this.submitError = '';
    this.onSubmit();
  }

  viewMoreProjects(): void {
    // Navigate to projects page
    // This would typically be handled by the parent component
    window.location.href = '/projects';
  }
}
