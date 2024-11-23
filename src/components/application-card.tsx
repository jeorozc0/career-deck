import { ApplicationStatus, SimpleJobApplication } from "@/lib/types/application"
import { dateUtils } from "@/lib/utils/date-format"
import { Button } from "./ui/button"
import {
  Calendar,
  MapPin,
  DollarSign,
  ChevronRight,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { QuickActionsMenu } from "./quick-actions-menu"

interface ApplicationCardProps {
  application: SimpleJobApplication
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/application/${application.id}`);
  };

  const getStatusStyle = (status: ApplicationStatus) => {
    const colors = {
      Saved: 'bg-gray-100 text-gray-800',
      Applied: 'bg-blue-100 text-blue-800',
      Interviewing: 'bg-yellow-100 text-yellow-800',
      Offer: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800',
      Accepted: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || colors.Applied;
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null;
    const formatNumber = (num: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(num);

    if (min && max) return `${formatNumber(min)} - ${formatNumber(max)}`;
    if (min) return `From ${formatNumber(min)}`;
    if (max) return `Up to ${formatNumber(max)}`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex justify-between">
          {/* Left side - Company info */}
          <div className="flex gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10">
                {application.company.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-semibold text-base">{application.company}</h3>
              <p className="text-sm text-muted-foreground">{application.position}</p>
              {application.location && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {application.location}
                </div>
              )}
            </div>
          </div>

          {/* Right side - Status and actions */}
          <div className="flex flex-col items-end gap-2">
            <QuickActionsMenu application={application} />
            <Badge className={getStatusStyle(application.status)}>
              {application.status}
            </Badge>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-4 space-y-3">
          {/* Salary if available */}
          {formatSalary(application.salaryMin, application.salaryMax) && (
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-1" />
              {formatSalary(application.salaryMin, application.salaryMax)}
            </div>
          )}

          {/* Next action */}
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground mr-1">Next Action:</span>
            <span>{application.next_action || 'No action required'}</span>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm text-muted-foreground">
              Updated {dateUtils.relative(application.lastUpdated)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCardClick}
              className="text-muted-foreground hover:text-primary"
            >
              Details
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
