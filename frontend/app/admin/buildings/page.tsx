"use client"

import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, Building2, MapPin, Hash } from "lucide-react"

interface Building {
  _id: string
  id: string
  name: string
  shortName: string
  illustration: string
  description: string
}

export default function BuildingsPage() {
  const [buildings, setBuildings] = useState<Building[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBuilding, setEditingBuilding] = useState<Building | null>(null)

  useEffect(() => {
    fetchBuildings()
  }, [])

  const fetchBuildings = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/admin/buildings`)
      const data = await response.json()
      setBuildings(data)
    } catch (error) {
      console.error("Error fetching buildings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this building? This may affect offices and departments.")) return

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/admin/buildings/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchBuildings()
      } else {
        alert("Failed to delete building")
      }
    } catch (error) {
      console.error("Error deleting building:", error)
      alert("Error deleting building")
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-[#086976]"></div>
          <div className="mt-4 text-center text-lg font-semibold text-gray-600">Loading buildings...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#086976] to-[#0B8293] p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight">Buildings</h1>
            <p className="mt-2 text-lg text-white/90">Manage ministry building locations</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-bold">{buildings.length} {buildings.length === 1 ? 'Building' : 'Buildings'}</span>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingBuilding(null)
              setShowModal(true)
            }}
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#086976] shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            Add Building
          </button>
        </div>
      </div>

      {/* Buildings Grid */}
      {buildings.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {buildings.map((building, index) => (
            <div
              key={building._id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              style={{ 
                border: '1px solid rgba(0,0,0,0.06)',
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Building Icon/Visual */}
              <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[#086976] to-[#0B8293] p-8">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-white blur-xl"></div>
                </div>
                <div className="relative flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
                      <Building2 className="h-12 w-12 text-white" />
                    </div>
                    <div className="mt-4">
                      <span className="text-6xl font-black text-white drop-shadow-lg">
                        {building.shortName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Building Info */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-black text-gray-900">
                    {building.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                    <Hash className="h-4 w-4" />
                    <span className="font-mono text-xs">{building.id}</span>
                  </div>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-2">
                  {building.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingBuilding(building)
                      setShowModal(true)
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 transition-all duration-200 hover:bg-blue-100 hover:scale-105"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(building.id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700 transition-all duration-200 hover:bg-red-100 hover:scale-105"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-[#086976]/30 pointer-events-none"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-16 text-center shadow-lg" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <Building2 className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">No buildings found</h3>
          <p className="text-gray-500">Add your first building to get started</p>
        </div>
      )}

      {showModal && (
        <BuildingModal
          building={editingBuilding}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false)
            fetchBuildings()
          }}
        />
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

function BuildingModal({
  building,
  onClose,
  onSave,
}: {
  building: Building | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    id: building?.id || "",
    name: building?.name || "",
    shortName: building?.shortName || "",
    illustration: building?.illustration || "",
    description: building?.description || "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const url = building
        ? `${API_URL}/api/admin/buildings/${building.id}`
        : `${API_URL}/api/admin/buildings`
      const method = building ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onSave()
      } else {
        alert("Failed to save building")
      }
    } catch (error) {
      console.error("Error saving building:", error)
      alert("Error saving building")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl animate-fadeIn">
        {/* Modal Header */}
        <div className="border-b border-gray-200 bg-gradient-to-r from-[#086976] to-[#0B8293] p-6 rounded-t-2xl">
          <h2 className="text-2xl font-black text-white">
            {building ? "Edit Building" : "Add New Building"}
          </h2>
          <p className="mt-1 text-sm text-white/80">
            {building ? "Update building information" : "Create a new ministry building"}
          </p>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Building ID *
              </label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-gray-900 transition-all focus:border-[#086976] focus:outline-none focus:ring-2 focus:ring-[#086976]/20"
                placeholder="building-a"
                required
                disabled={!!building}
              />
              <p className="mt-1 text-xs text-gray-500">Unique identifier (cannot be changed)</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Short Name *
              </label>
              <input
                type="text"
                value={formData.shortName}
                onChange={(e) =>
                  setFormData({ ...formData, shortName: e.target.value })
                }
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-gray-900 transition-all focus:border-[#086976] focus:outline-none focus:ring-2 focus:ring-[#086976]/20"
                placeholder="A"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Display letter (e.g., A, B, C)</p>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Building Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-gray-900 transition-all focus:border-[#086976] focus:outline-none focus:ring-2 focus:ring-[#086976]/20"
              placeholder="Building A"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Illustration URL
            </label>
            <input
              type="text"
              value={formData.illustration}
              onChange={(e) =>
                setFormData({ ...formData, illustration: e.target.value })
              }
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-gray-900 transition-all focus:border-[#086976] focus:outline-none focus:ring-2 focus:ring-[#086976]/20"
              placeholder="/images/building-a.png"
            />
            <p className="mt-1 text-xs text-gray-500">Optional image/illustration path</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-gray-900 transition-all focus:border-[#086976] focus:outline-none focus:ring-2 focus:ring-[#086976]/20"
              rows={4}
              placeholder="Main administrative & executive offices"
              required
            />
          </div>

          {/* Modal Footer */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-bold text-gray-700 transition-all duration-200 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-gradient-to-r from-[#086976] to-[#0B8293] px-6 py-3 font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Saving...
                </span>
              ) : (
                <span>{building ? "Update Building" : "Create Building"}</span>
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}
