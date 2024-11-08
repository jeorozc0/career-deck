import { SimpleJobApplication } from "@/lib/types/application"
import { dateUtils } from "@/lib/utils/date-format"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<SimpleJobApplication>[] = [
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "nextAction",
    header: "Next Action",
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
    cell: ({ row }) => {
      // Format the date
      return dateUtils.relative(row.getValue("lastUpdated"))
    }
  }
]
