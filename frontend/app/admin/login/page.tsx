"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      router.push("/admin/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #086976 0%, #0B8293 100%)' }}>
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          {/* Logo/Icon */}
          <div className="mb-6 flex justify-center">
            <div 
              className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg"
              style={{ backgroundColor: '#086976' }}
            >
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold" style={{ color: '#086976' }}>
              Admin Login
            </h1>
            <p className="text-sm" style={{ color: '#666666' }}>
              Ministry of Innovation and Technology
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
                style={{ color: '#333333' }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: '#E5E7EB',
                  color: '#111111'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#086976'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(8, 105, 118, 0.1)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                placeholder="admin@mint.gov.et"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
                style={{ color: '#333333' }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: '#E5E7EB',
                  color: '#111111'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#086976'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(8, 105, 118, 0.1)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg px-4 py-3 font-semibold text-white transition-all disabled:opacity-50 shadow-lg"
              style={{ backgroundColor: '#086976' }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#06515B'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(8, 105, 118, 0.3)'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#086976'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm font-medium transition-colors inline-flex items-center gap-1"
              style={{ color: '#086976' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#06515B'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#086976'
              }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
