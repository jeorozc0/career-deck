import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pen, Pencil, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useDeleteApplication, useUpdateApplication } from "@/hooks/useApplications"
import { ApplicationStatus } from "@/lib/types/application"
import { ResponsiveDialog } from "./ui/responsive-dialogue"
import { EditForm } from "./forms/edit-application-form"
import IconMenu from "./ui/icon-menu"
import DeleteForm from "./forms/delete-form"

interface QuickActionsMenuProps {
  application: any // Replace 'any' with your application type
}

export function QuickActionsMenu({ application }: QuickActionsMenuProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { mutate: updateStatus, isPending: updateLoading } = useUpdateApplication()

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    updateStatus({
      id: application.id,
      data: { status: newStatus }
    })
  }

  return (
    <>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Edit Person"
      >
        <EditForm application={application} setOpen={setIsEditOpen} />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete Person"
        description="Are you sure you want to delete this person?"
      >
        <DeleteForm applicationID={application.id} setIsOpen={setIsDeleteOpen} />
      </ResponsiveDialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="dropdown-trigger">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60 z-50">
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
          <DropdownMenuItem className="group flex w-full items-center justify-between text-left p-0 text-sm font-base ">
            <button
              onClick={() => {
                setIsEditOpen(true);
              }}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-accent "
            >
              <IconMenu
                text="Edit"
                icon={<Pen className="h-4 w-4" />}
              />
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className="group flex w-full items-center justify-between text-left p-0 text-sm font-base">
            <button
              onClick={() => {
                setIsDeleteOpen(true);
              }}
              className="w-full justify-start flex text-red-400 rounded-md p-2 transition-all duration-75 hover:text-red-500 hover:bg-accent"
            >
              <IconMenu
                text="Delete"
                icon={<Trash2 className="h-4 w-4" />}
              />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu >
    </>
  )
}
