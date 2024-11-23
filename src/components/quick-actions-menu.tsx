import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useDeleteApplication, useUpdateApplication } from "@/hooks/useApplications"
import { ApplicationStatus } from "@/lib/types/application"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { ScheduleInterview } from "./quick-actions/schedule-interview"
import { AddContact } from "./quick-actions/add-contact"
import { ImportantDate } from "./quick-actions/important-date"
import { QuickLink } from "./quick-actions/quick-link"
import { EditApplication } from "./application-edit-dialogue"
import { DeleteAlert } from "./application-dialogue"

interface QuickActionsMenuProps {
  application: any // Replace 'any' with your application type
}

export function QuickActionsMenu({ application }: QuickActionsMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { mutate: updateStatus, isPending: updateLoading } = useUpdateApplication()
  const { mutate: deleteApplication, isPending } = useDeleteApplication()

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    updateStatus({
      id: application.id,
      data: { status: newStatus }
    })
    setIsMenuOpen(false)
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="dropdown-trigger">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>

        {/* Status Update */}
        <DropdownMenuItem className="p-2">
          <Select onValueChange={handleStatusChange} disabled={updateLoading}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Interviewing">Interviewing</SelectItem>
              <SelectItem value="Offer">Offer</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Accepted">Accepted</SelectItem>
            </SelectContent>
          </Select>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <ScheduleInterview />
        <AddContact />
        <ImportantDate />
        <QuickLink />

        <DropdownMenuSeparator />

        <EditApplication application={application} />
        <DeleteAlert
          onDelete={() => deleteApplication(application.id)}
          isDeleting={isPending}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
