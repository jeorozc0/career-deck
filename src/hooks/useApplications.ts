import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApplications, CreateApplication, deleteApplication } from '@/lib/api/applications';
import { CreateApplicationDto, SimpleJobApplication } from '@/lib/types/application';
import { useToast } from './use-toast';

// Hook for fetching applications
export function useApplications() {
  return useQuery<SimpleJobApplication[]>({
    queryKey: ['applications'],
    queryFn: fetchApplications,
    initialData: []
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
    mutationFn: (id: number) => deleteApplication(id),
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
