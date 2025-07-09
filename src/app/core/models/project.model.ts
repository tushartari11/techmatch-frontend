export interface Project {
  id: number;
  title: string;
  description: string;
  client: string;
  location: string;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  duration: string;
  postedDate: Date;
  deadline: Date;
  status: 'Open' | 'In Progress' | 'Completed' | 'Cancelled';
  requiredSkills: string[];
  experienceLevel: 'Entry' | 'Intermediate' | 'Expert';
  projectType: 'Fixed Price' | 'Hourly' | 'Milestone';
  applicationsCount: number;
  category: string;
  isUrgent: boolean;
  isRemote: boolean;
  tags: string[];
}

export interface ProjectSearchFilters {
  search?: string;
  category?: string;
  location?: string;
  experienceLevel?: string;
  projectType?: string;
  budgetMin?: number;
  budgetMax?: number;
  skills?: string[];
  isRemote?: boolean;
  isUrgent?: boolean;
}

export interface ProjectSearchResult {
  projects: Project[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export enum SortOption {
  POSTED_DATE = 'posted',
  DEADLINE = 'deadline',
  TITLE = 'title',
  COMPANY = 'company',
}

export interface PaginationParams {
  page: number;
  size: number;
}
