import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ProjectListComponent } from '../../components/project-list/project-list.component';
import { ProjectService } from '../../../../core/services/project.service';
import {
  Project,
  ProjectSearchFilters,
} from '../../../../core/models/project.model';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProjectListComponent],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
})
export class ProjectsPageComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchForm: FormGroup;
  isLoading = false;
  currentPage = 1;
  totalPages = 1;
  totalProjects = 0;

  categories = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Data Science',
    'DevOps',
    'Digital Marketing',
    'Content Writing',
    'Graphic Design',
  ];

  experienceLevels = ['Entry', 'Intermediate', 'Expert'];
  projectTypes = ['Fixed Price', 'Hourly', 'Milestone'];

  constructor(private projectService: ProjectService, private fb: FormBuilder) {
    this.searchForm = this.createSearchForm();
  }

  ngOnInit(): void {
    this.loadProjects();
    this.setupSearchForm();
  }

  private createSearchForm(): FormGroup {
    return this.fb.group({
      search: [''],
      category: [''],
      location: [''],
      experienceLevel: [''],
      projectType: [''],
      budgetMin: [null],
      budgetMax: [null],
      isRemote: [false],
      isUrgent: [false],
    });
  }

  private setupSearchForm(): void {
    this.searchForm.valueChanges.subscribe(() => {
      this.onSearch();
    });
  }

  loadProjects(): void {
    this.isLoading = true;

    // Generate more sample projects
    this.projects = [
      {
        id: 1,
        title: 'Website development - ecommerce - budget: limited',
        description:
          'We are looking for a skilled web developer to create an ecommerce website with modern design and secure payment integration. The site should be responsive and include features like product catalog, shopping cart, and user authentication.',
        client: 'TechStart Inc.',
        location: 'Remote',
        budget: { min: 2000, max: 5000, currency: 'USD' },
        duration: '2-3 months',
        postedDate: new Date('2024-01-15'),
        deadline: new Date('2024-04-15'),
        status: 'Open',
        requiredSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        experienceLevel: 'Intermediate',
        projectType: 'Fixed Price',
        applicationsCount: 12,
        category: 'Web Development',
        isUrgent: false,
        isRemote: true,
        tags: ['ecommerce', 'responsive', 'payment-gateway'],
      },
      {
        id: 2,
        title: 'Mobile App Development - iOS & Android',
        description:
          'Looking for experienced mobile developers to create a cross-platform mobile application for food delivery service. The app should include real-time tracking, payment integration, and user reviews.',
        client: 'FoodieApp Ltd.',
        location: 'New York, NY',
        budget: { min: 8000, max: 15000, currency: 'USD' },
        duration: '4-6 months',
        postedDate: new Date('2024-01-10'),
        deadline: new Date('2024-07-10'),
        status: 'Open',
        requiredSkills: [
          'React Native',
          'Flutter',
          'Firebase',
          'API Integration',
        ],
        experienceLevel: 'Expert',
        projectType: 'Milestone',
        applicationsCount: 8,
        category: 'Mobile Development',
        isUrgent: true,
        isRemote: false,
        tags: ['mobile', 'cross-platform', 'food-delivery'],
      },
      {
        id: 3,
        title: 'UI/UX Design for SaaS Platform',
        description:
          'We need a talented UI/UX designer to redesign our SaaS platform interface. The project involves creating wireframes, mockups, and interactive prototypes for a better user experience.',
        client: 'CloudTech Solutions',
        location: 'Remote',
        budget: { min: 3000, max: 6000, currency: 'USD' },
        duration: '1-2 months',
        postedDate: new Date('2024-01-12'),
        deadline: new Date('2024-03-12'),
        status: 'Open',
        requiredSkills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
        experienceLevel: 'Intermediate',
        projectType: 'Fixed Price',
        applicationsCount: 15,
        category: 'UI/UX Design',
        isUrgent: false,
        isRemote: true,
        tags: ['saas', 'wireframes', 'prototypes'],
      },
      {
        id: 4,
        title: 'Data Science - Customer Analytics',
        description:
          'Looking for a data scientist to analyze customer behavior and create predictive models. The project involves working with large datasets and implementing machine learning algorithms.',
        client: 'RetailAnalytics Corp',
        location: 'San Francisco, CA',
        budget: { min: 5000, max: 10000, currency: 'USD' },
        duration: '3-4 months',
        postedDate: new Date('2024-01-08'),
        deadline: new Date('2024-05-08'),
        status: 'Open',
        requiredSkills: ['Python', 'Machine Learning', 'SQL', 'Pandas'],
        experienceLevel: 'Expert',
        projectType: 'Hourly',
        applicationsCount: 6,
        category: 'Data Science',
        isUrgent: true,
        isRemote: true,
        tags: ['analytics', 'machine-learning', 'python'],
      },
      {
        id: 5,
        title: 'DevOps Engineer - Cloud Infrastructure',
        description:
          'We are seeking a DevOps engineer to set up and maintain our cloud infrastructure. The role involves AWS setup, CI/CD pipeline configuration, and monitoring systems.',
        client: 'StartupHub Inc.',
        location: 'Austin, TX',
        budget: { min: 4000, max: 8000, currency: 'USD' },
        duration: '2-3 months',
        postedDate: new Date('2024-01-05'),
        deadline: new Date('2024-04-05'),
        status: 'Open',
        requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
        experienceLevel: 'Intermediate',
        projectType: 'Fixed Price',
        applicationsCount: 9,
        category: 'DevOps',
        isUrgent: false,
        isRemote: true,
        tags: ['aws', 'devops', 'cloud'],
      },
    ];

    this.filteredProjects = [...this.projects];
    this.totalProjects = this.projects.length;
    this.isLoading = false;
  }

  onSearch(): void {
    const filters = this.searchForm.value;
    this.filteredProjects = this.projects.filter((project) => {
      return this.matchesFilters(project, filters);
    });
    this.totalProjects = this.filteredProjects.length;
  }

  private matchesFilters(project: Project, filters: any): boolean {
    if (
      filters.search &&
      !project.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !project.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    if (filters.category && project.category !== filters.category) {
      return false;
    }

    if (
      filters.location &&
      !project.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    if (
      filters.experienceLevel &&
      project.experienceLevel !== filters.experienceLevel
    ) {
      return false;
    }

    if (filters.projectType && project.projectType !== filters.projectType) {
      return false;
    }

    if (filters.budgetMin && project.budget.min < filters.budgetMin) {
      return false;
    }
    if (filters.budgetMax && project.budget.max > filters.budgetMax) {
      return false;
    }

    if (filters.isRemote && !project.isRemote) {
      return false;
    }

    if (filters.isUrgent && !project.isUrgent) {
      return false;
    }

    return true;
  }

  onResetFilters(): void {
    this.searchForm.reset();
    this.filteredProjects = [...this.projects];
    this.totalProjects = this.projects.length;
  }

  onProjectClick(project: Project): void {
    console.log('Project clicked:', project);
    // Navigate to project details
  }
}
