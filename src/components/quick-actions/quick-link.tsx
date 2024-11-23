import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LinkIcon } from "lucide-react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export function QuickLink() {
  return (
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
  )
}
