import { CompleteApplication, CreateApplicationDto, CreateEventPayload, CreateStepPayload, Event, SimpleJobApplication, Step } from "../types/application";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export class APIResponseError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIResponseError';
  }
}

export async function FetchApplications(): Promise<SimpleJobApplication[]> {
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

export async function FetchApplicationByID(id: string): Promise<CompleteApplication> {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`);

    if (!response.ok) {
      throw new APIResponseError(
        response.status,
        `Failed to fetch application: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    if (error instanceof APIResponseError) {
      throw error;
    }
    throw new APIResponseError(500, 'Failed to fetch application');
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

export async function DeleteApplication(id: string): Promise<void> {
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

export async function UpdateApplication(id: string, data: Partial<SimpleJobApplication>): Promise<SimpleJobApplication> {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new APIResponseError(
        response.status,
        'Failed to update application'
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof APIResponseError) {
      throw error;
    }
    throw new APIResponseError(500, 'Failed to update application');
  }
}

export async function CreateEvent({ id, data }: {
  id: string,
  data: CreateEventPayload
}): Promise<Event> {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/${id}/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      // Print response details
      console.error('Error Status:', response.status);
      console.error('Error Text:', await response.text());
      throw new APIResponseError(
        response.status,
        'Failed to create event'
      );
    }

    return response.json();
  } catch (error) {
    // Print error details
    console.error('Create Event Error:', error);
    if (error instanceof APIResponseError) {
      throw error;
    }
    throw new APIResponseError(500, 'Failed to create event');
  }
}

export async function CreateStep({ id, data }: {
  id: string,
  data: CreateStepPayload
}): Promise<Event> {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/${id}/step`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      // Print response details
      console.error('Error Status:', response.status);
      console.error('Error Text:', await response.text());
      throw new APIResponseError(
        response.status,
        'Failed to create step'
      );
    }

    return response.json();
  } catch (error) {
    // Print error details
    console.error('Create Event Error:', error);
    if (error instanceof APIResponseError) {
      throw error;
    }
    throw new APIResponseError(500, 'Failed to create event');
  }
}

export async function UpdateStep(id: string, data: Partial<Step>): Promise<Step> {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/steps/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new APIResponseError(
        response.status,
        'Failed to update step'
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof APIResponseError) {
      throw error;
    }
    throw new APIResponseError(500, 'Failed to update step');
  }
}
