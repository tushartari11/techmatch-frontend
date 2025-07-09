export interface FreelancerProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  profileImage?: string;
  location: string;
  hourlyRate: number;
  currency: string;
  availability: 'Available' | 'Busy' | 'Not Available';
  skills: Skill[];
  specializations: string[];
  experienceYears: number;
  languages: string[];
  bio: string;
  portfolio: PortfolioItem[];
  education: Education[];
  certifications: Certification[];
  rating: number;
  reviewsCount: number;
  completedProjects: number;
  description: string;
  isVerified: boolean;
  isOnline: boolean;
  joinedDate: Date;
  lastActive: Date;
  profileViews: number;
  responseTime: string;
  successRate: number;
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  technologies: string[];
}

export interface Skill {
  id?: number;
  name: string;
  experience?: number;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  year: number;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: Date;
}

export interface CreateFreelancerProfileDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  location: string;
  hourlyRate: number;
  currency: string;
  availability: string;
  skills: string[];
  experienceYears: number;
  languages: string[];
  bio: string;
}

export interface UpdateFreelancerProfileDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  title?: string;
  location?: string;
  hourlyRate?: number;
  currency?: string;
  availability?: string;
  skills?: string[];
  experienceYears?: number;
  languages?: string[];
  bio?: string;
}

export interface FreelancerProfileResponse {
  profile: FreelancerProfile;
  success: boolean;
  message: string;
}

export interface FreelancerSearchCriteria {
  skills?: string[];
  location?: string;
  hourlyRateMin?: number;
  hourlyRateMax?: number;
  experienceMin?: number;
  availability?: string;
  rating?: number;
  languages?: string[];
  category?: string;
}

export interface FreelancerSearchResult {
  profiles: FreelancerProfile[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
