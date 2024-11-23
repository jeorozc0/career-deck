import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, BadgeDollarSign, Briefcase, Pencil } from "lucide-react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { useUpdateApplication } from "@/hooks/useApplications"
import { SimpleJobApplication } from "@/lib/types/application"
import { DropdownMenuItem } from "./ui/dropdown-menu"

const applicationSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  status: z.enum(["Saved", "Applied", "Interviewing", "Offer", "Rejected", "Accepted"], {
    required_error: "Please select a status",
  }),
  location: z.string().min(1, "Location is required"),
  salaryMin: z.number()
    .nonnegative("Salary cannot be negative")
    .transform(val => isNaN(val) ? 0 : val)
    .default(0),
  salaryMax: z.number()
    .nonnegative("Salary cannot be negative")
    .transform(val => isNaN(val) ? 0 : val)
    .default(0),
}).refine((data) => {
  if (data.salaryMin === 0 && data.salaryMax === 0) return true;
  if (data.salaryMax > 0 && data.salaryMin === 0) return true;
  return data.salaryMax >= data.salaryMin;
}, {
  message: "Maximum salary must be greater than minimum salary",
  path: ["salaryMax"],
});

type ApplicationFormValues = z.infer<typeof applicationSchema>

const statusOptions = [
  { value: "Saved", label: "💾 Saved" },
  { value: "Applied", label: "📤 Applied" },
  { value: "Interviewing", label: "🗣 Interviewing" },
  { value: "Offer", label: "🎉 Offer" },
  { value: "Accepted", label: "✅ Accepted" },
  { value: "Rejected", label: "❌ Rejected" },
];

interface EditApplicationProps {
  application: SimpleJobApplication;
}

export function EditApplication({ application }: EditApplicationProps) {
  const mutation = useUpdateApplication();
  const [open, setOpen] = useState(false);
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      company: application.company,
      position: application.position,
      location: application.location,
      status: application.status,
      salaryMin: application.salaryMin,
      salaryMax: application.salaryMax,
    },
  });

  function onSubmit(data: ApplicationFormValues) {
    mutation.mutate({
      id: application.id,
      data: data
    }, {
      onSuccess: () => {
        setOpen(false);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Application</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Details
              </h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. TechCorp Inc" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          Location
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. San Francisco, CA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1 h-4">Application Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {statusOptions.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Position Details
              </h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Senior Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BadgeDollarSign className="h-5 w-5" />
                    <h4 className="font-medium">Salary Range</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="salaryMin"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>Minimum</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g. 80000"
                              {...field}
                              value={value === 0 ? "" : value}
                              onFocus={(e) => {
                                if (value === 0) {
                                  e.target.value = "";
                                }
                              }}
                              onChange={(e) => {
                                const value = e.target.value === "" ? 0 : Number(e.target.value);
                                onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="salaryMax"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>Maximum</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g. 120000"
                              {...field}
                              value={value === 0 ? "" : value}
                              onFocus={(e) => {
                                if (value === 0) {
                                  e.target.value = "";
                                }
                              }}
                              onChange={(e) => {
                                const value = e.target.value === "" ? 0 : Number(e.target.value);
                                onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
