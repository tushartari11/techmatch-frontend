import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

    // Check for registration success message
    this.route.queryParams.subscribe((params) => {
      if (params["message"]) {
        this.message = params["message"];
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log("Login attempt:", this.loginForm.value);
      // Handle login logic
    }
  }

  goToSignup(): void {
    this.router.navigate(["/auth/signup"]);
  }
}
