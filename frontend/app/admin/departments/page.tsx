"use client"

import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, Search, Building2, User, Briefcase } from "lucide-react"

interface Department {
  _id: string
  id: string
  name: string
  amharic?: string
  detail: {
    managerName: string
    position: string
    photo: string
    description: string
    building: string
    floor: string
    room: string
    telephone: string
    email: string
    status: string
  }
  officeRef: string
  buildingRef: string
}

interface Office {
  id: string
  name: string
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [offices, setOffices] = useState<Office[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOffice, setSelectedOffice] = useState<string>("all")
  const [showModal, setShowModal] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)

  useEffect(() => {
    fetchOffices()
    fetchDepartments()
  }, [])

  const fetchOffices = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/admin/offices`)
      const data = await response.json()
      setOffices(data)
    } catch (error) {
      console.error("Error fetching offices:", error)
    }
  }

  const fetchDepartments = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/admin/departments`)
      const data = await response.json()
      setDepartments(data)
    } catch (error) {
      console.error("Error fetching departments:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this department?")) return

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/admin/departments/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchDepartments()
      } else {
        alert("Failed to delete department")
      }
    } catch (error) {
      console.error("Error deleting department:", error)
      alert("Error deleting department")
    }
  }

  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.detail.managerName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesOffice = selectedOffice === "all" || dept.officeRef === selectedOffice
    
    return matchesSearch && matchesOffice
  })

  const getOfficeName = (officeId: string) => {
    const office = offices.find(o => o.id === officeId)
    return office?.name || officeId
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <p className="mt-2 text-gray-600">Manage ministry departments</p>
        </div>
        <button
          onClick={() => {
            setEditingDepartment(null)
            setShowModal(true)
          }}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors"
          style={{ backgroundColor: '#086976' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#06515B'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#086976'}
        >
          <Plus className="h-5 w-5" />
          Add Department
        </button>
      </div>

      <div className="mb-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={selectedOffice}
              onChange={(e) => setSelectedOffice(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="all">All Offices</option>
              {offices.map((office) => (
                <option key={office.id} value={office.id}>
                  {office.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDepartments.map((dept) => (
            <div
              key={dept._id}
              className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-md"
            >
              <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 p-3">
                <h3 className="text-sm font-bold text-gray-900 line-clamp-2">
                  {dept.name}
                </h3>
                {dept.amharic && (
                  <p className="text-xs text-gray-600 mt-0.5">{dept.amharic}</p>
                )}
                <div className="mt-1.5 flex items-center gap-1 text-xs text-blue-700">
                  <Briefcase className="h-3 w-3" />
                  <span className="truncate">{getOfficeName(dept.officeRef)}</span>
                </div>
              </div>
              <div className="p-3">
                <div className="mb-3 flex items-start gap-2">
                  <img
                    src={dept.detail.photo}
                    alt={dept.detail.managerName}
                    className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 truncate">
                          {dept.detail.managerName}
                        </p>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {dept.detail.position}
                        </p>
                      </div>
                      <span className={`rounded-full px-1.5 py-0.5 text-xs font-medium whitespace-nowrap ${
                        dept.detail.status === 'Open' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {dept.detail.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-3 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Building2 className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{dept.detail.building}, Floor {dept.detail.floor}, Room {dept.detail.room}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <User className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{dept.detail.telephone}</span>
                  </div>
                </div>

                <p className="mb-3 text-xs text-gray-700 line-clamp-2">
                  {dept.detail.description}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingDepartment(dept)
                      setShowModal(true)
                    }}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-50 px-2 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dept.id)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-50 px-2 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredDepartments.length === 0 && !loading && (
        <div className="rounded-xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-200">
          <p className="text-gray-600">No departments found</p>
        </div>
      )}

      {showModal && (
        <DepartmentModal
          department={editingDepartment}
          offices={offices}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false)
            fetchDepartments()
          }}
        />
      )}
    </div>
  )
}

// Department Modal Component
function DepartmentModal({
  department,
  offices,
  onClose,
  onSave,
}: {
  department: Department | null
  offices: Office[]
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    id: department?.id || "",
    name: department?.name || "",
    amharic: department?.amharic || "",
    detail: {
      managerName: department?.detail.managerName || "",
      position: department?.detail.position || "",
      photo: department?.detail.photo || "/placeholder-user.jpg",
      description: department?.detail.description || "",
      building: department?.detail.building || "",
      floor: department?.detail.floor || "",
      room: department?.detail.room || "",
      officeNumber: department?.detail.officeNumber || "",
      telephone: department?.detail.telephone || "",
      extension: department?.detail.extension || "",
      email: department?.detail.email || "",
      status: department?.detail.status || "Open",
    },
    officeRef: department?.officeRef || "",
    buildingRef: department?.buildingRef || "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const url = department ? `${API_URL}/api/admin/departments/${department.id}` : `${API_URL}/api/admin/departments`
      const method = department ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onSave()
      } else {
        alert("Failed to save department")
      }
    } catch (error) {
      console.error("Error saving department:", error)
      alert("Error saving department")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
      <div className="my-8 w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          {department ? "Edit Department" : "Add Department"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Department ID *</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
                disabled={!!department}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Office *</label>
              <select
                value={formData.officeRef}
                onChange={(e) => setFormData({ ...formData, officeRef: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Select office</option>
                {offices.map((o) => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Department Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Department Name (Amharic)</label>
              <input
                type="text"
                value={formData.amharic}
                onChange={(e) => setFormData({ ...formData, amharic: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="mb-3 font-semibold text-gray-900">Manager Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Manager Name *</label>
                <input
                  type="text"
                  value={formData.detail.managerName}
                  onChange={(e) => setFormData({ ...formData, detail: { ...formData.detail, managerName: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Position *</label>
                <input
                  type="text"
                  value={formData.detail.position}
                  onChange={(e) => setFormData({ ...formData, detail: { ...formData.detail, position: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Telephone *</label>
                <input
                  type="text"
                  value={formData.detail.telephone}
                  onChange={(e) => setFormData({ ...formData, detail: { ...formData.detail, telephone: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  value={formData.detail.email}
                  onChange={(e) => setFormData({ ...formData, detail: { ...formData.detail, email: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">Photo URL *</label>
                <input
                  type="text"
                  value={formData.detail.photo}
                  onChange={(e) => setFormData({ ...formData, detail: { ...formData.detail, photo: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Description *</label>
            <textarea
              value={formData.detail.description}
              onChange={(e) => setFormData({ ...formData, detail: { ...formData.detail, description: e.target.value } })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              rows={3}
              required
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="mb-3 font-semibold text-gray-900">Location</h3>
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Building *</label>
                <input
                  type="text"
                  value={formData.detail.building}
                  onChange={(e) => setFormData({ ...formData, detail: { ...formData.detail, building: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Floor *</label>
                <input
                  type="text"
                  value={formData.detail.floor}
                  onChange={(e) => setFormData({ ...formData, detail: { ...formData.detail, floor: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Room *</label>
                <input
                  type="text"
                  value={formData.detail.room}
                  onChange={(e) => setFormData({ ...formData, detail: { ...formData.detail, room: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Extension</label>
                <input
                  type="text"
                  value={formData.detail.extension}
                  onChange={(e) => setFormData({ ...formData, detail: { ...formData.detail, extension: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
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
              {loading ? "Saving..." : "Save Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
