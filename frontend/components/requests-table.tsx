"use client"

import { formatDistanceToNow, format } from "date-fns"
import { Phone, MessageSquare, Clock, User } from "lucide-react"

interface GuestRequest {
  id: number
  guestPhone: string
  requestText: string
  createdAt: string
  status: string
}

interface RequestsTableProps {
  requests: GuestRequest[]
}

export function RequestsTable({ requests }: RequestsTableProps) {
  if (requests.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
          <MessageSquare className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No requests yet</h3>
        <p className="text-slate-500 max-w-sm mx-auto">
          Guest requests will appear here when they are submitted through your system.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Guest</span>
              </div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Request Details</span>
              </div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden lg:table-cell">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Submitted</span>
              </div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {requests.map((request, index) => (
            <tr
              key={request.id}
              className="hover:bg-slate-50 transition-colors duration-150"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <td className="px-6 py-6">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900 truncate">{request.guestPhone}</p>
                    <p className="text-xs text-slate-500 lg:hidden">
                      {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-6">
                <div className="max-w-xs">
                  <p className="text-sm text-slate-900 leading-relaxed">{request.requestText}</p>
                  <p className="text-xs text-slate-500 mt-1">Request #{request.id}</p>
                </div>
              </td>
              <td className="px-6 py-6 hidden lg:table-cell">
                <div className="text-sm text-slate-600">
                  <p className="font-medium">{formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</p>
                  <p className="text-xs text-slate-500">
                    {format(new Date(request.createdAt), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              </td>
              <td className="px-6 py-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></div>
                  {request.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
