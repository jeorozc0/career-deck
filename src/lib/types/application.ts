export type ApplicationStatus =
  | "Saved"
  | "Applied"
  | "Interviewing"
  | "Offer"
  | "Rejected"
  | "Accepted"

export interface SimpleJobApplication {
  id: number
  company: string
  position: string
  status: ApplicationStatus
  nextAction: string
  lastUpdated: string
}
