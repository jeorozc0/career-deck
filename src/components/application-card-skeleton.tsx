import { Card, CardContent } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

export function ApplicationCardSkeleton() {
  return (
    <Card className="hover:shadow-md">
      <CardContent className="pt-6">
        <div className="flex justify-between">
          {/* Left side - Company info */}
          <div className="flex gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-[150px]" />
              <Skeleton className="h-4 w-[200px]" />
              <div className="flex items-center gap-1">
                <Skeleton className="h-3 w-3" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          </div>

          {/* Right side - Status and actions */}
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-4 space-y-3">
          {/* Salary skeleton */}
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[140px]" />
          </div>

          {/* Next action skeleton */}
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          {/* Footer skeleton */}
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-8 w-[100px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
