import { SimpleJobApplication } from "@/lib/types/application"
import { dateUtils } from "@/lib/utils/date-format"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { FolderPlus, MoreHorizontal, Pencil } from "lucide-react"
import { useDeleteApplication } from "@/hooks/useApplications"
import { DeleteAlert } from "./application-dialogue"
import { useNavigate } from "react-router-dom"

interface JobCardProps {
  applications: SimpleJobApplication[]
}

function JobCard({ applications }: JobCardProps) {
  const { mutate: deleteApplication, isPending } = useDeleteApplication();
  const navigate = useNavigate();

  if (!applications?.length) {
    return (
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
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {applications?.map((app: SimpleJobApplication) => (
        <div
          key={app.id}
          className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer p-4"
          onClick={() => navigate(`/application/${app.id}`)}
        >
          <div className="border-b border-gray-200 pb-4">
            <div className="flex justify-between items-center">
              <h3 className="dark:text-black font-semibold">{app.company}</h3>
              <div className="flex gap-2">
                <span className={`text-sm px-2 py-1 rounded ${app.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                  }`}>
                  {app.status}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DeleteAlert
                      onDelete={() => deleteApplication(app.id)}
                      isDeleting={isPending}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <p className="text-gray-600">{app.position}</p>
            <p className="text-sm text-gray-500">Next: {app.nextAction}</p>
            <p className="text-sm text-gray-500">Updated: {dateUtils.relative(app.lastUpdated)}</p>
          </div>
        </div>
      ))
      }
    </div >
  )
}

export default JobCard
