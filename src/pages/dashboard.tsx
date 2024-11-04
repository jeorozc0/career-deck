import HomeHeader from "@/components/home-header";
import JobCard from "@/components/job-card";
import { columns } from "@/components/job-columns";
import { DataTable } from "@/components/jobs-table";
import { SimpleJobApplication } from "@/lib/types/application";
import { useState } from "react";


export default function Dashboard() {
  const [view, setView] = useState('table');

  const applications: SimpleJobApplication[] = [
    {
      id: 1,
      company: "Tech Corp",
      position: "Senior Developer",
      status: "Applied", // Now this must be one of the defined status types
      nextAction: "Follow-up email",
      lastUpdated: "2024-03-15",
    },
    {
      id: 2,
      company: "Startup Inc",
      position: "Full Stack Engineer",
      status: "Interviewing",
      nextAction: "Technical Interview",
      lastUpdated: "2024-03-14",
    },
  ]
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
