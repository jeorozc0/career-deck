import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  eventDate: z.date({
    required_error: "Date is required",
  })
});

type EventFormValues = z.infer<typeof eventSchema>

export function ScheduleInterview() {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema)
  });

  const onSubmit = (data: EventFormValues) => {
    console.log("Form submitted:", {
      ...data,
      eventDate: format(data.eventDate, "yyyy-MM-dd'T'HH:mm:ssXXX"),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          Schedule Interview
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input {...form.register("title")} />
              {form.formState.errors.title && (
                <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea {...form.register("description")} />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.watch("eventDate") && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch("eventDate") ? (
                      format(form.watch("eventDate"), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.watch("eventDate")}
                    onSelect={(date: Date | undefined) => date && form.setValue("eventDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.eventDate && (
                <p className="text-sm text-red-500">{form.formState.errors.eventDate.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Schedule Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
