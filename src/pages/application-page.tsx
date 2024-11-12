import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Mock data stays the same
const timelineItems = [
  {
    title: "Technical Interview Scheduled",
    date: "Nov 10, 2024",
    description: "Interview scheduled with the engineering team"
  },
  {
    title: "Application Submitted",
    date: "Nov 1, 2024",
    description: "Initial application submitted through website"
  }
];

const contacts = [
  {
    name: "Sarah Johnson",
    role: "Hiring Manager",
    email: "sarah.j@company.com"
  },
  {
    name: "Mike Chen",
    role: "Technical Recruiter",
    email: "mike.c@company.com"
  }
];

const documents = [
  {
    title: "Resume",
    version: "v2",
    date: "Nov 1, 2024"
  },
  {
    title: "Cover Letter",
    version: "v1",
    date: "Nov 1, 2024"
  }
];

const dateUtils = {
  standard: (date) => new Date(date).toLocaleDateString()
};

// StatusBadge component using shadcn Badge with custom colors
function StatusBadge({ status }) {
  const colors = {
    Applied: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    Interviewing: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    Offer: 'bg-green-100 text-green-800 hover:bg-green-100',
    Rejected: 'bg-red-100 text-red-800 hover:bg-red-100',
    Accepted: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
  };

  return (
    <Badge
      variant="outline"
      className={`px-4 py-2 rounded-full text-sm font-medium border-0 ${colors[status] || 'bg-gray-100 text-gray-800 hover:bg-gray-100'}`}
    >
      {status}
    </Badge>
  );
}

// Main ApplicationDetailPage component
const ApplicationDetailPage = () => {
  // Mock application data
  const application = {
    company: "Google",
    position: "Senior Software Engineer",
    status: "Interviewing",
    createdAt: "2024-11-01"
  };

  return (
    <div className="min-h-screen w-full bg-background p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-2xl font-bold">G</AvatarFallback>
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
              <span>{dateUtils.standard(application.createdAt)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location</span>
              <span>Mountain View, CA</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Salary Range</span>
              <span>$150k - $200k</span>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <h3 className="font-medium">Technical Interview</h3>
            <p className="text-muted-foreground">Nov 10, 2024 at 2:00 PM</p>
            <p className="text-sm text-muted-foreground">
              Prepare for algorithms and system design
            </p>
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
              Upload Document
            </Button>
            <Button variant="outline" className="w-full">
              Schedule Interview
            </Button>
          </CardContent>
        </Card>

        {/* Timeline - Spans 2 columns */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {timelineItems.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contacts - Spans vertically */}
        <Card className="md:row-span-2">
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contacts.map((contact, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.role}</p>
                  <p className="text-sm text-muted-foreground">{contact.email}</p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Documents - Spans 2 columns */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {documents.map((doc, index) => (
                <Card key={index}>
                  <CardContent className="p-4 text-center">
                    <p className="font-medium">{doc.title}</p>
                    <p className="text-sm text-muted-foreground">{doc.version}</p>
                    <p className="text-sm text-muted-foreground">{doc.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;
