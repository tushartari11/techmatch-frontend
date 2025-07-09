export interface JobApplication {
  id?: string;
  projectId: string;
  firstName: string;
  lastName: string;
  email: string;
  coverLetter: string;
  cvFile?: File;
  cvFileName?: string;
  eligibleToWork: boolean;
  submittedAt?: Date;
  status?: ApplicationStatus;
}

export enum ApplicationStatus {
  SUBMITTED = 'Submitted',
  UNDER_REVIEW = 'Under Review',
  INTERVIEWED = 'Interviewed',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
}
