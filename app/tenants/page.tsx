"use client"

import DashboardNav from "@/components/dashboard-nav"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { Plus, Search, Trash2, Edit, Users, UserCheck, UserX, Bell } from "lucide-react"
import { useState } from "react"

const tenantData = [
  { id: 1, name: "John Smith", email: "john@example.com", phone: "555-0101", unit: "101", status: "Active" },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", phone: "555-0102", unit: "202", status: "Active" },
  { id: 3, name: "Mike Davis", email: "mike@example.com", phone: "555-0103", unit: "303", status: "Pending" },
  { id: 4, name: "Emma Wilson", email: "emma@example.com", phone: "555-0104", unit: "104", status: "Active" },
]

export default function TenantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtered, setFiltered] = useState(tenantData)

  const tabs = [
    { title: "All Tenants", icon: Users },
    { title: "Active", icon: UserCheck },
    { title: "Inactive", icon: UserX },
    { type: "separator" as const },
    { title: "Notifications", icon: Bell },
  ]

  const handleTabChange = (index: number) => {
    // Filter tenants based on selected tab
    if (index === 0) {
      // All Tenants
      setFiltered(tenants)
    } else if (index === 1) {
      // Active
      setFiltered(tenants.filter(tenant => tenant.status === "Active"))
    } else if (index === 2) {
      // Inactive
      setFiltered(tenants.filter(tenant => tenant.status === "Pending"))
    }
  }

  const searchFiltered = filtered.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4 md:mb-0">Tenants</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search tenants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Tenant
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
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Phone</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Unit</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
            {searchFiltered.map((tenant) => (
                      <tr key={tenant.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 text-foreground">{tenant.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{tenant.email}</td>
                        <td className="py-3 px-4 text-muted-foreground">{tenant.phone}</td>
                        <td className="py-3 px-4 text-foreground font-medium">{tenant.unit}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              tenant.status === "Active"
                                ? "bg-green-500/10 text-green-700"
                                : "bg-yellow-500/10 text-yellow-700"
                            }`}
                          >
                            {tenant.status}
                          </span>
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
