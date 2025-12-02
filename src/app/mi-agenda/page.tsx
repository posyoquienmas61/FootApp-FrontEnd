"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Plus } from "lucide-react"
import { AppointmentFilters, type AppointmentFilters as AppointmentFiltersType } from "@/components/appointment-filters"
import { AppointmentsTable, type Appointment } from "@/components/appointments-table"

export default function MiAgenda() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    if (isAuthenticated && user?.role !== "podologist") {
      router.push("/dashboard")
    }
  }, [isAuthenticated, user?.role, router])

  // Mock data - appointments
  const allAppointments: Appointment[] = [
    {
      id: 1,
      client: "Liam Johnson",
      podiatrist: "Dr. Eleanor Vance",
      service: "Routine Check-up",
      dateTime: "Sep 25, 2024 - 10:30 AM",
      status: "confirmed",
    },
    {
      id: 2,
      client: "Olivia Smith",
      podiatrist: "Dr. Marcus Thorne",
      service: "Nail Surgery",
      dateTime: "Sep 26, 2024 - 02:00 PM",
      status: "pending",
    },
    {
      id: 3,
      client: "Noah Williams",
      podiatrist: "Dr. Eleanor Vance",
      service: "Gait Analysis",
      dateTime: "Sep 27, 2024 - 11:00 AM",
      status: "confirmed",
    },
    {
      id: 4,
      client: "Emma Brown",
      podiatrist: "Dr. Sofia Rossi",
      service: "Orthotics Fitting",
      dateTime: "Sep 28, 2024 - 09:15 AM",
      status: "cancelled",
    },
    {
      id: 5,
      client: "James Jones",
      podiatrist: "Dr. Marcus Thorne",
      service: "Diabetic Foot Care",
      dateTime: "Sep 28, 2024 - 03:30 PM",
      status: "confirmed",
    },
    {
      id: 6,
      client: "Sarah Miller",
      podiatrist: "Dr. Eleanor Vance",
      service: "Routine Check-up",
      dateTime: "Sep 29, 2024 - 01:00 PM",
      status: "pending",
    },
    {
      id: 7,
      client: "Michael Davis",
      podiatrist: "Dr. Sofia Rossi",
      service: "Bunion Treatment",
      dateTime: "Sep 30, 2024 - 10:00 AM",
      status: "confirmed",
    },
    {
      id: 8,
      client: "Jessica Anderson",
      podiatrist: "Dr. Marcus Thorne",
      service: "Heel Pain Treatment",
      dateTime: "Oct 01, 2024 - 02:30 PM",
      status: "confirmed",
    },
    {
      id: 9,
      client: "David Wilson",
      podiatrist: "Dr. Eleanor Vance",
      service: "Toenail Removal",
      dateTime: "Oct 02, 2024 - 11:00 AM",
      status: "pending",
    },
    {
      id: 10,
      client: "Lisa Taylor",
      podiatrist: "Dr. Sofia Rossi",
      service: "Diabetic Foot Care",
      dateTime: "Oct 03, 2024 - 03:00 PM",
      status: "confirmed",
    },
    {
      id: 11,
      client: "Robert Martinez",
      podiatrist: "Dr. Eleanor Vance",
      service: "Routine Check-up",
      dateTime: "Oct 04, 2024 - 09:00 AM",
      status: "confirmed",
    },
    {
      id: 12,
      client: "Maria Garcia",
      podiatrist: "Dr. Marcus Thorne",
      service: "Gait Analysis",
      dateTime: "Oct 05, 2024 - 01:30 PM",
      status: "cancelled",
    },
    {
      id: 13,
      client: "Thomas Brown",
      podiatrist: "Dr. Sofia Rossi",
      service: "Orthotics Fitting",
      dateTime: "Oct 06, 2024 - 10:30 AM",
      status: "confirmed",
    },
    {
      id: 14,
      client: "Amanda White",
      podiatrist: "Dr. Eleanor Vance",
      service: "Heel Pain Treatment",
      dateTime: "Oct 07, 2024 - 02:00 PM",
      status: "pending",
    },
    {
      id: 15,
      client: "Christopher Lee",
      podiatrist: "Dr. Marcus Thorne",
      service: "Bunion Treatment",
      dateTime: "Oct 08, 2024 - 11:00 AM",
      status: "confirmed",
    },
    {
      id: 16,
      client: "Jennifer Hall",
      podiatrist: "Dr. Sofia Rossi",
      service: "Routine Check-up",
      dateTime: "Oct 09, 2024 - 03:30 PM",
      status: "confirmed",
    },
    {
      id: 17,
      client: "Daniel Jones",
      podiatrist: "Dr. Eleanor Vance",
      service: "Diabetic Foot Care",
      dateTime: "Oct 10, 2024 - 10:00 AM",
      status: "confirmed",
    },
    {
      id: 18,
      client: "Patricia Moore",
      podiatrist: "Dr. Marcus Thorne",
      service: "Toenail Removal",
      dateTime: "Oct 11, 2024 - 01:00 PM",
      status: "pending",
    },
    {
      id: 19,
      client: "Matthew Jackson",
      podiatrist: "Dr. Sofia Rossi",
      service: "Gait Analysis",
      dateTime: "Oct 12, 2024 - 02:30 PM",
      status: "confirmed",
    },
    {
      id: 20,
      client: "Linda Martin",
      podiatrist: "Dr. Eleanor Vance",
      service: "Nail Surgery",
      dateTime: "Oct 13, 2024 - 11:30 AM",
      status: "cancelled",
    },
  ]

  useEffect(() => {
    setFilteredAppointments(allAppointments)
  }, [])

  const handleFilterChange = (filters: AppointmentFiltersType) => {
    let filtered = allAppointments

    if (filters.date) {
      // Simple date filtering
      filtered = filtered.filter((apt) => apt.dateTime.includes(filters.date))
    }

    if (filters.podologist) {
      filtered = filtered.filter((apt) => {
        const podologistMap: { [key: string]: string } = {
          "dr-eleanor": "Eleanor",
          "dr-marcus": "Marcus",
          "dr-sofia": "Sofia",
        }
        return apt.podiatrist.includes(podologistMap[filters.podologist] || "")
      })
    }

    if (filters.service) {
      filtered = filtered.filter((apt) => apt.service.toLowerCase().includes(filters.service?.toLowerCase() || ""))
    }

    if (filters.status) {
      filtered = filtered.filter((apt) => apt.status === filters.status)
    }

    setFilteredAppointments(filtered)
    setCurrentPage(1)
  }

  const paginatedAppointments = filteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)

  if (!isAuthenticated || user?.role !== "podologist") {
    return null
  }

  return (
    <main className="pt-32 pb-16 px-4 md:px-6 lg:px-8 bg-slate-950 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Appointment Management</h1>
            <p className="text-slate-400">Manage all your appointments and patient interactions</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
            <Plus className="w-5 h-5" />
            New Appointment
          </Button>
        </div>

        {/* Filters */}
        <AppointmentFilters onFilterChange={handleFilterChange} />

        {/* Table Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Lista de citas</h2>
            <AppointmentsTable appointments={paginatedAppointments} />
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-slate-400 text-sm">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredAppointments.length)} of {filteredAppointments.length} results
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="border-slate-600 text-slate-300"
            >
              {"<"}
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "border-slate-600 text-slate-300"
                }
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="border-slate-600 text-slate-300"
            >
              {">"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
