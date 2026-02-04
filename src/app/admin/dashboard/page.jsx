"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  const supabase = createBrowserClient();

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    setLoading(true);
    const { data, error } = await supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRequests(data);
    }
    setLoading(false);
  }

  async function handleUpdateStatus(id, newStatus) {
    const { error } = await supabase
      .from('service_requests')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setRequests((prev) =>
        prev.map((r) => r.id === id ? { ...r, status: newStatus } : r)
      );
    }
  }

  const statusOptions = ["New", "Contacted", "Completed"];
  const filterButtons = ["All", "New", "Contacted", "Completed"];

  const filteredRequests = statusFilter === "All"
    ? requests
    : requests.filter(r => r.status === statusFilter);

  const stats = {
    new: requests.filter(r => r.status === "New").length,
    contacted: requests.filter(r => r.status === "Contacted").length,
    completed: requests.filter(r => r.status === "Completed").length,
    all: requests.length
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-yellow-100 text-yellow-700";
      case "Contacted":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const recentActivity = [...requests]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard title="All Requests" value={stats.all} />
            <StatCard title="New Requests" value={stats.new} />
            <StatCard title="Contacted" value={stats.contacted} />
            <StatCard title="Completed" value={stats.completed} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            📋 Service Requests
          </h2>

          <div className="flex gap-3 mb-6 flex-wrap">
            {filterButtons.map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                className={
                  statusFilter === status
                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                    : "border-orange-600 text-orange-600 hover:bg-orange-50"
                }
                onClick={() => setStatusFilter(status)}
              >
                {status} ({status === "All" ? stats.all : requests.filter(r => r.status === status).length})
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600">Loading requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600">No service requests found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-600 font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-gray-600 font-semibold">Phone</th>
                    <th className="px-6 py-4 text-left text-gray-600 font-semibold">Area</th>
                    <th className="px-6 py-4 text-left text-gray-600 font-semibold">Work Type</th>
                    <th className="px-6 py-4 text-left text-gray-600 font-semibold">Description</th>
                    <th className="px-6 py-4 text-left text-gray-600 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRequests.map((r) => (
                    <tr key={r.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900">{r.name}</td>
                      <td className="px-6 py-4 text-gray-700">{r.phone}</td>
                      <td className="px-6 py-4 text-gray-700">{r.area}</td>
                      <td className="px-6 py-4 text-gray-700">{r.work_type}</td>
                      <td className="px-6 py-4 text-gray-700 max-w-xs break-words">
                        {r.plot_size && (
                          <div className="mb-3 p-2 bg-orange-50 border border-orange-100 rounded text-xs space-y-1">
                            <p className="font-bold text-orange-800 mb-1">Project Summary from Estimator:</p>
                            <p><span className="font-semibold text-gray-600">Plot Size:</span> {r.plot_size} sqft</p>
                            <p><span className="font-semibold text-gray-600">Floors:</span> {r.floors}</p>
                            <p><span className="font-semibold text-gray-600">Type:</span> <span className="capitalize">{r.construction_type}</span></p>
                            {r.estimated_cost_min && (
                              <p className="text-orange-600 font-bold border-t border-orange-100 pt-1 mt-1">
                                <span className="text-gray-600">Est. Cost:</span> ₹{r.estimated_cost_min.toLocaleString()} - ₹{r.estimated_cost_max?.toLocaleString()}
                              </p>
                            )}
                          </div>
                        )}
                        {r.description || (r.plot_size ? "" : "—")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 flex-wrap">
                          {statusOptions.map((status) => (
                            <button
                              key={status}
                              onClick={() => handleUpdateStatus(r.id, status)}
                              className={`px-3 py-1 rounded-full text-sm font-semibold transition ${r.status === status
                                ? getStatusColor(status)
                                : "bg-gray-100 text-gray-400 hover:text-gray-700"
                                }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="text-sm text-gray-600">No recent activity yet.</p>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.name}</p>
                      <p className="text-sm text-gray-600">
                        {activity.work_type} - {activity.description?.substring(0, 50) || 'No description'}...
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        activity.status
                      )}`}
                    >
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <p className="text-sm text-gray-600 mb-2">{title}</p>
        <p className="text-3xl font-bold text-orange-600">{value}</p>
      </CardContent>
    </Card>
  );
}