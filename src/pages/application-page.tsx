import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useParams } from 'react-router-dom';
import { useApplicationByID } from '@/hooks/useApplications';
import { formatSalaryRange } from "@/lib/utils";
import { FileX, Users2, ClipboardList, Calendar, Loader2 } from "lucide-react";

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

// Main ApplicationDetailPage component
const ApplicationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: application,
    isLoading,
    isError,
    error
  } = useApplicationByID({ id: id! });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !application) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold">Error loading application</h2>
        <p className="text-muted-foreground">{error?.message || 'Failed to load application details'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-2xl font-bold">
              {application.company.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{application.company}</h1>
            <p className="text-muted-foreground">{application.position}</p>
          </div>
        </div>
        <StatusBadge status={application.status} />
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Key Details */}
        <Card>
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

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            {application.nextSteps && application.nextSteps.length > 0 ? (
              <div className="space-y-2">
                {application.nextSteps.map((step) => (
                  <div key={step.id}>
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="text-muted-foreground">
                      {new Date(step.dueDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Calendar}
                message="No Upcoming Steps"
                description="Add next steps to track your application progress"
              />
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">
              Add Note
            </Button>
            <Button variant="outline" className="w-full">
              Add Step
            </Button>
            <Button variant="outline" className="w-full">
              Add Contact
            </Button>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            {application.timeline && application.timeline.length > 0 ? (
              <div className="space-y-6">
                {application.timeline.map((event) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
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
              </div>
            ) : (
              <EmptyState
                icon={ClipboardList}
                message="No Timeline Events"
                description="Timeline events will appear here as you progress"
              />
            )}
          </CardContent>
        </Card>

        {/* Contacts */}
        <Card className="md:row-span-2">
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent>
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

        {/* Notes */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
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
    </div>
  );
};

export default ApplicationDetailPage;
