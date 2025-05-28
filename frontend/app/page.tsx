"use client"

import { useQuery } from "@tanstack/react-query"
import { RequestsTable } from "../components/requests-table"
import { LoadingSpinner } from "../components/loading-spinner"
import { ErrorMessage } from "../components/error-message"
import { StatsCards } from "../components/stats-cards"
import { RefreshButton } from "../components/refresh-button"

interface GuestRequest {
  id: number
  guestPhone: string
  requestText: string
  createdAt: string
  status: string
}

async function fetchRequests(): Promise<GuestRequest[]> {
  const response = await fetch("https://backendtime-i244vd0pe-spandan-mukherjees-projects.vercel.app/api/requests")
  if (!response.ok) {
    throw new Error("Failed to fetch requests")
  }
  return response.json()
}

export default function Dashboard() {
  const {
    data: requests,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Guest Requests Dashboard</h1>
                <p className="text-sm text-slate-500">Monitor and manage guest requests in real-time</p>
              </div>
            </div>
            <RefreshButton onRefresh={refetch} isRefreshing={isRefetching} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {requests && <StatsCards requests={requests} />}

        {/* Table Section */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Recent Requests</h2>
                  <p className="text-sm text-slate-600 mt-1">
                    {requests ? `${requests.length} total requests` : "Loading requests..."}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-500">Live</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              {isLoading && <LoadingSpinner />}
              {error && <ErrorMessage message="Failed to load requests. Please check your connection." />}
              {requests && <RequestsTable requests={requests} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
