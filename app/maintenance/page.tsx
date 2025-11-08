"use client"

import DashboardNav from "@/components/dashboard-nav"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { Plus, Search, Trash2, Edit, Clock, CheckCircle2, Wrench, AlertTriangle, CheckCircle, Bell } from "lucide-react"
import { useState } from "react"

const maintenanceData = [
  {
    id: 1,
    issue: "Leaky faucet",
    unit: "101",
    tenant: "John Smith",
    priority: "Low",
    status: "Pending",
    dateReported: "2024-11-05",
  },
  {
    id: 2,
    issue: "AC not working",
    unit: "202",
    tenant: "Sarah Johnson",
    priority: "High",
    status: "In Progress",
    dateReported: "2024-11-03",
  },
  {
    id: 3,
    issue: "Broken window",
    unit: "303",
    tenant: "Mike Davis",
    priority: "Medium",
    status: "Pending",
    dateReported: "2024-11-04",
  },
  {
    id: 4,
    issue: "Door lock repair",
    unit: "104",
    tenant: "Emma Wilson",
    priority: "Medium",
    status: "Completed",
    dateReported: "2024-10-28",
  },
]

export default function MaintenancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtered, setFiltered] = useState(maintenanceData)

  const tabs = [
    { title: "All Issues", icon: Wrench },
    { title: "Pending", icon: Clock },
    { title: "In Progress", icon: AlertTriangle },
    { title: "Completed", icon: CheckCircle },
    { type: "separator" as const },
    { title: "Schedule", icon: Bell },
  ]

  const handleTabChange = (index: number) => {
    // Filter maintenance issues based on selected tab
    if (index === 0) {
      // All Issues
      setFiltered(maintenanceData)
    } else if (index === 1) {
      // Pending
      setFiltered(maintenanceData.filter(item => item.status === "Pending"))
    } else if (index === 2) {
      // In Progress
      setFiltered(maintenanceData.filter(item => item.status === "In Progress"))
    } else if (index === 3) {
      // Completed
      setFiltered(maintenanceData.filter(item => item.status === "Completed"))
    }
  }

  const searchFiltered = filtered.filter(
    (item) =>
      item.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unit.includes(searchTerm) ||
      item.tenant.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500/10 text-red-700"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-700"
      case "Low":
        return "bg-green-500/10 text-green-700"
      default:
        return "bg-gray-500/10 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4 md:mb-0">Maintenance</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search maintenance issues..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Report Issue
                </Button>
              </div>
            </div>

            <div className="mb-8">
              <ExpandableTabs
                tabs={tabs}
                className="w-full md:w-auto"
                activeColor="text-primary"
                onChange={handleTabChange}
              />
            </div>

            <Card className="p-6 mb-6">

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Issue</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Unit</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Tenant</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Priority</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Date Reported</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchFiltered.map((item) => (
                      <tr key={item.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 text-foreground">{item.issue}</td>
                        <td className="py-3 px-4 text-foreground font-medium">{item.unit}</td>
                        <td className="py-3 px-4 text-muted-foreground">{item.tenant}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}
                          >
                            {item.priority}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            {item.status === "Completed" ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              <Clock className="w-4 h-4 text-blue-600" />
                            )}
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                item.status === "Completed"
                                  ? "bg-green-500/10 text-green-700"
                                  : item.status === "In Progress"
                                    ? "bg-blue-500/10 text-blue-700"
                                    : "bg-gray-500/10 text-gray-700"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{item.dateReported}</td>
                        <td className="py-3 px-4 flex gap-2">
                          <button className="p-2 hover:bg-muted rounded transition-colors">
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-2 hover:bg-muted rounded transition-colors">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
