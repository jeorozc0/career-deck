import { SimpleJobApplication } from "@/lib/types/application"
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
  }
]
