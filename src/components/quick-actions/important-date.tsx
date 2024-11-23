import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export function ImportantDate() {
  return (
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
  )
}
