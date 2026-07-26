"use client"

import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, Search, Megaphone, Calendar, AlertCircle } from "lucide-react"

interface Announcement {
  _id: string
  id: string
  title: string
  titleAmharic: string
  description: string
  descriptionAmharic: string
  priority: 'info' | 'important' | 'urgent'
  publishDate: string
  expiryDate?: string
  isActive: boolean
  createdBy: string
  createdAt: string
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/admin/announcements`)
      const data = await response.json()
      setAnnouncements(data)
    } catch (error) {
      console.error("Error fetching announcements:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/admin/announcements/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchAnnouncements()
      } else {
        alert("Failed to delete announcement")
      }
    } catch (error) {
      console.error("Error deleting announcement:", error)
      alert("Error deleting announcement")
    }
  }

  const filteredAnnouncements = announcements.filter((ann) =>
    ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ann.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200'
      case 'important': return 'bg-orange-100 text-orange-700 border-orange-200'
      default: return 'bg-blue-100 text-blue-700 border-blue-200'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return '🚨'
      case 'important': return '⚠️'
      default: return 'ℹ️'
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#111111' }}>Announcements</h1>
          <p className="mt-2" style={{ color: '#666666' }}>Manage ministry announcements and news</p>
        </div>
        <button
          onClick={() => {
            setEditingAnnouncement(null)
            setShowModal(true)
          }}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors"
          style={{ backgroundColor: '#086976' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#06515B'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#086976'}
        >
          <Plus className="h-5 w-5" />
          Add Announcement
        </button>
      </div>

      <div className="mb-6 rounded-xl bg-white p-4 shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 pl-10 pr-4 focus:outline-none focus:ring-2"
            style={{ borderColor: '#E5E7EB', color: '#111111' }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#086976'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg" style={{ color: '#666666' }}>Loading...</div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <div
              key={announcement._id}
              className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-md"
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className={`rounded-lg border p-2 ${getPriorityColor(announcement.priority)}`}>
                        <Megaphone className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{announcement.title}</h3>
                          <span className="text-lg">{getPriorityIcon(announcement.priority)}</span>
                          {!announcement.isActive && (
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                              Inactive
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{announcement.titleAmharic}</p>
                        <p className="text-sm text-gray-700 mt-2">{announcement.description}</p>
                        <p className="text-sm text-gray-600 mt-1">{announcement.descriptionAmharic}</p>
                        
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Publish: {new Date(announcement.publishDate).toLocaleDateString()}
                          </span>
                          {announcement.expiryDate && (
                            <span className="flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              Expires: {new Date(announcement.expiryDate).toLocaleDateString()}
                            </span>
                          )}
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                            {announcement.priority.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingAnnouncement(announcement)
                        setShowModal(true)
                      }}
                      className="rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(announcement.id)}
                      className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredAnnouncements.length === 0 && !loading && (
        <div className="rounded-xl bg-white p-12 text-center shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
          <p style={{ color: '#666666' }}>No announcements found</p>
        </div>
      )}

      {showModal && (
        <AnnouncementModal
          announcement={editingAnnouncement}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false)
            fetchAnnouncements()
          }}
        />
      )}
    </div>
  )
}

// Announcement Modal Component
function AnnouncementModal({
  announcement,
  onClose,
  onSave,
}: {
  announcement: Announcement | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    id: announcement?.id || `ann-${Date.now()}`,
    title: announcement?.title || "",
    titleAmharic: announcement?.titleAmharic || "",
    description: announcement?.description || "",
    descriptionAmharic: announcement?.descriptionAmharic || "",
    priority: announcement?.priority || 'info',
    publishDate: announcement?.publishDate ? announcement.publishDate.split('T')[0] : new Date().toISOString().split('T')[0],
    expiryDate: announcement?.expiryDate ? announcement.expiryDate.split('T')[0] : "",
    isActive: announcement?.isActive ?? true,
    createdBy: "admin"
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const url = announcement 
        ? `${API_URL}/api/admin/announcements/${announcement.id}` 
        : `${API_URL}/api/admin/announcements`
      const method = announcement ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onSave()
      } else {
        alert("Failed to save announcement")
      }
    } catch (error) {
      console.error("Error saving announcement:", error)
      alert("Error saving announcement")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
      <div className="my-8 w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          {announcement ? "Edit Announcement" : "Add Announcement"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Title (English) *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Title (Amharic) *</label>
              <input
                type="text"
                value={formData.titleAmharic}
                onChange={(e) => setFormData({ ...formData, titleAmharic: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Description (English) *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Description (Amharic) *</label>
            <textarea
              value={formData.descriptionAmharic}
              onChange={(e) => setFormData({ ...formData, descriptionAmharic: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              rows={3}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Priority *</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="info">Info</option>
                <option value="important">Important</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Publish Date *</label>
              <input
                type="date"
                value={formData.publishDate}
                onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Active (visible on public portal)
            </label>
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
              className="flex-1 rounded-lg px-4 py-2 font-medium text-white disabled:opacity-50"
              style={{ backgroundColor: '#086976' }}
            >
              {loading ? "Saving..." : "Save Announcement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
