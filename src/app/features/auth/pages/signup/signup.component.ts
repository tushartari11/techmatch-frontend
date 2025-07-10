import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

export interface RegistrationData {
  accountType: string;
  email: string;
  password: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  newsletter: boolean;
  platformInfo: boolean;
  company?: string;
  gender: string;
  firstName: string;
  lastName: string;
  purpose?: string;
  phoneNumber: string;
  streetAddress: string;
  zipCode: string;
  city: string;
  country: string;
  recaptcha: string;
}

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.scss",
})
export class SignupComponent implements OnInit {
  private apiUrl = "http://localhost:8080/api/registration/";
  currentStep = 1;
  totalSteps = 5;
  registrationData: Partial<RegistrationData> = {};

  step1Form!: FormGroup;
  step2Form!: FormGroup;
  step3Form!: FormGroup;
  step4Form!: FormGroup;
  step5Form!: FormGroup;

  // Account types and purposes for registration
  accountTypes = [
    {
      id: "freelancer",
      title: "I'm a freelancer",
      description: "I'm looking for new project opportunities.",
      value: "freelancer",
    },
    {
      id: "client",
      title: "I'm looking for freelancers",
      description: "I would like to advertise projects.",
      value: "client",
    },
  ];

  // Step 3 - Purpose options for clients
  purposeOptions = [
    {
      id: "own-projects",
      title: "Own projects",
      description: "I am looking for freelancers for in-house purposes",
      value: "own-projects",
    },
    {
      id: "placement-recruiting",
      title: "Placement/recruiting",
      description: "I am looking for freelancers for placement and recruiting",
      value: "placement-recruiting",
    },
  ];

  // Step 2 - Personal Data Gender options
  genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer-not-to-say", label: "Prefer not to say" },
  ];

  // Step 4 - Country options
  countries = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "UK", label: "United Kingdom" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
  ];

  isSubmitting = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Initialization logic can go here
    this.initializeForms();
  }

  initializeForms(): void {
    // Initialize the forms for each step
    this.step1Form = this.fb.group({
      accountType: ["", Validators.required],
    });

    this.step2Form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      termsAccepted: [false, Validators.requiredTrue],
      privacyAccepted: [false, Validators.requiredTrue],
      newsletter: [false],
      platformInfo: [false],
    });

    this.step3Form = this.fb.group({
      company: [""],
      gender: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
    });

    this.step4Form = this.fb.group({
      purpose: ["", Validators.required],
    });

    this.step5Form = this.fb.group({
      phoneNumber: [
        "",
        [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)],
      ],
      streetAddress: ["", Validators.required],
      zipCode: ["", Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
      recaptcha: ["", Validators.required],
    });
  }

  goToLogin(): void {
    this.router.navigate(["/auth/login"]);
  }

  selectAccountType(type: string): void {
    this.step1Form.patchValue({ accountType: type });
  }

  selectPurpose(purpose: string): void {
    this.step4Form.patchValue({ purpose });
  }

  nextStep(): void {
    const currentForm = this.getCurrentForm();

    if (currentForm && currentForm.valid) {
      // Update registration data
      this.registrationData = {
        ...this.registrationData,
        ...currentForm.value,
      };

      // Navigate to next step
      if (
        this.currentStep === 3 &&
        this.registrationData.accountType === "freelancer"
      ) {
        this.currentStep = 5; // Skip purpose step for freelancers
      } else if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    }
  }

  prevStep(): void {
    if (
      this.currentStep === 5 &&
      this.registrationData.accountType === "freelancer"
    ) {
      this.currentStep = 3; // Go back to personal data for freelancers
    } else if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getCurrentForm(): FormGroup {
    switch (this.currentStep) {
      case 1:
        return this.step1Form;
      case 2:
        return this.step2Form;
      case 3:
        return this.step3Form;
      case 4:
        return this.step4Form;
      case 5:
        return this.step5Form;
      default:
        return this.step1Form;
    }
  }

  async completeRegistration(): Promise<void> {
    if (this.step5Form.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      // Combine all form data
      const finalData: RegistrationData = {
        ...this.registrationData,
        ...this.step5Form.value,
      };
      console.log(
        "Final registration data:",
        JSON.stringify(finalData, null, 2)
      );
      try {
        const response = await this.http
          .post(
            `${this.apiUrl}`, // Added endpoint
            finalData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .toPromise();
        console.log("Registration successful:", response);

        // Redirect to login with success message
        this.router.navigate(["/auth/login"], {
          queryParams: { message: "Registration successful! Please login." },
        });
      } catch (error) {
        console.error("Registration failed:", error);
        this.isSubmitting = false;
        // Handle error (show notification, etc.)
      }
    }
  }

  onSubmit(formData: RegistrationData): void {
    // Handle form submission logic here
    console.log("Form submitted with data:", formData);
  }

  get userName(): string {
    return `${this.registrationData.firstName || ""} ${
      this.registrationData.lastName || ""
    }`.trim();
  }

  onRecaptchaResolved(captchaResponse: string): void {
    this.step5Form.patchValue({ recaptcha: captchaResponse });
  }
}
