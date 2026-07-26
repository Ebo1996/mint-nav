"use client"

import { useEffect, useState } from "react"
import { Search, Building2, Users, ChevronDown, ChevronRight, Phone, Mail, MapPin, Plus, Edit, Trash2 } from "lucide-react"

interface Manager {
  name: string
  nameAmharic?: string
  position: string
  positionAmharic: string
  photo: string
  telephone: string
  email: string
}

interface DepartmentDetail {
  managerName: string
  managerNameAmharic?: string
  position: string
  positionAmharic: string
  photo: string
  description: string
  descriptionAmharic: string
  building: string
  floor: string
  room: string
  officeNumber: string
  telephone: string
  extension: string
  email: string
  location: string
  locationAmharic: string
  status: "Open" | "Closed" | "By Appointment"
}

interface Department {
  _id: string
  id: string
  name: string
  amharic?: string
  detail: DepartmentDetail
  officeRef: string
  buildingRef: string
}

interface Office {
  _id: string
  id: string
  name: string
  amharic: string
  icon: string
  work: string
  workAmharic: string
  manager: Manager
  building: string
  floor: string
  room: string
  officeNumber: string
  status: string
  buildingRef: string
  departments: Department[]
}

interface Building {
  _id: string
  id: string
  name: string
  shortName: string
}

