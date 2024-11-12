import { ThemeToggle } from "./theme-toggle"
import { CreateApplication } from "./create-application-dialog"

function HomeHeader() {

  return (
    <div className="flex h-auto p-2 justify-between mb-6">
      <h1 className="text-black dark:text-white text-2xl font-bold">Job Applications</h1>
      <div className="flex gap-4">
        <ThemeToggle />
        <CreateApplication />
      </div>
    </div>
  )
}

export default HomeHeader
