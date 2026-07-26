"use client"

import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, Search, Building2, Users, Eye } from "lucide-react"
import Link from "next/link"

interface Office {
  _id: string
  id: string
  name: string
  amharic: string
  icon: string
  work: string
  workAmharic: string
  manager: {
    name: string
    position: string
    photo: string
    telephone: string
    email: string
  }
  building: string
  floor: string
  room: string
  status: string
  buildingRef: string
  departments?: any[]
}

export default function OfficesPage() {
  const [offices, setOffices] = useState<Office[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingOffice, setEditingOffice] = useState<Office | null>(null)
  const [departmentCounts, setDepartmentCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    fetchOffices()
  }, [])

  const fetchOffices = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/admin/offices`)
      const data = await response.json()
      setOffices(data)
      
      // Fetch department counts for each office
      const counts: Record<string, number> = {}
      await Promise.all(
        data.map(async (office: Office) => {
          const deptResponse = await fetch(`${API_URL}/api/admin/departments?officeRef=${office.id}`)
          const depts = await deptResponse.json()
          counts[office.id] = depts.length
        })
      )
      setDepartmentCounts(counts)
    } catch (error) {
      console.error("Error fetching offices:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this office?")) return

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/admin/offices/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchOffices()
      }
    } catch (error) {
      console.error("Error deleting office:", error)
    }
  }

  const filteredOffices = offices.filter((office) =>
    office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    office.manager.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Offices</h1>
          <p className="mt-2 text-gray-600">Manage ministry offices</p>
        </div>
        <button
          onClick={() => {
            setEditingOffice(null)
            setShowModal(true)
          }}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors"
          style={{ backgroundColor: '#086976' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#06515B'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#086976'}
        >
          <Plus className="h-5 w-5" />
          Add Office
        </button>
      </div>

      <div className="mb-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search offices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOffices.map((office) => (
            <div
              key={office._id}
              className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col gap-6 p-6 md:flex-row">
                <div className="flex-shrink-0">
                  <img
                    src={office.manager.photo}
                    alt={office.manager.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {office.name}
                      </h3>
                      <p className="text-sm text-gray-600">{office.amharic}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      office.status === 'Open' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {office.status}
                    </span>
                  </div>
                  <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                    <Building2 className="h-4 w-4" />
                    {office.building}, Floor {office.floor}, Room {office.room}
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {office.work}
                    </p>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-sm font-medium text-gray-900">
                      {office.manager.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {office.manager.position}
                    </p>
                    {departmentCounts[office.id] !== undefined && (
                      <div className="mt-2 flex items-center gap-1 text-sm text-blue-600">
                        <Users className="h-4 w-4" />
                        {departmentCounts[office.id]} {departmentCounts[office.id] === 1 ? 'Department' : 'Departments'}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row gap-2 md:flex-col">
                  <button
                    onClick={() => {
                      setEditingOffice(office)
                      setShowModal(true)
                    }}
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(office.id)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredOffices.length === 0 && !loading && (
        <div className="rounded-xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-200">
          <p className="text-gray-600">No offices found</p>
        </div>
      )}

      {showModal && (
        <OfficeModal
          office={editingOffice}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false)
            fetchOffices()
          }}
        />
      )}
    </div>
  )
}

function OfficeModal({
  office,
  onClose,
  onSave,
}: {
  office: Office | null
  onClose: () => void
  onSave: () => void
}) {
  const [buildings, setBuildings] = useState<any[]>([])
  const [formData, setFormData] = useState({
    id: office?.id || "",
    name: office?.name || "",
    amharic: office?.amharic || "",
    icon: office?.icon || "briefcase",
    work: office?.work || "",
    workAmharic: office?.workAmharic || "",
    manager: {
      name: office?.manager.name || "",
      position: office?.manager.position || "",
      photo: office?.manager.photo || "/placeholder-user.jpg",
      telephone: office?.manager.telephone || "",
      email: office?.manager.email || "",
    },
    building: office?.building || "Building A",
    floor: office?.floor || "",
    room: office?.room || "",
    officeNumber: office?.id || "",
    status: office?.status || "Open",
    buildingRef: office?.buildingRef || "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    fetch(`${API_URL}/api/admin/buildings`)
      .then((res) => res.json())
      .then(setBuildings)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const url = office ? `${API_URL}/api/admin/offices/${office.id}` : `${API_URL}/api/admin/offices`
      const method = office ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onSave()
      }
    } catch (error) {
      console.error("Error saving office:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
      <div className="my-8 w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          {office ? "Edit Office" : "Add Office"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Office ID
              </label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
                disabled={!!office}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Building
              </label>
              <select
                value={formData.buildingRef}
                onChange={(e) =>
                  setFormData({ ...formData, buildingRef: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Select building</option>
                {buildings.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Office Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Office Name (Amharic)
            </label>
            <input
              type="text"
              value={formData.amharic}
              onChange={(e) => setFormData({ ...formData, amharic: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Manager Name
            </label>
            <input
              type="text"
              value={formData.manager.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  manager: { ...formData.manager, name: e.target.value },
                })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Manager Position
            </label>
            <input
              type="text"
              value={formData.manager.position}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  manager: { ...formData.manager, position: e.target.value },
                })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Floor
              </label>
              <input
                type="text"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Room
              </label>
              <input
                type="text"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="By Appointment">By Appointment</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
