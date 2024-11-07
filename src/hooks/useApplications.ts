import { APIResponseError, fetchApplications } from "@/lib/api/applications";
import { SimpleJobApplication } from "@/lib/types/application";
import { useQuery } from "@tanstack/react-query";

export function useApplications() {
  return useQuery<SimpleJobApplication[], APIResponseError>({
    queryKey: ['applications'],
    queryFn: fetchApplications,
    initialData: []
  });
}
