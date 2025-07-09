import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { JobApplication } from '../models/application.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private readonly baseUrl = `${environment.apiUrl}/applications`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Submit job application
   * Calls Spring Boot microservice: POST /api/applications
   */
  submitApplication(application: JobApplication): Observable<JobApplication> {
    const formData = new FormData();

    // Append form fields
    formData.append('projectId', application.projectId);
    formData.append('firstName', application.firstName);
    formData.append('lastName', application.lastName);
    formData.append('email', application.email);
    formData.append('coverLetter', application.coverLetter);
    formData.append('eligibleToWork', application.eligibleToWork.toString());

    // Append CV file if exists
    if (application.cvFile) {
      formData.append('cvFile', application.cvFile, application.cvFile.name);
    }

    return this.http
      .post<ApiResponse<JobApplication>>(this.baseUrl, formData)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error submitting application:', error);
          throw error;
        })
      );
  }

  /**
   * Get applications by project ID
   * Calls Spring Boot microservice: GET /api/applications/project/{projectId}
   */
  getApplicationsByProject(projectId: string): Observable<JobApplication[]> {
    return this.http
      .get<ApiResponse<JobApplication[]>>(
        `${this.baseUrl}/project/${projectId}`
      )
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error fetching applications:', error);
          throw error;
        })
      );
  }

  /**
   * Get application by ID
   * Calls Spring Boot microservice: GET /api/applications/{id}
   */
  getApplicationById(id: string): Observable<JobApplication> {
    return this.http
      .get<ApiResponse<JobApplication>>(`${this.baseUrl}/${id}`)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error fetching application:', error);
          throw error;
        })
      );
  }
}