export default function HierarchyPage() {
  const [offices, setOffices] = useState<Office[]>([])
  const [buildings, setBuildings] = useState<Building[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedOffices, setExpandedOffices] = useState<Set<string>>(new Set())
  
  // Modal states
  const [showOfficeModal, setShowOfficeModal] = useState(false)
  const [showDepartmentModal, setShowDepartmentModal] = useState(false)
  const [editingOffice, setEditingOffice] = useState<Office | null>(null)
  const [editingDepartment, setEditingDepartment] = useState<{ office: Office; dept: Department | null }>({ office: null as any, dept: null })

  useEffect(() => {
    fetchBuildings()
    fetchHierarchy()
  }, [])

  const fetchBuildings = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/admin/buildings`)
      const data = await response.json()
      setBuildings(data)
    } catch (error) {
      console.error("Error fetching buildings:", error)
    }
  }

  const fetchHierarchy = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/admin/offices/hierarchy`)
      const data = await response.json()
      setOffices(data)
      // Start with all offices collapsed so users can click to expand
      setExpandedOffices(new Set())
    } catch (error) {
      console.error("Error fetching hierarchy:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleOffice = (officeId: string) => {
    const newExpanded = new Set(expandedOffices)
    if (newExpanded.has(officeId)) {
      newExpanded.delete(officeId)
    } else {
      newExpanded.add(officeId)
    }
    setExpandedOffices(newExpanded)
  }

  const handleDeleteOffice = async (officeId: string) => {
    if (!confirm("Are you sure you want to delete this office? This will NOT delete its departments.")) return

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/admin/offices/${officeId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchHierarchy()
      } else {
        alert("Failed to delete office")
      }
    } catch (error) {
      console.error("Error deleting office:", error)
      alert("Error deleting office")
    }
  }

  const handleDeleteDepartment = async (deptId: string) => {
    if (!confirm("Are you sure you want to delete this department?")) return

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/admin/departments/${deptId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchHierarchy()
      } else {
        alert("Failed to delete department")
      }
    } catch (error) {
      console.error("Error deleting department:", error)
      alert("Error deleting department")
    }
  }

  const filteredOffices = offices.filter((office) => {
    const searchLower = searchTerm.toLowerCase()
    const officeMatch = office.name.toLowerCase().includes(searchLower) ||
                        office.manager.name.toLowerCase().includes(searchLower)
    
    const departmentMatch = office.departments?.some(dept =>
      dept.name.toLowerCase().includes(searchLower) ||
      dept.detail.managerName.toLowerCase().includes(searchLower)
    )
    
    return officeMatch || departmentMatch
  })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#111111' }}>Ministry Hierarchy</h1>
          <p className="mt-2" style={{ color: '#666666' }}>Organizational structure with departments</p>
        </div>
        <button
          onClick={() => {
            setEditingOffice(null)
            setShowOfficeModal(true)
          }}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors"
          style={{ backgroundColor: '#086976' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#06515B'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#086976'
          }}
        >
          <Plus className="h-5 w-5" />
          Add Office
        </button>
      </div>

      <div className="mb-6 rounded-xl bg-white p-4 shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Search offices and departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 pl-10 pr-4 focus:outline-none focus:ring-2"
            style={{ 
              borderColor: '#E5E7EB',
              color: '#111111'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#086976'
              e.currentTarget.style.outlineColor = '#086976'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB'
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg" style={{ color: '#666666' }}>Loading...</div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOffices.map((office) => (
            <div
              key={office._id}
              className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200"
            >
              {/* Office Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3">
                <div className="flex items-start gap-2">
                  <button 
                    className="mt-0.5 flex-shrink-0 rounded-lg p-1 hover:bg-blue-100 transition-colors"
                    onClick={() => toggleOffice(office.id)}
                    title={expandedOffices.has(office.id) ? "Hide departments" : "Show departments"}
                  >
                    {expandedOffices.has(office.id) ? (
                      <ChevronDown className="h-4 w-4 text-blue-600" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-blue-600" />
                    )}
                  </button>
                  
                  <div className="flex-shrink-0">
                    <img
                      src={office.manager.photo}
                      alt={office.manager.name}
                      className="h-12 w-12 rounded-lg object-cover ring-2 ring-white shadow-md"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="space-y-0.5">
                          <h2 className="text-sm font-bold text-gray-900">
                            {office.name}
                          </h2>
                          {office.amharic && (
                            <p className="text-xs font-semibold text-gray-700">{office.amharic}</p>
                          )}
                        </div>
                        <div className="mt-1.5 flex items-center gap-2 text-xs text-gray-600">
                          <Building2 className="h-3 w-3" />
                          {office.building}, Floor {office.floor}, Room {office.room}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setEditingOffice(office)
                              setShowOfficeModal(true)
                            }}
                            className="rounded-lg bg-blue-100 p-1 text-blue-700 hover:bg-blue-200"
                          >
                            <Edit className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteOffice(office.id)}
                            className="rounded-lg bg-red-100 p-1 text-red-700 hover:bg-red-200"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          office.status === 'Open' 
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {office.status}
                        </span>
                        {office.departments && office.departments.length > 0 && (
                          <span className="flex items-center gap-1 text-xs text-gray-600">
                            <Users className="h-3 w-3" />
                            {office.departments.length} {office.departments.length === 1 ? 'Dept' : 'Depts'}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 border-t border-blue-200 pt-2">
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-gray-900">{office.manager.name}</p>
                        {office.manager.nameAmharic && (
                          <p className="text-xs font-semibold text-gray-700">{office.manager.nameAmharic}</p>
                        )}
                      </div>
                      <div className="mt-0.5 space-y-0.5">
                        <p className="text-xs text-gray-600">{office.manager.position}</p>
                        {office.manager.positionAmharic && (
                          <p className="text-xs text-gray-600">{office.manager.positionAmharic}</p>
                        )}
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-2 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {office.manager.telephone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {office.manager.email}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 space-y-1.5">
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-0.5">Work Description (English)</p>
                        <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">{office.work}</p>
                      </div>
                      {office.workAmharic && (
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-0.5">Work Description (አማርኛ)</p>
                          <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">{office.workAmharic}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Departments List */}
              {expandedOffices.has(office.id) && (
                <div className="border-t border-gray-200 bg-gray-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900">
                      <Users className="h-4 w-4 text-blue-600" />
                      Departments
                    </h3>
                    <button
                      onClick={() => {
                        setEditingDepartment({ office, dept: null })
                        setShowDepartmentModal(true)
                      }}
                      className="flex items-center gap-1.5 rounded-lg bg-green-600 px-2.5 py-1.5 text-xs text-white hover:bg-green-700"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Department
                    </button>
                  </div>
                  
                  {office.departments && office.departments.length > 0 ? (
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {office.departments.map((dept) => (
                        <div
                          key={dept._id}
                          className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <img
                                src={dept.detail.photo}
                                alt={dept.detail.managerName}
                                className="h-12 w-12 rounded-lg object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                                    {dept.name}
                                  </h4>
                                  {dept.amharic && (
                                    <p className="text-xs text-gray-600 mt-0.5">{dept.amharic}</p>
                                  )}
                                </div>
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => {
                                      setEditingDepartment({ office, dept })
                                      setShowDepartmentModal(true)
                                    }}
                                    className="rounded bg-blue-100 p-1 text-blue-700 hover:bg-blue-200"
                                  >
                                    <Edit className="h-3 w-3" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteDepartment(dept.id)}
                                    className="rounded bg-red-100 p-1 text-red-700 hover:bg-red-200"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                              
                              <div className="mt-2 border-t border-gray-200 pt-2">
                                <p className="text-xs font-medium text-gray-900">
                                  {dept.detail.managerName}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {dept.detail.position}
                                </p>
                                
                                <div className="mt-1.5 space-y-0.5 text-xs text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3 flex-shrink-0" />
                                    <span className="truncate">{dept.detail.officeNumber}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    Ext: {dept.detail.extension}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Mail className="h-3 w-3 flex-shrink-0" />
                                    <span className="truncate text-xs">{dept.detail.email}</span>
                                  </div>
                                </div>
                              </div>

                              <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                dept.detail.status === 'Open' 
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {dept.detail.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-xs text-gray-600">
                      No departments yet. Click "Add Department" to create one.
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {filteredOffices.length === 0 && !loading && (
        <div className="rounded-xl bg-white p-12 text-center shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
          <p style={{ color: '#666666' }}>No offices found</p>
        </div>
      )}

      {showOfficeModal && (
        <OfficeModal
          office={editingOffice}
          buildings={buildings}
          onClose={() => setShowOfficeModal(false)}
          onSave={() => {
            setShowOfficeModal(false)
            fetchHierarchy()
          }}
        />
      )}

      {showDepartmentModal && (
        <DepartmentModal
          office={editingDepartment.office}
          department={editingDepartment.dept}
          buildings={buildings}
          onClose={() => setShowDepartmentModal(false)}
          onSave={() => {
            setShowDepartmentModal(false)
            fetchHierarchy()
          }}
        />
      )}
    </div>
  )
}


// Office Modal Component
function OfficeModal({
  office,
  buildings,
  onClose,
  onSave,
}: {
  office: Office | null
  buildings: Building[]
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    id: office?.id || "",
    name: office?.name || "",
    amharic: office?.amharic || "",
    icon: office?.icon || "briefcase",
    work: office?.work || "",
    workAmharic: office?.workAmharic || "",
    manager: {
      name: office?.manager.name || "",
      nameAmharic: office?.manager.nameAmharic || "",
      position: office?.manager.position || "",
      positionAmharic: office?.manager.positionAmharic || "",
      photo: office?.manager.photo || "/placeholder-user.jpg",
      telephone: office?.manager.telephone || "",
      email: office?.manager.email || "",
    },
    building: office?.building || "Building A",
    floor: office?.floor || "",
    room: office?.room || "",
    officeNumber: office?.officeNumber || "",
    status: office?.status || "Open",
    buildingRef: office?.buildingRef || "",
  })
  const [loading, setLoading] = useState(false)

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
      } else {
        alert("Failed to save office")
      }
    } catch (error) {
      console.error("Error saving office:", error)
      alert("Error saving office")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
      <div className="my-8 w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          {office ? "Edit Office" : "Add Office"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Office ID *</label>
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
              <label className="mb-2 block text-sm font-medium text-gray-700">Building *</label>
              <select
                value={formData.buildingRef}
                onChange={(e) => setFormData({ ...formData, buildingRef: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Select building</option>
                {buildings.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Office Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Office Name (Amharic) *</label>
              <input
                type="text"
                value={formData.amharic}
                onChange={(e) => setFormData({ ...formData, amharic: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Work Description *</label>
            <textarea
              value={formData.work}
              onChange={(e) => setFormData({ ...formData, work: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Work Description (Amharic) *</label>
            <textarea
              value={formData.workAmharic}
              onChange={(e) => setFormData({ ...formData, workAmharic: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              rows={3}
              required
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="mb-3 font-semibold text-gray-900">Manager Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Manager Name *</label>
                <input
                  type="text"
                  value={formData.manager.name}
                  onChange={(e) => setFormData({ ...formData, manager: { ...formData.manager, name: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Manager Name (Amharic)</label>
                <input
                  type="text"
                  value={formData.manager.nameAmharic || ""}
                  onChange={(e) => setFormData({ ...formData, manager: { ...formData.manager, nameAmharic: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Position *</label>
                <input
                  type="text"
                  value={formData.manager.position}
                  onChange={(e) => setFormData({ ...formData, manager: { ...formData.manager, position: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Position (Amharic) *</label>
                <input
                  type="text"
                  value={formData.manager.positionAmharic}
                  onChange={(e) => setFormData({ ...formData, manager: { ...formData.manager, positionAmharic: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Telephone *</label>
                <input
                  type="text"
                  value={formData.manager.telephone}
                  onChange={(e) => setFormData({ ...formData, manager: { ...formData.manager, telephone: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  value={formData.manager.email}
                  onChange={(e) => setFormData({ ...formData, manager: { ...formData.manager, email: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">Photo URL *</label>
                <input
                  type="text"
                  value={formData.manager.photo}
                  onChange={(e) => setFormData({ ...formData, manager: { ...formData.manager, photo: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="mb-3 font-semibold text-gray-900">Location</h3>
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Building *</label>
                <input
                  type="text"
                  value={formData.building}
                  onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Floor *</label>
                <input
                  type="text"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Room *</label>
                <input
                  type="text"
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Status *</label>
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
              {loading ? "Saving..." : "Save Office"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


// Department Modal Component
function DepartmentModal({
  office,
  department,
  buildings,
  onClose,
  onSave,
}: {
  office: Office
  department: Department | null
  buildings: Building[]
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    id: department?.id || "",
    name: department?.name || "",
    amharic: department?.amharic || "",
    detail: {
      managerName: department?.detail.managerName || "",
      managerNameAmharic: department?.detail.managerNameAmharic || "",
      position: department?.detail.position || "",
      positionAmharic: department?.detail.positionAmharic || "",
      photo: department?.detail.photo || "/placeholder-user.jpg",
      description: department?.detail.description || "",
      descriptionAmharic: department?.detail.descriptionAmharic || "",
      building: department?.detail.building || office.building,
      floor: department?.detail.floor || "",
      room: department?.detail.room || "",
      officeNumber: department?.detail.officeNumber || "",
      telephone: department?.detail.telephone || "",
      extension: department?.detail.extension || "",
      email: department?.detail.email || "",
      location: department?.detail.location || "",
      locationAmharic: department?.detail.locationAmharic || "",
      status: department?.detail.status || "Open",
    },
    officeRef: office.id,
    buildingRef: department?.buildingRef || office.buildingRef,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const url = department ? `${API_URL}/api/admin/departments/${department.id}` : `${API_URL}/api/admin/departments`
      const method = department ? "PUT" : "POST"

      // Auto-generate location strings
      const updatedFormData = {
        ...formData,
        detail: {
          ...formData.detail,
          location: `${formData.detail.building}, Floor ${formData.detail.floor}, Room ${formData.detail.room}`,
          locationAmharic: `${formData.detail.building === "Building A" ? "ህንጻ ሀ" : "ህንጻ ለ"}፣ ፎቅ ${formData.detail.floor}፣ ክፍል ${formData.detail.room}`,
        }
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
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
          {department ? "Edit Department" : "Add Department"} - {office.name}
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
              <label className="mb-2 block text-sm font-medium text-gray-700">Building *</label>
              <select
                value={formData.buildingRef}
                onChange={(e) => setFormData({ ...formData, buildingRef: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Select building</option>
                {buildings.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
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
                value={formData.amharic || ""}
                onChange={(e) => setFormData({ ...formData, amharic: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
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

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Description (Amharic) *</label>
            <textarea
              value={formData.detail.descriptionAmharic}
              onChange={(e) => setFormData({ ...formData, detail: { ...formData.detail, descriptionAmharic: e.target.value } })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              rows={3}
              required
            />
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
                <label className="mb-2 block text-sm font-medium text-gray-700">Manager Name (Amharic)</label>
                <input
                  type="text"
                  value={formData.detail.managerNameAmharic || ""}
                  onChange={(e) => setFormData({ ...formData, detail: { ...formData.detail, managerNameAmharic: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
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
                <label className="mb-2 block text-sm font-medium text-gray-700">Position (Amharic) *</label>
                <input
                  type="text"
                  value={formData.detail.positionAmharic}
                  onChange={(e) => setFormData({ ...formData, detail: { ...formData.detail, positionAmharic: e.target.value } })}
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
                <label className="mb-2 block text-sm font-medium text-gray-700">Extension *</label>
                <input
                  type="text"
                  value={formData.detail.extension}
                  onChange={(e) => setFormData({ ...formData, detail: { ...formData.detail, extension: e.target.value } })}
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
              <div>
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
                <label className="mb-2 block text-sm font-medium text-gray-700">Office Number *</label>
                <input
                  type="text"
                  value={formData.detail.officeNumber}
                  onChange={(e) => setFormData({ ...formData, detail: { ...formData.detail, officeNumber: e.target.value } })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">Status *</label>
              <select
                value={formData.detail.status}
                onChange={(e) => setFormData({ ...formData, detail: { ...formData.detail, status: e.target.value as any } })}
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
              className="flex-1 rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
