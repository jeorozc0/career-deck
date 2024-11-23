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
  location: string
  position: string
  next_action: string
  status: ApplicationStatus
  salaryMin: number
  salaryMax: number
  lastUpdated: string
  createdAt?: string
}

type Step = {
  id: string;
  title: string;
  description: string;
  dueDate: string;      // Changed from Date to string
  completed: boolean;
  createdAt: string;    // Changed from Date to string
}

type Event = {
  id: string;
  title: string;
  description: string;
  eventDate: string;    // Changed from Date to string
  createdAt: string;    // Changed from Date to string
}

type Contact = {
  id: string;
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  createdAt: string;    // Changed from Date to string
}

type Note = {
  id: string;
  content: string;
  createdAt: string;    // Changed from Date to string
}

export type CompleteApplication = {
  id: string;
  company: string;
  location: string;
  position: string;
  status: string;
  salaryMin?: number;
  salaryMax?: number;
  nextSteps: Step[] | null;    // Added null as possible type
  timeline: Event[] | null;     // Added null as possible type
  contacts: Contact[] | null;   // Added null as possible type
  notes: Note[] | null;         // Added null as possible type
  createdAt: string;           // Changed from Date to string
  lastUpdated: string;         // Changed from Date to string
}

export type CreateApplicationDto = {
  company: string;
  position: string;
  location: string;
  status: string;
  salaryMin: number;
  salaryMax: number
};
