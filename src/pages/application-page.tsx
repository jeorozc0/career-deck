import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from 'react-router-dom';
import { useApplicationByID, useUpdateStep } from '@/hooks/useApplications';
import { cn, formatSalaryRange } from "@/lib/utils";
import { FileX, Users2, ClipboardList, Calendar, Loader2, ArrowLeft, Check } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScheduleInterview } from "@/components/quick-actions/schedule-interview";
import { NextSteps } from "@/components/next-steps";
import { AddStep } from "@/components/quick-actions/add-step";

// Reusable empty state component
function EmptyState({
  icon: Icon,
  message,
  description
}: {
  icon: React.ElementType;
  message: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center space-y-3">
      <Icon className="h-12 w-12 text-muted-foreground/50" />
      <div>
        <p className="text-lg font-medium text-muted-foreground">{message}</p>
        {description && (
          <p className="text-sm text-muted-foreground/75">{description}</p>
        )}
      </div>
    </div>
  );
}

// Status Badge component
function StatusBadge({ status }: { status: string }) {
  const colors = {
    Applied: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    Interviewing: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    Offer: 'bg-green-100 text-green-800 hover:bg-green-100',
    Rejected: 'bg-red-100 text-red-800 hover:bg-red-100',
    Accepted: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
    Saved: 'bg-gray-100 text-gray-800 hover:bg-gray-100'
  };

  return (
    <Badge
      variant="outline"
      className={`px-4 py-2 rounded-full text-sm font-medium border-0 ${colors[status] || colors.Saved}`}
    >
      {status}
    </Badge>
  );
}

const ApplicationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: application,
    isLoading,
    isError,
    error
  } = useApplicationByID({ id: id! });
  const { mutate: UpdateStep } = useUpdateStep()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !application) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold">Error loading application</h2>
        <p className="text-muted-foreground">{error?.message || 'Failed to load application details'}</p>
      </div>
    );
  }

  function onToggle(id: string, currentCompleted: boolean) {
    UpdateStep({
      id: id,
      data: { completed: !currentCompleted }
    })
  }

  return (
    <div className="h-screen w-full bg-background flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant={"ghost"}><ArrowLeft /></Button>
          </Link>
          <Avatar className="h-12 w-12">
            <AvatarFallback className="text-xl font-bold">
              {application.company.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{application.company}</h1>
            <p className="text-muted-foreground">{application.position}</p>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <ThemeToggle />
          <StatusBadge status={application.status} />
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 p-6 min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          {/* Left Column */}
          <div className="grid grid-rows-3 gap-4 md:col-span-2 h-full min-h-0">
            <div className="row-span-2 grid grid-rows-5 justify-between gap-4 ">            {/* Key Details */}
              <Card className="h-auto row-span-2 col-span-2">
                <CardHeader>
                  <CardTitle>Key Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Applied</span>
                    <span>{new Date(application.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span>{application.location}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salary Range</span>
                    <span>{formatSalaryRange(application.salaryMin, application.salaryMax)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="flex flex-col h-full row-span-3 col-span-2"> {/* Change to h-full */}
                <CardHeader>
                  <div className="flex flex-row justify-between">
                    <CardTitle className="leading-relaxed"> Timeline</CardTitle>
                    <ScheduleInterview id={application.id} />
                  </div>
                </CardHeader>
                <CardContent className="" > {/* Change to overflow-y-auto and flex-1 */}
                  {application.timeline && application.timeline.length > 0 ? (
                    <ScrollArea type="scroll" className="h-[200px]">
                      {application.timeline.map((event) => (
                        <div key={event.id} className="flex gap-4">
                          <div className="w-2 h-2 mt-2 rounded-full bg-primary" /> {/* Add flex-shrink-0 */}
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(event.eventDate).toLocaleDateString()}
                            </p>
                            {event.description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {event.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  ) : (
                    <EmptyState
                      icon={ClipboardList}
                      message="No Timeline Events"
                      description="Timeline events will appear here as you progress"
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Notes */}
            <Card className="flex flex-col row-span-1">
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                {application.notes && application.notes.length > 0 ? (
                  <div className="space-y-4">
                    {application.notes.map((note) => (
                      <Card key={note.id}>
                        <CardContent className="p-4">
                          <p className="text-sm">{note.content}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(note.createdAt).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={FileX}
                    message="No Notes"
                    description="Add notes to keep track of important information"
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="grid grid-rows-3 gap-4 h-full min-h-0">
            {/* Next Steps */}
            <Card className="flex flex-col min-h-0 row-span-2">
              <CardHeader>
                <div className="flex flex-row justify-between">
                  <CardTitle className="leading-relaxed">Next Steps</CardTitle>
                  <AddStep id={application.id} />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                {application.nextSteps && application.nextSteps.length > 0 ? (
                  <ul className="space-y-2">
                    {application.nextSteps.map((step) => (
                      <li key={step.id}>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            step.completed && "text-muted-foreground line-through"
                          )}
                          onClick={() => onToggle(step.id, step.completed)}
                        >
                          <div className={cn(
                            "mr-2 h-4 w-4 rounded-sm border border-primary",
                            step.completed && "bg-primary text-primary-foreground"
                          )}>
                            {step.completed && <Check className="h-3 w-3" />}
                          </div>
                          {step.title}
                        </Button>
                      </li>
                    ))}
                  </ul>

                ) : (
                  <div className="w-full h-full flex justify-center">
                    <EmptyState
                      icon={Calendar}
                      message="No Upcoming Steps"
                      description="Add next steps to track your application progress"
                    />

                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contacts */}
            <Card className="flex flex-col min-h-0">
              <CardHeader>
                <CardTitle>Contacts</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                {application.contacts && application.contacts.length > 0 ? (
                  <div className="space-y-4">
                    {application.contacts.map((contact) => (
                      <Card key={contact.id}>
                        <CardContent className="p-4">
                          <p className="font-medium">{contact.name}</p>
                          {contact.role && (
                            <p className="text-sm text-muted-foreground">{contact.role}</p>
                          )}
                          {contact.email && (
                            <p className="text-sm text-muted-foreground">{contact.email}</p>
                          )}
                          {contact.phone && (
                            <p className="text-sm text-muted-foreground">{contact.phone}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={Users2}
                    message="No Contacts Added"
                    description="Add contacts to keep track of your interactions"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div >
    </div >
  );
};

export default ApplicationDetailPage;
