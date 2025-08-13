
import React, { createContext, useContext, useState } from 'react'
import { api } from '../services/api'

type User = { id: string; name: string; role: string; email: string }
type AuthCtx = {
  user: User | null
  apiKey: string | null
  setApiKey: (k: string) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  routeByRole: (role: string) => string
}
const Ctx = createContext<AuthCtx>(null as any)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User|null>(() => {
    const raw = localStorage.getItem('user'); return raw ? JSON.parse(raw) as User : null
  })
  const [apiKey, setApiKeyState] = useState<string|null>(() => localStorage.getItem('apiKey'))

  function setApiKey(k: string) { setApiKeyState(k); localStorage.setItem('apiKey', k) }

  async function login(email: string, password: string) {
    if (!apiKey) throw new Error('API key is required')
    const res = await api.login(email, password, apiKey)
    if (!res.success || !res.data) throw new Error(res.message || 'Login failed')
    setUser(res.data); localStorage.setItem('user', JSON.stringify(res.data))
  }
  function logout() { setUser(null); localStorage.removeItem('user') }
  function routeByRole(role: string) {
    const r = role.toLowerCase(); if (r.includes('admin')) return '/admin'
    if (r.includes('hr')) return '/hr'; if (r.includes('sewer')) return '/sewer'; return '/regular'
  }
  return <Ctx.Provider value={{ user, apiKey, setApiKey, login, logout, routeByRole }}>{children}</Ctx.Provider>
}
export const useAuth = () => useContext(Ctx)
