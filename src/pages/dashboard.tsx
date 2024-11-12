import HomeHeader from "@/components/home-header";
import JobCard from "@/components/job-card";
import { useApplications } from "@/hooks/useApplications";


export default function Dashboard() {
  const { data: applications, isLoading, error } = useApplications();

  return (
    <div className="flex flex-col p-20 w-screen min-h-screen bg-[##FBFBF3] dark:bg-[#161616]">
      <HomeHeader />
      <JobCard applications={applications} />

    </div>
  )
}
