import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "./theme-toggle"
import { CreateApplication } from "./create-application-dialog"

function HomeHeader({ setView }: any) {

  return (
    <div className="flex h-auto p-2 justify-between mb-6">
      <h1 className="text-black dark:text-white text-2xl font-bold">Job Applications</h1>
      <div className="flex gap-4">
        <ThemeToggle />
        <Tabs defaultValue="table" className="w-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="table"
              onClick={() => setView('table')}
            >
              Table View
            </TabsTrigger>
            <TabsTrigger
              value="card"
              onClick={() => setView('card')}
            >
              Card View
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <CreateApplication />

      </div>
    </div>
  )
}

export default HomeHeader
