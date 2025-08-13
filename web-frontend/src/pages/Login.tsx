
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const nav = useNavigate()
  const { login, routeByRole, setApiKey, apiKey } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keyInput, setKeyInput] = useState(apiKey || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|undefined>()

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md card">
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign in</h1>
        <label className="label">Email</label>
        <input className="input mb-3" placeholder="you@company.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <label className="label">Password</label>
        <input className="input mb-3" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <label className="label">API Key (from Apps Script)</label>
        <input className="input mb-6" placeholder="API_KEY" value={keyInput} onChange={e=>setKeyInput(e.target.value)} />
        <button className="btn-primary w-full" onClick={async () => {
          setError(undefined); setLoading(true)
          try {
            setApiKey(keyInput)
            await login(email, password)
            const role = JSON.parse(localStorage.getItem('user')!).role
            nav(routeByRole(role))
          } catch (e: any) {
            setError(e.message || 'Login failed')
          } finally { setLoading(false) }
        }}>{loading ? 'Signing in...' : 'Login'}</button>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        <div className="mt-3 text-xs opacity-70">Base URL: <code>{import.meta.env.VITE_APPS_SCRIPT_URL}</code></div>
      </div>
    </div>
  )
}
