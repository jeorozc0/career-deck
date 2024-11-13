import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FetchApplications, CreateApplication, DeleteApplication, UpdateApplication, FetchApplicationByID } from '@/lib/api/applications';
import { CreateApplicationDto, SimpleJobApplication } from '@/lib/types/application';
import { useToast } from './use-toast';

interface UseApplicationByIDProps {
  id?: string;
}
// Hook for fetching applications
export function useApplications() {
  return useQuery<SimpleJobApplication[]>({
    queryKey: ['applications'],
    queryFn: FetchApplications,
    initialData: []
  });
}

// Hook for fetching a single application by its ID
export function useApplicationByID({ id }: UseApplicationByIDProps) {
  const { toast } = useToast();

  return useQuery<SimpleJobApplication, Error>({
    queryKey: ['applications', id],
    queryFn: async () => {
      try {
        if (!id) {
          throw new Error('Application ID is required');
        }
        return await FetchApplicationByID(id);
      } catch (error) {
        // Log error for debugging
        console.error('Error fetching application:', error);

        // Show user-friendly error message
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error
            ? error.message
            : "Failed to fetch application details",
        });

        // Re-throw for React Query error handling
        throw error;
      }
    },
    enabled: Boolean(id),  // Only run if we have an ID
    retry: (failureCount, error) => {
      // Don't retry on 404s, but retry other errors up to 3 times
      if (error instanceof Error && error.message.includes('404')) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

// Hook for creating application
export function useCreateApplication() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateApplicationDto) => CreateApplication(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast({
        title: "Application Created",
        description: `Successfully created application for ${data.company}`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create application",
      });
    },
  });
}

export function useDeleteApplication() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => DeleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast({
        title: "Application deleted",
        description: "The application has been deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not delete application",
      });
    },
  });
}

export function useUpdateApplication() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: {
      id: string,
      data: Partial<SimpleJobApplication>
    }) => UpdateApplication(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast({
        title: "Application Created",
        description: `Successfully update application for ${data.company}`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update application",
      });
    },
  });
}
