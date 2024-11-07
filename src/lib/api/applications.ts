import { SimpleJobApplication } from "../types/application";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export class APIResponseError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIResponseError';
  }
}

export async function fetchApplications(): Promise<SimpleJobApplication[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/applications`);

    if (!response.ok) {
      throw new APIResponseError(
        response.status,
        `Failed to fetch applications: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIResponseError) {
      throw error;
    }
    throw new APIResponseError(500, 'Failed to fetch applications');
  }
}
