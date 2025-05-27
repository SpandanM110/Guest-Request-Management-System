export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-slate-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
      </div>
      <p className="mt-4 text-sm text-slate-600">Loading requests...</p>
    </div>
  )
}
