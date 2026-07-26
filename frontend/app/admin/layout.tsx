"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { 
  Building2, 
  Briefcase, 
  Users, 
  LayoutDashboard, 
  LogOut,
  Menu,
  X,
  Network,
  Megaphone,
  Settings
} from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Skip auth check for login page
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false)
      return
    }

    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/admin/login")
      return
    }

    setUser(JSON.parse(userData))
    setLoading(false)
  }, [router, pathname, isLoginPage])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/admin/login")
  }

  // Show loading only for authenticated pages
  if (loading && !isLoginPage) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  // Render login page without sidebar
  if (isLoginPage) {
    return <>{children}</>
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Hierarchy", href: "/admin/hierarchy", icon: Network },
    { name: "Buildings", href: "/admin/buildings", icon: Building2 },
    { name: "Offices", href: "/admin/offices", icon: Briefcase },
    { name: "Departments", href: "/admin/departments", icon: Users },
    { name: "Announcements", href: "/admin/announcements", icon: Megaphone },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b px-6" style={{ borderColor: '#E5E7EB' }}>
            <h1 className="text-xl font-bold" style={{ color: '#086976' }}>MInT Admin</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
              style={{ color: '#086976' }}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white"
                      : "hover:text-white"
                  }`}
                  style={
                    isActive 
                      ? { backgroundColor: '#086976', color: 'white' } 
                      : { color: '#086976' }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#086976'
                      e.currentTarget.style.color = 'white'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = ''
                      e.currentTarget.style.color = '#086976'
                    }
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className="border-t p-4" style={{ borderColor: '#E5E7EB' }}>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ backgroundColor: '#086976' }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium" style={{ color: '#111111' }}>
                  {user?.name}
                </p>
                <p className="truncate text-xs" style={{ color: '#666666' }}>{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: '#EF4444' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#DC2626'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#EF4444'
              }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden" style={{ backgroundColor: '#F8FAFC' }}>
        {/* Header */}
        <header className="border-b bg-white shadow-sm" style={{ borderColor: '#E5E7EB', backgroundColor: '#086976' }}>
          <div className="flex h-16 items-center justify-between px-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Header Title */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: '#0B8293' }}>
                M
              </div>
              <div className="hidden md:block">
                <h2 className="text-lg font-bold text-white">Ministry of Innovation and Technology</h2>
                <p className="text-xs text-white/80">Admin Dashboard</p>
              </div>
            </div>

            {/* View Public Portal Button */}
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-lg font-semibold transition-all"
              style={{ color: '#086976', backgroundColor: 'white', border: '2px solid #086976' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC'
                e.currentTarget.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              View Public Portal
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
