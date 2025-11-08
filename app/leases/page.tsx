"use client"

import DashboardNav from "@/components/dashboard-nav"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { Plus, Search, Trash2, Edit, AlertCircle, FileText, Clock, CheckCircle, Bell } from "lucide-react"
import { useState } from "react"

const leaseData = [
  {
    id: 1,
    tenant: "John Smith",
    unit: "101",
    startDate: "2023-01-15",
    endDate: "2024-12-31",
    status: "Active",
    daysLeft: 145,
  },
  {
    id: 2,
    tenant: "Sarah Johnson",
    unit: "202",
    startDate: "2023-06-01",
    endDate: "2025-05-31",
    status: "Active",
    daysLeft: 210,
  },
  {
    id: 3,
    tenant: "Mike Davis",
    unit: "303",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "Expiring Soon",
    daysLeft: 30,
  },
  {
    id: 4,
    tenant: "Emma Wilson",
    unit: "104",
    startDate: "2024-03-01",
    endDate: "2026-02-28",
    status: "Active",
    daysLeft: 510,
  },
]

export default function LeasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtered, setFiltered] = useState(leaseData)

  const tabs = [
    { title: "All Leases", icon: FileText },
    { title: "Active", icon: CheckCircle },
    { title: "Expiring Soon", icon: Clock },
    { type: "separator" as const },
    { title: "Renewals", icon: Bell },
  ]

  const handleTabChange = (index: number) => {
    // Filter leases based on selected tab
    if (index === 0) {
      // All Leases
      setFiltered(leaseData)
    } else if (index === 1) {
      // Active
      setFiltered(leaseData.filter(lease => lease.status === "Active"))
    } else if (index === 2) {
      // Expiring Soon
      setFiltered(leaseData.filter(lease => lease.status === "Expiring Soon"))
    }
  }

  const searchFiltered = filtered.filter(
    (lease) => lease.tenant.toLowerCase().includes(searchTerm.toLowerCase()) || lease.unit.includes(searchTerm),
  )

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4 md:mb-0">Leases</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search leases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Lease
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
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Tenant</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Unit</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Start Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">End Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Days Left</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchFiltered.map((lease) => (
                      <tr key={lease.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 text-foreground">{lease.tenant}</td>
                        <td className="py-3 px-4 text-foreground font-medium">{lease.unit}</td>
                        <td className="py-3 px-4 text-muted-foreground">{lease.startDate}</td>
                        <td className="py-3 px-4 text-muted-foreground">{lease.endDate}</td>
                        <td className="py-3 px-4 text-foreground">{lease.daysLeft} days</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            {lease.status === "Expiring Soon" && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                lease.status === "Active"
                                  ? "bg-green-500/10 text-green-700"
                                  : "bg-yellow-500/10 text-yellow-700"
                              }`}
                            >
                              {lease.status}
                            </span>
                          </div>
                        </td>
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
