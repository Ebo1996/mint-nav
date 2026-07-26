const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface RequestOptions extends RequestInit {
  requireAuth?: boolean
}

async function fetchAPI(endpoint: string, options: RequestOptions = {}) {
  const { requireAuth = false, ...fetchOptions } = options

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  }

  // Add auth token if required
  if (requireAuth) {
    const token = localStorage.getItem('token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  })

  return response
}

// Auth APIs
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetchAPI('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    return response.json()
  },

  register: async (email: string, password: string, name: string, role?: string) => {
    const response = await fetchAPI('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, role }),
    })
    return response.json()
  },
}

// Building APIs
export const buildingAPI = {
  getAll: async () => {
    const response = await fetchAPI('/api/admin/buildings')
    return response.json()
  },

  getOne: async (id: string) => {
    const response = await fetchAPI(`/api/admin/buildings/${id}`)
    return response.json()
  },

  create: async (data: any) => {
    const response = await fetchAPI('/api/admin/buildings', {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    })
    return response.json()
  },

  update: async (id: string, data: any) => {
    const response = await fetchAPI(`/api/admin/buildings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      requireAuth: true,
    })
    return response.json()
  },

  delete: async (id: string) => {
    const response = await fetchAPI(`/api/admin/buildings/${id}`, {
      method: 'DELETE',
      requireAuth: true,
    })
    return response.json()
  },
}

// Office APIs
export const officeAPI = {
  getAll: async (buildingRef?: string) => {
    const query = buildingRef ? `?buildingRef=${buildingRef}` : ''
    const response = await fetchAPI(`/api/admin/offices${query}`)
    return response.json()
  },

  getOne: async (id: string) => {
    const response = await fetchAPI(`/api/admin/offices/${id}`)
    return response.json()
  },

  create: async (data: any) => {
    const response = await fetchAPI('/api/admin/offices', {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    })
    return response.json()
  },

  update: async (id: string, data: any) => {
    const response = await fetchAPI(`/api/admin/offices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      requireAuth: true,
    })
    return response.json()
  },

  delete: async (id: string) => {
    const response = await fetchAPI(`/api/admin/offices/${id}`, {
      method: 'DELETE',
      requireAuth: true,
    })
    return response.json()
  },
}

// Department APIs
export const departmentAPI = {
  getAll: async (officeRef?: string, buildingRef?: string) => {
    const params = new URLSearchParams()
    if (officeRef) params.append('officeRef', officeRef)
    if (buildingRef) params.append('buildingRef', buildingRef)
    const query = params.toString() ? `?${params.toString()}` : ''
    
    const response = await fetchAPI(`/api/admin/departments${query}`)
    return response.json()
  },

  getOne: async (id: string) => {
    const response = await fetchAPI(`/api/admin/departments/${id}`)
    return response.json()
  },

  create: async (data: any) => {
    const response = await fetchAPI('/api/admin/departments', {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    })
    return response.json()
  },

  update: async (id: string, data: any) => {
    const response = await fetchAPI(`/api/admin/departments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      requireAuth: true,
    })
    return response.json()
  },

  delete: async (id: string) => {
    const response = await fetchAPI(`/api/admin/departments/${id}`, {
      method: 'DELETE',
      requireAuth: true,
    })
    return response.json()
  },
}

// Public APIs (uses ministry-data.ts structure)
export const publicAPI = {
  getBuildings: async () => {
    const response = await fetchAPI('/api/public/buildings')
    return response.json()
  },

  getBuilding: async (id: string) => {
    const response = await fetchAPI(`/api/public/buildings/${id}`)
    return response.json()
  },

  getOffice: async (buildingId: string, officeId: string) => {
    const response = await fetchAPI(`/api/public/buildings/${buildingId}/offices/${officeId}`)
    return response.json()
  },

  getDepartment: async (buildingId: string, officeId: string, departmentId: string) => {
    const response = await fetchAPI(`/api/public/buildings/${buildingId}/offices/${officeId}/departments/${departmentId}`)
    return response.json()
  },

  search: async (query: string) => {
    const response = await fetchAPI(`/api/public/search?q=${encodeURIComponent(query)}`)
    return response.json()
  },
}

export default {
  auth: authAPI,
  buildings: buildingAPI,
  offices: officeAPI,
  departments: departmentAPI,
  public: publicAPI,
}
