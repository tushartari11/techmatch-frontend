import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import {
  FreelancerProfile,
  CreateFreelancerProfileDto,
  UpdateFreelancerProfileDto,
  FreelancerProfileResponse,
  FreelancerSearchCriteria,
  FreelancerSearchResult,
} from "../models/freelancer-profile.model";

@Injectable({
  providedIn: "root",
})
export class FreelancerProfileService {
  private apiUrl = "http://localhost:8080/api/employees/";
  private profileSubject = new BehaviorSubject<FreelancerProfile | null>(null);
  public profile$ = this.profileSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
  }

  private getMultipartHttpOptions() {
    return {
      headers: new HttpHeaders({
        Accept: "application/json",
        // Don't set Content-Type for multipart/form-data, let the browser set it
      }),
    };
  }

  /**
   * Create a new freelancer profile
   */
  createProfile(profile: FreelancerProfile): Observable<FreelancerProfile> {
    return this.http
      .post<FreelancerProfile>(this.apiUrl, profile, this.getHttpOptions())
      .pipe(
        tap((response) => {
          console.log("Profile created:", response);
          this.setCurrentProfile(response);
        }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Update an existing freelancer profile
   */
  updateProfile(
    id: number,
    profile: UpdateFreelancerProfileDto
  ): Observable<FreelancerProfile> {
    return this.http
      .put<FreelancerProfile>(
        `${this.apiUrl}/${id}`,
        profile,
        this.getHttpOptions()
      )
      .pipe(
        tap((response) => {
          console.log("Profile updated:", response);
          this.setCurrentProfile(response);
        }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Get a freelancer profile by ID
   */
  getProfile(id: number): Observable<FreelancerProfile> {
    return this.http.get<FreelancerProfile>(`${this.apiUrl}/${id}`).pipe(
      tap((response) => {
        console.log("Profile retrieved:", response);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Get all freelancer profiles
   */
  getAllProfiles(): Observable<FreelancerProfile[]> {
    return this.http.get<FreelancerProfile[]>(this.apiUrl).pipe(
      tap((response) => {
        console.log("All profiles retrieved:", response);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Search freelancer profiles with criteria
   */
  searchProfiles(
    criteria: FreelancerSearchCriteria,
    page: number = 1,
    limit: number = 10
  ): Observable<FreelancerSearchResult> {
    let params = new HttpParams();
    params = params.set("page", page.toString());
    params = params.set("limit", limit.toString());

    if (criteria.skills && criteria.skills.length > 0) {
      params = params.set("skills", criteria.skills.join(","));
    }
    if (criteria.location) {
      params = params.set("location", criteria.location);
    }
    if (criteria.hourlyRateMin !== undefined) {
      params = params.set("hourlyRateMin", criteria.hourlyRateMin.toString());
    }
    if (criteria.hourlyRateMax !== undefined) {
      params = params.set("hourlyRateMax", criteria.hourlyRateMax.toString());
    }
    if (criteria.experienceMin !== undefined) {
      params = params.set("experienceMin", criteria.experienceMin.toString());
    }
    if (criteria.availability) {
      params = params.set("availability", criteria.availability);
    }
    if (criteria.rating !== undefined) {
      params = params.set("rating", criteria.rating.toString());
    }
    if (criteria.languages && criteria.languages.length > 0) {
      params = params.set("languages", criteria.languages.join(","));
    }
    if (criteria.category) {
      params = params.set("category", criteria.category);
    }

    return this.http
      .get<FreelancerSearchResult>(`${this.apiUrl}/search`, { params })
      .pipe(
        tap((response) => {
          console.log("Search results:", response);
        }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Delete a freelancer profile
   */
  deleteProfile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        console.log("Profile deleted:", id);
        if (this.profileSubject.value?.id === id) {
          this.profileSubject.next(null);
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Upload resume file
   */
  uploadResume(file: File): Observable<string> {
    const formData = new FormData();
    formData.append("file", file);

    return this.http
      .post<{ url: string }>(
        `${this.apiUrl}/upload-resume`,
        formData,
        this.getMultipartHttpOptions()
      )
      .pipe(
        map((response) => response.url), // Use map instead of switchMap
        tap((url) => {
          console.log("Resume uploaded:", url);
        }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Upload profile image
   */
  uploadProfileImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append("file", file);

    return this.http
      .post<{ url: string }>(
        `${this.apiUrl}/upload-image`,
        formData,
        this.getMultipartHttpOptions()
      )
      .pipe(
        map((response) => response.url), // Use map instead of switchMap
        tap((url) => {
          console.log("Profile image uploaded:", url);
        }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Get profiles by skill
   */
  getProfilesBySkill(skill: string): Observable<FreelancerProfile[]> {
    return this.http
      .get<FreelancerProfile[]>(
        `${this.apiUrl}/skill/${encodeURIComponent(skill)}`
      )
      .pipe(
        tap((response) => {
          console.log(`Profiles with skill ${skill}:`, response);
        }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Get profiles by location
   */
  getProfilesByLocation(location: string): Observable<FreelancerProfile[]> {
    return this.http
      .get<FreelancerProfile[]>(
        `${this.apiUrl}/location/${encodeURIComponent(location)}`
      )
      .pipe(
        tap((response) => {
          console.log(`Profiles in ${location}:`, response);
        }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Activate/Deactivate profile
   */
  toggleProfileStatus(
    id: number,
    isActive: boolean
  ): Observable<FreelancerProfile> {
    return this.http
      .patch<FreelancerProfile>(
        `${this.apiUrl}/${id}/status`,
        { isActive },
        this.getHttpOptions()
      )
      .pipe(
        tap((response) => {
          console.log("Profile status updated:", response);
          if (this.profileSubject.value?.id === id) {
            this.setCurrentProfile(response);
          }
        }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Set current profile in the subject
   */
  setCurrentProfile(profile: FreelancerProfile): void {
    this.profileSubject.next(profile);
  }

  /**
   * Get current profile from the subject
   */
  getCurrentProfile(): FreelancerProfile | null {
    return this.profileSubject.value;
  }

  /**
   * Clear current profile
   */
  clearCurrentProfile(): void {
    this.profileSubject.next(null);
  }

  /**
   * Check if username is available
   */
  checkUsernameAvailability(
    username: string
  ): Observable<{ available: boolean }> {
    return this.http
      .get<{ available: boolean }>(
        `${this.apiUrl}/check-username/${encodeURIComponent(username)}`
      )
      .pipe(
        tap((response) => {
          console.log(`Username ${username} availability:`, response.available);
        }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Check if email is available
   */
  checkEmailAvailability(email: string): Observable<{ available: boolean }> {
    return this.http
      .get<{ available: boolean }>(
        `${this.apiUrl}/check-email/${encodeURIComponent(email)}`
      )
      .pipe(
        tap((response) => {
          console.log(`Email ${email} availability:`, response.available);
        }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Get profile statistics
   */
  getProfileStats(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/stats`).pipe(
      tap((response) => {
        console.log("Profile stats:", response);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Update profile availability
   */
  updateAvailability(
    id: number,
    availability: string
  ): Observable<FreelancerProfile> {
    return this.http
      .patch<FreelancerProfile>(
        `${this.apiUrl}/${id}/availability`,
        { availability },
        this.getHttpOptions()
      )
      .pipe(
        tap((response) => {
          console.log("Availability updated:", response);
          if (this.profileSubject.value?.id === id) {
            this.setCurrentProfile(response);
          }
        }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Get featured profiles
   */
  getFeaturedProfiles(limit: number = 10): Observable<FreelancerProfile[]> {
    const params = new HttpParams().set("limit", limit.toString());

    return this.http
      .get<FreelancerProfile[]>(`${this.apiUrl}/featured`, { params })
      .pipe(
        tap((response) => {
          console.log("Featured profiles:", response);
        }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Get recently active profiles
   */
  getRecentlyActiveProfiles(
    limit: number = 10
  ): Observable<FreelancerProfile[]> {
    const params = new HttpParams().set("limit", limit.toString());

    return this.http
      .get<FreelancerProfile[]>(`${this.apiUrl}/recent`, { params })
      .pipe(
        tap((response) => {
          console.log("Recently active profiles:", response);
        }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Generate mock data for development
   */
  getMockFreelancers(): Observable<FreelancerProfile[]> {
    const freelancersData = [] as FreelancerProfile[];

    this.http
      .get<FreelancerProfile[]>(`${this.apiUrl}/mock`)
      .pipe(
        tap((data) => {
          console.log(" freelancers data:", data);
          freelancersData.push(...data);
        }),
        catchError(this.handleError.bind(this))
      )
      .subscribe();

    return new Observable((observer) => {
      observer.next(freelancersData);
      observer.complete();
    });
  }

  /**
   * Error handler
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "An unknown error occurred";

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = "Bad Request: Please check your input data";
          break;
        case 401:
          errorMessage = "Unauthorized: Please log in again";
          break;
        case 403:
          errorMessage =
            "Forbidden: You do not have permission to perform this action";
          break;
        case 404:
          errorMessage = "Not Found: The requested resource was not found";
          break;
        case 409:
          errorMessage = "Conflict: The resource already exists";
          break;
        case 422:
          errorMessage = "Validation Error: Please check your input data";
          break;
        case 500:
          errorMessage = "Internal Server Error: Please try again later";
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }

    console.error("FreelancerProfileService Error:", errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
