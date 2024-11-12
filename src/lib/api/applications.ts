import { CreateApplicationDto, SimpleJobApplication } from "../types/application";

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

export async function CreateApplication(data: CreateApplicationDto): Promise<SimpleJobApplication> {
  try {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new APIResponseError(
        response.status,
        'Failed to create application'
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof APIResponseError) {
      throw error;
    }
    throw new APIResponseError(500, 'Failed to create application');
  }
}

export async function deleteApplication(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = 'Failed to delete application';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = response.statusText || errorMessage;
      }

      throw new APIResponseError(
        response.status,
        errorMessage
      );
    }
  } catch (error) {
    if (error instanceof APIResponseError) {
      throw error;
    }
    throw new APIResponseError(
      500,
      error instanceof Error ? error.message : 'An unexpected error occurred'
    );
  }
}
