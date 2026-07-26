"use client"

import { useEffect, useState } from "react"
import { 
  Building2, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Network, 
  ArrowUpRight,
  Activity,
  Clock,
  Megaphone,
  Settings,
  BarChart3,
  PieChart,
  Calendar
} from "lucide-react"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    buildings: 0,
    offices: 0,
    departments: 0,
  })
  const [loading, setLoading] = useState(true)
  const [animatedStats, setAnimatedStats] = useState({
    buildings: 0,
    offices: 0,
    departments: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  useEffect(() => {
    // Animate numbers
    if (!loading) {
      const duration = 1000
      const steps = 30
      const interval = duration / steps

      let currentStep = 0
      const timer = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setAnimatedStats({
          buildings: Math.floor(stats.buildings * progress),
          offices: Math.floor(stats.offices * progress),
          departments: Math.floor(stats.departments * progress),
        })

        if (currentStep >= steps) {
          clearInterval(timer)
          setAnimatedStats(stats)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [loading, stats])

  const fetchStats = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const [buildingsRes, officesRes, departmentsRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/buildings`),
        fetch(`${API_URL}/api/admin/offices`),
        fetch(`${API_URL}/api/admin/departments`),
      ])

      const buildings = await buildingsRes.json()
      const offices = await officesRes.json()
      const departments = await departmentsRes.json()

      setStats({
        buildings: buildings.length,
        offices: offices.length,
        departments: departments.length,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const cards = [
    {
      title: "Buildings",
      value: animatedStats.buildings,
      icon: Building2,
      gradient: "linear-gradient(135deg, #086976 0%, #0B8293 100%)",
      bgGradient: "linear-gradient(135deg, rgba(8,105,118,0.1) 0%, rgba(11,130,147,0.05) 100%)",
      description: "Total buildings"
    },
    {
      title: "Offices",
      value: animatedStats.offices,
      icon: Briefcase,
      gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      bgGradient: "linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(5,150,105,0.05) 100%)",
      description: "Active offices"
    },
    {
      title: "Departments",
      value: animatedStats.departments,
      icon: Users,
      gradient: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
      bgGradient: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(37,99,235,0.05) 100%)",
      description: "Total departments"
    },
    {
      title: "Total Records",
      value: animatedStats.buildings + animatedStats.offices + animatedStats.departments,
      icon: TrendingUp,
      gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
      bgGradient: "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(217,119,6,0.05) 100%)",
      description: "Combined records"
    },
  ]

  const quickActions = [
    {
      title: "View Hierarchy",
      description: "Organization structure",
      icon: Network,
      href: "/admin/hierarchy",
      color: "#086976",
      bgColor: "rgba(8,105,118,0.1)"
    },
    {
      title: "Manage Buildings",
      description: "Edit building data",
      icon: Building2,
      href: "/admin/buildings",
      color: "#10B981",
      bgColor: "rgba(16,185,129,0.1)"
    },
    {
      title: "Manage Offices",
      description: "Update office info",
      icon: Briefcase,
      href: "/admin/offices",
      color: "#3B82F6",
      bgColor: "rgba(59,130,246,0.1)"
    },
    {
      title: "Manage Departments",
      description: "Department settings",
      icon: Users,
      href: "/admin/departments",
      color: "#F59E0B",
      bgColor: "rgba(245,158,11,0.1)"
    },
    {
      title: "Announcements",
      description: "Post updates",
      icon: Megaphone,
      href: "/admin/announcements",
      color: "#EF4444",
      bgColor: "rgba(239,68,68,0.1)"
    },
    {
      title: "Settings",
      description: "System configuration",
      icon: Settings,
      href: "/admin/settings",
      color: "#8B5CF6",
      bgColor: "rgba(139,92,246,0.1)"
    }
  ]

  const recentActivities = [
    { action: "System initialized", time: "Just now", icon: Activity, color: "#086976" },
    { action: "Dashboard loaded", time: "Just now", icon: BarChart3, color: "#10B981" },
  ]

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-[#086976]"></div>
          <div className="mt-4 text-center text-lg font-semibold text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Section with Welcome */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#086976] via-[#0B8293] to-[#086976] p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-0 right-20 h-48 w-48 rounded-full bg-white blur-2xl"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight">Welcome Back! 👋</h1>
              <p className="mt-2 text-lg text-white/90">
                Here's what's happening with your ministry directory today
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
                <Calendar className="h-4 w-4" />
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right">
                <div className="text-5xl font-black">{animatedStats.buildings + animatedStats.offices + animatedStats.departments}</div>
                <div className="text-sm text-white/80">Total Records</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            style={{
              border: '1px solid rgba(0,0,0,0.06)',
              animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
            }}
          >
            <div className="absolute inset-0 opacity-50" style={{ background: card.bgGradient }}></div>
            <div className="relative p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold uppercase tracking-wide text-gray-600">
                      {card.title}
                    </p>
                  </div>
                  <p className="mt-3 text-4xl font-black text-gray-900">
                    {card.value}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{card.description}</p>
                </div>
                <div 
                  className="rounded-2xl p-3 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: card.gradient }}
                >
                  <card.icon className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                <div 
                  className="h-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${(card.value / (stats.buildings + stats.offices + stats.departments)) * 100}%`,
                    background: card.gradient
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow-lg" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-gray-900">Quick Actions</h2>
                <p className="text-sm text-gray-500">Manage your ministry directory</p>
              </div>
              <div className="rounded-full bg-gradient-to-br from-[#086976] to-[#0B8293] p-2">
                <Activity className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quickActions.map((action, index) => (
                <a
                  key={action.title}
                  href={action.href}
                  className="group relative overflow-hidden rounded-xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{ 
                    backgroundColor: action.bgColor,
                    border: '2px solid transparent',
                    animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = action.color
                    e.currentTarget.style.backgroundColor = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent'
                    e.currentTarget.style.backgroundColor = action.bgColor
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="rounded-lg p-2 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: action.color + '20' }}
                    >
                      <action.icon className="h-5 w-5" style={{ color: action.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm">{action.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{action.description}</p>
                    </div>
                  </div>
                  <ArrowUpRight 
                    className="absolute bottom-2 right-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                    style={{ color: action.color }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl bg-white p-6 shadow-lg" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-gray-900">Recent Activity</h2>
              <p className="text-xs text-gray-500">Latest updates</p>
            </div>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div 
                key={index} 
                className="group flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-gray-50"
                style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
              >
                <div 
                  className="rounded-lg p-2 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: activity.color + '15' }}
                >
                  <activity.icon className="h-4 w-4" style={{ color: activity.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-lg border-2 border-gray-200 py-2 text-sm font-semibold text-gray-600 transition-all duration-200 hover:border-[#086976] hover:bg-[#086976] hover:text-white">
            View All Activity
          </button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-lg" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-gray-900">Distribution Overview</h2>
              <p className="text-xs text-gray-500">Records by category</p>
            </div>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {[
              { label: "Buildings", value: stats.buildings, color: "#086976", total: stats.buildings + stats.offices + stats.departments },
              { label: "Offices", value: stats.offices, color: "#10B981", total: stats.buildings + stats.offices + stats.departments },
              { label: "Departments", value: stats.departments, color: "#3B82F6", total: stats.buildings + stats.offices + stats.departments },
            ].map((item) => {
              const percentage = ((item.value / item.total) * 100).toFixed(1)
              return (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="font-semibold text-gray-700">{item.label}</span>
                    </div>
                    <span className="font-bold text-gray-900">{percentage}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-gray-900">Quick Stats</h2>
              <p className="text-xs text-gray-500">Summary information</p>
            </div>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-black text-[#086976]">
                {stats.buildings + stats.offices + stats.departments}
              </div>
              <div className="mt-1 text-sm text-gray-500">Total Records</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#086976]">{stats.buildings}</div>
                <div className="mt-1 text-xs text-gray-500">Buildings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#10B981]">{stats.offices}</div>
                <div className="mt-1 text-xs text-gray-500">Offices</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#3B82F6]">{stats.departments}</div>
                <div className="mt-1 text-xs text-gray-500">Departments</div>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-xl bg-gradient-to-br from-[#086976] to-[#0B8293] p-4">
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Activity className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold">System Active</p>
                <p className="text-xs text-white/80">All services running</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
