import { SimpleJobApplication } from "@/lib/types/application"
import { dateUtils } from "@/lib/utils/date-format"
import { Button } from "./ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import { useDeleteApplication } from "@/hooks/useApplications"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Separator } from "./ui/separator"
import { QuickActionsMenu } from "./quick-actions-menu"

interface ApplicationCardProps {
  application: SimpleJobApplication
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const { mutate: deleteApplication, isPending } = useDeleteApplication();
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.dropdown-trigger')) {
      e.stopPropagation();
      return;
    }
    navigate(`/application/${application.id}`);
  };

  const getStatusStyle = (status: string) => {
    const colors = {
      Applied: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      Interviewing: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      Offer: 'bg-green-100 text-green-800 hover:bg-green-100',
      Rejected: 'bg-red-100 text-red-800 hover:bg-red-100',
      Accepted: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
      default: 'bg-green-100 text-green-800 hover:bg-green-100'
    };
    return colors[status] || colors.default;
  };

  const getCompanyInitial = (company: string) => {
    return company.charAt(0).toUpperCase();
  };

  return (
    <Card
      className="hover:shadow-lg transition-shadow"
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10">
                {getCompanyInitial(application.company)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{application.company}</h3>
              <p className="text-sm text-muted-foreground">{application.position}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <QuickActionsMenu application={application} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <Separator className="my-4" />
          <div className="space-y-2">
            <div className="flex mb-4">
              <Badge
                variant="outline"
                className={`px-2 py-1 border-0 ${getStatusStyle(application.status)}`}
              >
                {application.status}
              </Badge>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Next Action:</span>
              </div>
              <p className="text-sm font-medium">{application.nextAction || 'No action required'}</p>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">
              Updated {dateUtils.relative(application.lastUpdated)}
            </span>
            <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => navigate(`application/${application.id}`)}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
