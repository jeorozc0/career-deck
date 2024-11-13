export type ApplicationStatus =
  | "Saved"
  | "Applied"
  | "Interviewing"
  | "Offer"
  | "Rejected"
  | "Accepted"

export interface SimpleJobApplication {
  id: string
  company: string
  position: string
  status: ApplicationStatus
  nextAction: string
  lastUpdated: string
  createdAt?: string
}

export type CreateApplicationDto = {
  company: string;
  position: string;
  status: string;
  nextAction?: string;
};
