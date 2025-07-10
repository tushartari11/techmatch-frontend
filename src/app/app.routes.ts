import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./layout/home/home.component").then((c) => c.HomeComponent),
  },
  {
    path: "auth",
    children: [
      {
        path: "signup",
        loadComponent: () =>
          import("./features/auth/pages/signup/signup.component").then(
            (m) => m.SignupComponent
          ),
      },
      {
        path: "login",
        loadComponent: () =>
          import("./features/auth/pages/login/login.component").then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import(
        "./features/dashboard/components/user-dashboard/user-dashboard.component"
      ).then((c) => c.UserDashboardComponent),
  },
  {
    path: "projects",
    loadComponent: () =>
      import(
        "./features/projects/pages/projects-page/projects-page.component"
      ).then((c) => c.ProjectsPageComponent),
  },
  {
    path: "freelancers",
    loadComponent: () =>
      import(
        "./features/freelancers/pages/freelancers-page/freelancers-page.component"
      ).then((c) => c.FreelancersPageComponent),
  },
  {
    path: "create-profile",
    loadComponent: () =>
      import(
        "./features/freelancers/components/freelancer-create-profile-form/freelancer-create-profile-form.component"
      ).then((c) => c.FreelancerCreateProfileFormComponent),
  },
  {
    path: "project/:id",
    loadComponent: () =>
      import(
        "./features/projects/pages/project-details-page/project-details-page.component"
      ).then((c) => c.ProjectDetailsPageComponent),
  },
  { path: "**", redirectTo: "/" },
];
