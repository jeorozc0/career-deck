import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import {
  MoreHorizontal,
  Calendar,
  LinkIcon,
  FileText,
  Mail,
  AlertCircle,
} from "lucide-react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DeleteAlert } from "./application-dialogue"
import { useDeleteApplication, useUpdateApplication } from "@/hooks/useApplications"
import { ApplicationStatus } from "@/lib/types/application"
import { useState } from "react"

export function QuickActionsMenu({ application }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mutate: updateStatus, isPending: updateLoading } = useUpdateApplication()
  const { mutate: deleteApplication, isPending } = useDeleteApplication();

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    updateStatus({
      id: application.id,
      data: { status: newStatus }
    });
    setIsMenuOpen(false);
  };


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
        <DropdownMenuItem className="p-2 ">
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

        {/* Quick Note */}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <FileText className="mr-2 h-4 w-4" />
              Add Quick Note
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Note</DialogTitle>
              <DialogDescription>
                Add a quick note about this application
              </DialogDescription>
            </DialogHeader>
            <Textarea placeholder="Enter your note..." />
            <DialogFooter>
              <Button>Save Note</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Schedule Interview */}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Interview
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date & Time</label>
                <Input type="datetime-local" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone Screen</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="onsite">Onsite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button>Save Interview</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Contact */}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Mail className="mr-2 h-4 w-4" />
              Add Contact
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Contact</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Name" />
              <Input placeholder="Email" type="email" />
              <Input placeholder="Role" />
              <Input placeholder="Phone" type="tel" />
            </div>
            <DialogFooter>
              <Button>Save Contact</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Important Date */}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <AlertCircle className="mr-2 h-4 w-4" />
              Add Important Date
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Important Date</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input type="date" />
              <Input placeholder="Description" />
            </div>
            <DialogFooter>
              <Button>Save Date</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Quick Links */}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <LinkIcon className="mr-2 h-4 w-4" />
              Add Quick Link
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Title (e.g., Job Description)" />
              <Input placeholder="URL" type="url" />
            </div>
            <DialogFooter>
              <Button>Save Link</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DropdownMenuSeparator />

        {/* View Application */}
        <DeleteAlert onDelete={() => deleteApplication(application.id)} isDeleting={isPending} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
