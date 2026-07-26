"use client"

import { useEffect, useState } from "react"
import { Save, Lock, Globe, Mail, Phone, MapPin, Clock, Share2, Briefcase, Video, Send } from "lucide-react"

interface Settings {
  ministryName: string
  ministryNameAmharic: string
  contactEmail: string
  contactPhone: string
  address: string
  addressAmharic: string
  workingHours: string
  workingHoursAmharic: string
  facebookUrl?: string
  twitterUrl?: string
  telegramUrl?: string
  linkedinUrl?: string
  youtubeUrl?: string
  maintenanceMode: boolean
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'general' | 'password'>('general')

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [passwordLoading, setPasswordLoading] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/admin/settings`)
      const data = await response.json()
      setSettings(data)
    } catch (error) {
      console.error("Error fetching settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    if (!settings) return
    setSaving(true)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/admin/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        alert("Settings saved successfully!")
      } else {
        alert("Failed to save settings")
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      alert("Error saving settings")
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!")
      return
    }

    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!")
      return
    }

    setPasswordLoading(true)

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      
      const response = await fetch(`${API_URL}/api/admin/settings/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert("Password changed successfully!")
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      } else {
        alert(data.error || "Failed to change password")
      }
    } catch (error) {
      console.error("Error changing password:", error)
      alert("Error changing password")
    } finally {
      setPasswordLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg" style={{ color: '#666666' }}>Loading...</div>
      </div>
    )
  }

  if (!settings) return null

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#111111' }}>Settings</h1>
        <p className="mt-2" style={{ color: '#666666' }}>Manage system settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b" style={{ borderColor: '#E5E7EB' }}>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('general')}
            className={`pb-3 px-1 text-sm font-medium transition-colors ${
              activeTab === 'general'
                ? 'border-b-2 text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={activeTab === 'general' ? { borderColor: '#086976', color: '#086976' } : {}}
          >
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              General Settings
            </div>
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`pb-3 px-1 text-sm font-medium transition-colors ${
              activeTab === 'password'
                ? 'border-b-2 text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={activeTab === 'password' ? { borderColor: '#086976', color: '#086976' } : {}}
          >
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Change Password
            </div>
          </button>
        </div>
      </div>

      {/* General Settings Tab */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Ministry Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Ministry Name (English)
                  </div>
                </label>
                <input
                  type="text"
                  value={settings.ministryName}
                  onChange={(e) => setSettings({ ...settings, ministryName: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Ministry Name (አማርኛ)
                  </div>
                </label>
                <input
                  type="text"
                  value={settings.ministryNameAmharic}
                  onChange={(e) => setSettings({ ...settings, ministryNameAmharic: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Contact Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Email
                  </div>
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Phone
                  </div>
                </label>
                <input
                  type="text"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address (English)
                  </div>
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address (አማርኛ)
                  </div>
                </label>
                <input
                  type="text"
                  value={settings.addressAmharic}
                  onChange={(e) => setSettings({ ...settings, addressAmharic: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Working Hours (English)
                  </div>
                </label>
                <input
                  type="text"
                  value={settings.workingHours}
                  onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Working Hours (አማርኛ)
                  </div>
                </label>
                <input
                  type="text"
                  value={settings.workingHoursAmharic}
                  onChange={(e) => setSettings({ ...settings, workingHoursAmharic: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Social Media Links</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Facebook URL
                  </div>
                </label>
                <input
                  type="url"
                  value={settings.facebookUrl || ""}
                  onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Twitter/X URL
                  </div>
                </label>
                <input
                  type="url"
                  value={settings.twitterUrl || ""}
                  onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="https://x.com/..."
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Telegram URL
                  </div>
                </label>
                <input
                  type="url"
                  value={settings.telegramUrl || ""}
                  onChange={(e) => setSettings({ ...settings, telegramUrl: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="https://t.me/..."
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    LinkedIn URL
                  </div>
                </label>
                <input
                  type="url"
                  value={settings.linkedinUrl || ""}
                  onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="https://linkedin.com/..."
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    YouTube URL
                  </div>
                </label>
                <input
                  type="url"
                  value={settings.youtubeUrl || ""}
                  onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">System Options</h2>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="maintenanceMode" className="text-sm font-medium text-gray-700">
                Enable Maintenance Mode (Public portal will be inaccessible)
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg px-6 py-2 text-white transition-colors disabled:opacity-50"
              style={{ backgroundColor: '#086976' }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = '#06515B')}
              onMouseLeave={(e) => !saving && (e.currentTarget.style.backgroundColor = '#086976')}
            >
              <Save className="h-5 w-5" />
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      )}

      {/* Password Change Tab */}
      {activeTab === 'password' && (
        <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Change Password</h2>
          <form onSubmit={handleChangePassword} className="max-w-md space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Current Password *</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">New Password *</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
                minLength={6}
              />
              <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Confirm New Password *</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={passwordLoading}
              className="flex items-center gap-2 rounded-lg px-6 py-2 text-white transition-colors disabled:opacity-50"
              style={{ backgroundColor: '#086976' }}
              onMouseEnter={(e) => !passwordLoading && (e.currentTarget.style.backgroundColor = '#06515B')}
              onMouseLeave={(e) => !passwordLoading && (e.currentTarget.style.backgroundColor = '#086976')}
            >
              <Lock className="h-5 w-5" />
              {passwordLoading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
