import { SimpleJobApplication } from "@/lib/types/application"

interface JobCardProps {
  applications: SimpleJobApplication[]
}

function JobCard({ applications }: JobCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {applications.map((app: SimpleJobApplication) => (
        <div
          key={app.id}
          className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer p-4"
        >
          <div className="border-b border-gray-200 pb-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{app.company}</h3>
              <span className={`text-sm px-2 py-1 rounded ${app.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
                }`}>
                {app.status}
              </span>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <p className="text-gray-600">{app.position}</p>
            <p className="text-sm text-gray-500">Next: {app.nextAction}</p>
            <p className="text-sm text-gray-500">Updated: {app.lastUpdated}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default JobCard
