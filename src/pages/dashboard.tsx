import HomeHeader from "@/components/home-header";
import JobCard from "@/components/job-card";
import { columns } from "@/components/job-columns";
import { DataTable } from "@/components/jobs-table";
import { useApplications } from "@/hooks/useApplications";
import { useState } from "react";


export default function Dashboard() {
  const [view, setView] = useState('table');
  const { data: applications, isLoading, error } = useApplications();

  return (
    <div className="flex flex-col p-20 w-screen min-h-screen bg-black">
      <HomeHeader view={view} setView={setView} />
      {view == 'table' && (<DataTable columns={columns} data={applications} />
      )}
      {view == 'card' && (<JobCard applications={applications} />
      )}
    </div>
  )
}
