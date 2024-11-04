function HomeHeader({ view, setView }: any) {

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-white text-2xl font-bold">Job Applications</h1>
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 rounded ${view === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setView('table')}
        >
          Table View
        </button>
        <button
          className={`px-4 py-2 rounded ${view === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setView('card')}
        >
          Card View
        </button>
      </div>
    </div>
  )
}

export default HomeHeader
