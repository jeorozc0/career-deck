import { FolderPlus } from "lucide-react"
import { ApplicationCard } from "@/components/application-card"
import HomeHeader from "@/components/home-header"
import { useApplications } from "@/hooks/useApplications"
import { ApplicationCardSkeleton } from "@/components/application-card-skeleton";

export default function ApplicationDashboard() {
  const { data: applications, isLoading, error } = useApplications();

  if (!applications?.length) {
    return (
      <div className="flex flex-col p-8 w-screen min-h-screen bg-background">
        <HomeHeader />
        <div className="grid place-items-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="p-4 rounded-full bg-gray-100 inline-block">
              <FolderPlus className="h-8 w-8 text-gray-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">No applications found</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Track your job search by creating your first application
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <ApplicationCardSkeleton />
    )
  }

  return (
    <div className="flex flex-col p-8 w-screen min-h-screen bg-background">
      <HomeHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications?.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
          />
        ))}
      </div>
    </div>
  );
}
