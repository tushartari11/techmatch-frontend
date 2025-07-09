import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  Project,
  ProjectSearchFilters,
  ProjectSearchResult,
} from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api/projects';
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  public projects$ = this.projectsSubject.asObservable();

  constructor(private http: HttpClient) {}

  searchProjects(
    filters: ProjectSearchFilters,
    page: number = 1,
    limit: number = 10
  ): Observable<ProjectSearchResult> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());

    if (filters.search) params = params.set('search', filters.search);
    if (filters.category) params = params.set('category', filters.category);
    if (filters.location) params = params.set('location', filters.location);
    if (filters.experienceLevel)
      params = params.set('experienceLevel', filters.experienceLevel);
    if (filters.projectType)
      params = params.set('projectType', filters.projectType);
    if (filters.budgetMin)
      params = params.set('budgetMin', filters.budgetMin.toString());
    if (filters.budgetMax)
      params = params.set('budgetMax', filters.budgetMax.toString());
    if (filters.skills && filters.skills.length > 0)
      params = params.set('skills', filters.skills.join(','));
    if (filters.isRemote !== undefined)
      params = params.set('isRemote', filters.isRemote.toString());
    if (filters.isUrgent !== undefined)
      params = params.set('isUrgent', filters.isUrgent.toString());

    return this.http.get<ProjectSearchResult>(`${this.apiUrl}/search`, {
      params,
    });
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  // Mock data for development
  getMockProjects(): Project[] {
    return [
      {
        id: 1,
        title: 'Website development - ecommerce - budget: limited',
        description:
          'We are looking for a skilled web developer to create an ecommerce website with modern design and secure payment integration.',
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
          'Looking for experienced mobile developers to create a cross-platform mobile application for food delivery service.',
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
      // Add more mock projects as needed
    ];
  }
}
